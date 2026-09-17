import { describe, expect, it } from "vitest";
import { z } from "zod";
import { gatedTool } from "../src/gated-tool.js";
import { runAgent } from "../src/runtime.js";
import { createFakeClient, type FakeTurn } from "../src/client/fake.js";
import { createMemoryStore } from "../src/store/memory.js";
import type { AgentConfig, RunnableTool, ToolContext } from "../src/types.js";

function echoTool(): RunnableTool<{ msg: string }> {
  return {
    name: "echo",
    description: "Echoes the given message back.",
    inputSchema: z.object({ msg: z.string() }),
    run: async (input) => `echo: ${input.msg}`,
  };
}

function boomTool(): RunnableTool<Record<string, never>> {
  return {
    name: "boom",
    description: "Always throws, for testing tool-error handling.",
    inputSchema: z.object({}),
    run: async () => {
      throw new Error("kaboom");
    },
  };
}

const proposeTaskTool = gatedTool({
  name: "propose_task",
  description: "Propose a task; requires approval.",
  inputSchema: z.object({ title: z.string() }),
  actionType: "create_task",
});

function makeAgent(tools: (ctx: ToolContext) => RunnableTool<unknown>[]): AgentConfig {
  return {
    name: "test-agent",
    description: "A minimal agent for runtime tests.",
    system: "You are a test agent.",
    effort: "low",
    tools,
  };
}

const WEDDING_ID = "wedding-1";

describe("runAgent", () => {
  it("logs events in order, records usage and cost, and returns done with final text", async () => {
    const store = createMemoryStore();
    const script: FakeTurn[] = [
      {
        content: [{ type: "tool_use", id: "toolu_1", name: "echo", input: { msg: "hi" } }],
        stop_reason: "tool_use",
        usage: { input_tokens: 120, output_tokens: 40 },
      },
      {
        content: [{ type: "text", text: "All set." }],
        stop_reason: "end_turn",
        usage: { input_tokens: 200, output_tokens: 15 },
      },
    ];
    const client = createFakeClient(script);
    const agent = makeAgent(() => [echoTool() as unknown as RunnableTool<unknown>]);

    const result = await runAgent({
      agent,
      weddingId: WEDDING_ID,
      input: "what's next?",
      trigger: "test",
      store,
      client,
    });

    expect(result.status).toBe("done");
    expect(result.finalText).toBe("All set.");
    expect(result.approvals).toEqual([]);

    const events = store.getEvents(result.runId);
    expect(events.map((e) => e.type)).toEqual(["tool_call", "tool_result", "text", "done"]);
    expect(events.map((e) => e.seq)).toEqual([0, 1, 2, 3]);
    expect(events[0]).toMatchObject({ type: "tool_call", tool: "echo", toolUseId: "toolu_1" });
    expect(events[1]).toMatchObject({ type: "tool_result", tool: "echo", output: "echo: hi" });
    expect(events[3]).toMatchObject({ type: "done", status: "done", finalText: "All set." });

    expect(result.usage).toEqual({
      inputTokens: 320,
      outputTokens: 55,
      cacheCreationInputTokens: 0,
      cacheReadInputTokens: 0,
    });

    const run = store.getRun(result.runId);
    expect(run?.status).toBe("done");
    expect(run?.finalText).toBe("All set.");

    const ledger = store.getCostLedger();
    expect(ledger).toHaveLength(2);
    expect(ledger.every((row) => row.costUsd > 0)).toBe(true);
  });

  it("a gated tool produces an approval, ends the run awaiting_approval, with the tool result text", async () => {
    const store = createMemoryStore();
    const script: FakeTurn[] = [
      {
        content: [
          { type: "tool_use", id: "toolu_1", name: "propose_task", input: { title: "Book florist" } },
        ],
        stop_reason: "tool_use",
      },
      {
        content: [{ type: "text", text: "I've sent that for your approval." }],
        stop_reason: "end_turn",
      },
    ];
    const client = createFakeClient(script);
    const agent = makeAgent((ctx) => [proposeTaskTool(ctx)]);

    const result = await runAgent({
      agent,
      weddingId: WEDDING_ID,
      input: "add a task to book the florist",
      trigger: "test",
      store,
      client,
    });

    expect(result.status).toBe("awaiting_approval");
    expect(result.approvals).toHaveLength(1);

    const [approvalId] = result.approvals;
    const approvals = store.getApprovals(result.runId);
    expect(approvals).toHaveLength(1);
    expect(approvals[0]).toMatchObject({
      id: approvalId,
      actionType: "create_task",
      payload: { title: "Book florist" },
      status: "pending",
    });

    const events = store.getEvents(result.runId);
    const toolResult = events.find((e) => e.type === "tool_result");
    expect(toolResult).toMatchObject({ output: `Queued for approval: ${approvalId}` });
    expect(events.some((e) => e.type === "approval_requested")).toBe(true);

    const run = store.getRun(result.runId);
    expect(run?.status).toBe("awaiting_approval");
  });

  it("resumes a pause_turn from a server tool instead of ending the run early", async () => {
    const store = createMemoryStore();
    const script: FakeTurn[] = [
      {
        content: [{ type: "text", text: "Still searching..." }],
        stop_reason: "pause_turn",
      },
      {
        content: [{ type: "text", text: "Found it." }],
        stop_reason: "end_turn",
      },
    ];
    const client = createFakeClient(script);
    const agent = makeAgent(() => []);

    const result = await runAgent({
      agent,
      weddingId: WEDDING_ID,
      input: "look this up",
      trigger: "test",
      store,
      client,
    });

    // If the runtime failed to call pushMessages() on pause_turn, the fake
    // client's second turn would never be reached and finalText would be
    // stuck on the paused turn's text (or the promise would hang).
    expect(result.status).toBe("done");
    expect(result.finalText).toBe("Found it.");

    const events = store.getEvents(result.runId);
    expect(events.map((e) => e.type)).toEqual(["text", "text", "done"]);
  });

  it("turns a thrown tool error into an error event and a failed run, without crashing", async () => {
    const store = createMemoryStore();
    const script: FakeTurn[] = [
      {
        content: [{ type: "tool_use", id: "toolu_1", name: "boom", input: {} }],
        stop_reason: "tool_use",
      },
      {
        content: [{ type: "text", text: "Sorry, something went wrong." }],
        stop_reason: "end_turn",
      },
    ];
    const client = createFakeClient(script);
    const agent = makeAgent(() => [boomTool() as unknown as RunnableTool<unknown>]);

    const result = await runAgent({
      agent,
      weddingId: WEDDING_ID,
      input: "trigger the bug",
      trigger: "test",
      store,
      client,
    });

    expect(result.status).toBe("failed");

    const events = store.getEvents(result.runId);
    const errorEvent = events.find((e) => e.type === "error");
    expect(errorEvent).toMatchObject({ type: "error", kind: "tool", tool: "boom" });
    expect((errorEvent as { message: string }).message).toContain("kaboom");

    const run = store.getRun(result.runId);
    expect(run?.status).toBe("failed");
  });
});

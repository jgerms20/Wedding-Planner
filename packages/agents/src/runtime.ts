import { classifyError, ToolExecutionError } from "./errors.js";
import { calcCostUsd } from "./pricing.js";
import { renderSnapshot } from "./snapshot.js";
import type { ModelClient, ModelMessageParam, SystemBlock } from "./client/types.js";
import type {
  AgentConfig,
  AgentEventInput,
  RunResult,
  RunStore,
  RunnableTool,
  ToolContext,
} from "./types.js";

const DEFAULT_MODEL = "claude-opus-5";
const DEFAULT_EFFORT = "medium";
const MAX_TOKENS = 16000;

export interface RunAgentParams {
  agent: AgentConfig;
  weddingId: string;
  input: string;
  trigger: string;
  store: RunStore;
  client: ModelClient;
}

/**
 * Runs one agent invocation end to end (docs/specs/agent-runtime.md § API):
 * assembles the cached system prompt + wedding snapshot, wraps the
 * agent's tools so every call and result is logged and gated side effects
 * are tracked, drives the model client's tool-use loop (resuming any
 * `pause_turn`), and records usage/cost for every response. Never throws:
 * a thrown tool error or a typed Anthropic API error both end the run with
 * status `"failed"` and an `error` event instead of crashing the caller.
 */
export async function runAgent(params: RunAgentParams): Promise<RunResult> {
  const { agent, weddingId, input, trigger, store, client } = params;

  const run = await store.createRun({ weddingId, agent: agent.name, input, trigger });

  const appendEvent = (event: AgentEventInput) => store.appendEvent(run.id, event);

  let approvalRequested = false;
  const approvalIds: string[] = [];
  let toolFailure: { tool: string; message: string } | null = null;

  const ctx: ToolContext = {
    weddingId,
    runId: run.id,
    store,
    requestApproval: async (actionType: string, payload: unknown) => {
      const approval = await store.createApproval({
        weddingId,
        runId: run.id,
        actionType,
        payload,
      });
      approvalRequested = true;
      approvalIds.push(approval.id);
      await appendEvent({
        type: "approval_requested",
        approvalId: approval.id,
        actionType,
      });
      return approval.id;
    },
  };

  // FIFO queue of tool_use ids per tool name, so a tool_result event can be
  // paired back to the call that produced it even though the model client
  // only ever hands the wrapped run() the tool's input, not its call id.
  const pendingToolUseIds = new Map<string, string[]>();

  function instrumentTool(tool: RunnableTool<unknown>): RunnableTool<unknown> {
    return {
      ...tool,
      run: async (toolInput: unknown) => {
        try {
          const output = await tool.run(toolInput);
          const toolUseId = pendingToolUseIds.get(tool.name)?.shift();
          await appendEvent({
            type: "tool_result",
            tool: tool.name,
            toolUseId,
            output,
          });
          return output;
        } catch (err) {
          const wrapped = new ToolExecutionError(tool.name, err);
          const classified = classifyError(wrapped);
          toolFailure = { tool: tool.name, message: classified.message };
          await appendEvent({
            type: "error",
            kind: classified.kind,
            message: classified.message,
            tool: classified.tool,
          });
          // Re-thrown so a real Anthropic tool runner (which catches this
          // itself and turns it into an `is_error` tool_result - see
          // BetaToolRunner#generateToolResponse) and the fake client both
          // see a rejection; either way `toolFailure` above is what the
          // loop below trusts to fail the run, not exception propagation.
          throw wrapped;
        }
      },
    };
  }

  const tools = agent.tools(ctx).map(instrumentTool);

  const snapshot = await store.getWeddingSnapshot(weddingId);
  const system: SystemBlock[] = [
    { type: "text", text: agent.system, cache_control: { type: "ephemeral" } },
    { type: "text", text: renderSnapshot(snapshot) },
  ];
  const messages: ModelMessageParam[] = [{ role: "user", content: input }];

  const usage = {
    inputTokens: 0,
    outputTokens: 0,
    cacheCreationInputTokens: 0,
    cacheReadInputTokens: 0,
  };

  let finalText = "";
  let status: "done" | "awaiting_approval" | "failed" = "done";

  try {
    const toolRun = client.createToolRun({
      model: agent.model ?? DEFAULT_MODEL,
      maxTokens: MAX_TOKENS,
      effort: agent.effort ?? DEFAULT_EFFORT,
      system,
      messages,
      tools,
    });

    for await (const message of toolRun) {
      const responseUsage = {
        model: message.model,
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
        cacheCreationInputTokens: message.usage.cache_creation_input_tokens ?? 0,
        cacheReadInputTokens: message.usage.cache_read_input_tokens ?? 0,
      };

      usage.inputTokens += responseUsage.inputTokens;
      usage.outputTokens += responseUsage.outputTokens;
      usage.cacheCreationInputTokens += responseUsage.cacheCreationInputTokens;
      usage.cacheReadInputTokens += responseUsage.cacheReadInputTokens;

      await store.recordCost({
        runId: run.id,
        weddingId,
        ...responseUsage,
        costUsd: calcCostUsd(responseUsage),
      });

      for (const block of message.content) {
        if (block.type === "text" && "text" in block) {
          finalText = String(block.text);
          await appendEvent({ type: "text", text: finalText });
        } else if (block.type === "tool_use" && "name" in block && "id" in block) {
          const name = String(block.name);
          const id = String(block.id);
          const queue = pendingToolUseIds.get(name) ?? [];
          queue.push(id);
          pendingToolUseIds.set(name, queue);
          await appendEvent({
            type: "tool_call",
            tool: name,
            toolUseId: id,
            input: (block as { input: unknown }).input,
          });
        }
      }

      if (message.stop_reason === "pause_turn") {
        toolRun.pushMessages({ role: "assistant", content: message.content });
      }
    }

    status = toolFailure ? "failed" : approvalRequested ? "awaiting_approval" : "done";

    if (status !== "failed") {
      await appendEvent({ type: "done", status, finalText });
    }
  } catch (err) {
    status = "failed";
    const classified = classifyError(err);
    await appendEvent({
      type: "error",
      kind: classified.kind,
      message: classified.message,
      tool: classified.tool,
    });
  }

  await store.finishRun(run.id, { status, finalText });

  return { runId: run.id, status, finalText, approvals: approvalIds, usage };
}

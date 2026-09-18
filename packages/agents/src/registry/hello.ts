import { z } from "zod";
import { defineAgent } from "../define-agent.js";
import { gatedTool } from "../gated-tool.js";
import { renderSnapshot } from "../snapshot.js";
import type { RunnableTool, ToolContext } from "../types.js";

function getWeddingSummaryTool(ctx: ToolContext): RunnableTool<unknown> {
  return {
    name: "get_wedding_summary",
    description: "Read the current wedding snapshot: plan basics and task progress.",
    inputSchema: z.object({}),
    run: async () => {
      const snapshot = await ctx.store.getWeddingSnapshot(ctx.weddingId);
      return renderSnapshot(snapshot);
    },
  };
}

const proposeTaskTool = gatedTool({
  name: "propose_task",
  description:
    "Propose a new task to add to the wedding plan. Requires the couple's approval before it is created.",
  inputSchema: z.object({
    title: z.string().describe("Short, specific task title."),
    phase: z.string().describe("Which lifecycle phase this task belongs to."),
    dueDate: z.string().optional().describe("ISO date this task is due, if known."),
  }),
  actionType: "create_task",
});

/**
 * `hello`: the smallest possible real agent, used to exercise and smoke-test
 * the runtime (docs/specs/agent-runtime.md § Registry).
 */
export const helloAgent = defineAgent({
  name: "hello",
  description: "A minimal concierge agent for exercising the agent runtime.",
  system:
    "You are Atlas, the couple's wedding concierge. Answer questions about " +
    "their wedding plan using the tools provided. Be warm, concise, and " +
    "specific; when you don't know something, say so rather than guessing.",
  effort: "low",
  tools: (ctx) => [getWeddingSummaryTool(ctx), proposeTaskTool(ctx)],
});

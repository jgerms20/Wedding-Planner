import type { z } from "zod";
import type { RunnableTool, ToolContext, ToolFactory } from "./types.js";

export interface GatedToolConfig<TInput> {
  name: string;
  description: string;
  inputSchema: z.ZodType<TInput>;
  /** The `pending_approvals.action_type` this tool queues, e.g. "create_task". */
  actionType: string;
}

/**
 * Builds a tool factory for a side effect that must never run without a
 * human approving it first (CLAUDE.md: "side effects are gated"). Instead
 * of performing the action, `run()` writes a `pending_approvals` row via
 * `ctx.requestApproval` and ends the tool call there - the run finishes
 * without acting, and the approval handler performs the action later.
 */
export function gatedTool<TInput>(config: GatedToolConfig<TInput>): ToolFactory {
  return (ctx: ToolContext): RunnableTool<unknown> => {
    const tool: RunnableTool<TInput> = {
      name: config.name,
      description: config.description,
      inputSchema: config.inputSchema,
      run: async (input: TInput) => {
        const approvalId = await ctx.requestApproval(config.actionType, input);
        return `Queued for approval: ${approvalId}`;
      },
    };
    // Erased to the boxed `RunnableTool<unknown>` shape every tool factory
    // returns; the real client validates/parses input against
    // `inputSchema` before `run` ever sees it (see betaZodTool), so this
    // does not skip type safety at the API boundary - only inside this file.
    return tool as unknown as RunnableTool<unknown>;
  };
}

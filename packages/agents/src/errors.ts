import Anthropic from "@anthropic-ai/sdk";

/**
 * Wraps an error thrown by a tool's `run()` function so the runtime can
 * tell it apart from an error the Anthropic API itself raised (a typed
 * `Anthropic.APIError` subclass).
 */
export class ToolExecutionError extends Error {
  readonly toolName: string;
  readonly cause: unknown;

  constructor(toolName: string, cause: unknown) {
    super(cause instanceof Error ? cause.message : String(cause));
    this.name = "ToolExecutionError";
    this.toolName = toolName;
    this.cause = cause;
  }
}

export interface ClassifiedError {
  kind: "api" | "tool" | "unknown";
  message: string;
  tool?: string;
}

/**
 * Distinguishes a typed Anthropic API error from a tool-execution error
 * from anything else, so `agent_events` can record which side of the
 * boundary a failed run broke on (docs/specs/agent-runtime.md).
 */
export function classifyError(error: unknown): ClassifiedError {
  if (error instanceof ToolExecutionError) {
    return { kind: "tool", message: error.message, tool: error.toolName };
  }
  if (error instanceof Anthropic.APIError) {
    return { kind: "api", message: error.message };
  }
  return {
    kind: "unknown",
    message: error instanceof Error ? error.message : String(error),
  };
}

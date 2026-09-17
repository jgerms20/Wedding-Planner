import type { RunnableTool, AgentEffort } from "../types.js";

export interface SystemBlock {
  type: "text";
  text: string;
  cache_control?: { type: "ephemeral" };
}

export type MessageRole = "user" | "assistant";

export interface TextBlock {
  type: "text";
  text: string;
}

export interface ToolUseBlock {
  type: "tool_use";
  id: string;
  name: string;
  input: unknown;
}

export interface ToolResultBlock {
  type: "tool_result";
  tool_use_id: string;
  content: string;
  is_error?: boolean;
}

/** The subset of an Anthropic content block the runtime actually reads. */
export type ModelContentBlock = TextBlock | ToolUseBlock | { type: string; [key: string]: unknown };

export interface ModelMessageParam {
  role: MessageRole;
  content: string | Array<ModelContentBlock | ToolResultBlock>;
}

export type ModelStopReason =
  | "end_turn"
  | "tool_use"
  | "pause_turn"
  | "max_tokens"
  | "refusal"
  | "stop_sequence"
  | null;

export interface ModelUsage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number | null;
  cache_read_input_tokens: number | null;
}

export interface ModelMessage {
  content: ModelContentBlock[];
  stop_reason: ModelStopReason;
  usage: ModelUsage;
  model: string;
}

export interface ToolRunParams {
  model: string;
  maxTokens: number;
  effort: AgentEffort;
  system: SystemBlock[];
  messages: ModelMessageParam[];
  tools: RunnableTool<unknown>[];
}

/**
 * A running tool-use loop: an async iterable of assistant turns, plus the
 * ability to resume a `pause_turn` by pushing the paused turn back
 * (mirrors `client.beta.messages.toolRunner()`'s `pushMessages`, see the
 * `claude-api` skill's TypeScript tool-use guide).
 */
export interface ToolRun {
  [Symbol.asyncIterator](): AsyncIterator<ModelMessage>;
  pushMessages(message: ModelMessageParam): void;
}

/**
 * The boundary between the agent runtime and the model provider. The real
 * implementation wraps `@anthropic-ai/sdk`'s beta tool runner; tests use
 * `createFakeClient` instead so they never call the live API.
 */
export interface ModelClient {
  createToolRun(params: ToolRunParams): ToolRun;
}

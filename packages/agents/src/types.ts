import type { z } from "zod";

/**
 * Minimal wedding snapshot used to ground an agent run in the couple's
 * current plan. This is a placeholder shape for Phase 0a: the real,
 * canonical entity types live in `packages/shared` (see
 * `docs/specs/entities.md`) and Phase 0b should replace this with an
 * import from there once that package exposes it.
 */
export interface WeddingSnapshotTask {
  title: string;
  phase: string;
  dueDate?: string;
}

export interface WeddingSnapshot {
  wedding: {
    id: string;
    name: string;
    targetDate?: string;
  };
  tasksSummary: {
    total: number;
    done: number;
    upcoming: WeddingSnapshotTask[];
  };
}

export type AgentRunStatus = "running" | "done" | "awaiting_approval" | "failed";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Run {
  id: string;
  weddingId: string;
  agent: string;
  input: string;
  trigger: string;
  status: AgentRunStatus;
  finalText?: string;
  createdAt: string;
  finishedAt?: string;
}

export interface Approval {
  id: string;
  weddingId: string;
  runId: string;
  actionType: string;
  payload: unknown;
  status: ApprovalStatus;
  createdAt: string;
}

export interface CostLedgerEntry {
  runId: string;
  weddingId: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheCreationInputTokens: number;
  cacheReadInputTokens: number;
  costUsd: number;
}

export interface CostLedgerRow extends CostLedgerEntry {
  id: string;
  createdAt: string;
}

/** The six event kinds every agent run logs, per docs/specs/agent-runtime.md. */
export type AgentEvent =
  | { type: "text"; seq: number; text: string }
  | { type: "tool_call"; seq: number; tool: string; toolUseId: string; input: unknown }
  | { type: "tool_result"; seq: number; tool: string; toolUseId?: string; output: string }
  | { type: "approval_requested"; seq: number; approvalId: string; actionType: string }
  | { type: "done"; seq: number; status: "done" | "awaiting_approval"; finalText: string }
  | {
      type: "error";
      seq: number;
      kind: "api" | "tool" | "unknown";
      message: string;
      tool?: string;
    };

/** Distributes `Omit` over the `AgentEvent` union so each variant keeps its own shape. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type AgentEventInput = DistributiveOmit<AgentEvent, "seq">;

export interface RunStore {
  createRun(input: {
    weddingId: string;
    agent: string;
    input: string;
    trigger: string;
  }): Promise<Run>;
  appendEvent(runId: string, event: AgentEventInput): Promise<void>;
  finishRun(
    runId: string,
    patch: Partial<Pick<Run, "status" | "finalText">>,
  ): Promise<void>;
  createApproval(input: {
    weddingId: string;
    runId: string;
    actionType: string;
    payload: unknown;
  }): Promise<Approval>;
  recordCost(entry: CostLedgerEntry): Promise<void>;
  getWeddingSnapshot(weddingId: string): Promise<WeddingSnapshot>;
}

export interface ToolContext {
  weddingId: string;
  runId: string;
  store: RunStore;
  requestApproval(actionType: string, payload: unknown): Promise<string>;
}

export interface RunnableTool<TInput = unknown> {
  name: string;
  description: string;
  inputSchema: z.ZodType<TInput>;
  run: (input: TInput) => Promise<string>;
}

/** A tool bound to a run's `ToolContext`, ready to be handed to the model client. */
export type ToolFactory = (ctx: ToolContext) => RunnableTool<unknown>;

/** A raw server-tool definition (e.g. web_search) passed straight through to the API. */
export type ServerTool = Record<string, unknown>;

export type AgentModel = "claude-opus-5" | "claude-sonnet-5" | "claude-haiku-4-5";
export type AgentEffort = "low" | "medium" | "high" | "xhigh";

export interface AgentConfig {
  name: string;
  description: string;
  system: string;
  tools: (ctx: ToolContext) => RunnableTool<unknown>[];
  serverTools?: ServerTool[];
  model?: AgentModel;
  effort?: AgentEffort;
  maxIterations?: number;
}

export interface RunResult {
  runId: string;
  status: "done" | "awaiting_approval" | "failed";
  finalText: string;
  approvals: string[];
  usage: {
    inputTokens: number;
    outputTokens: number;
    cacheCreationInputTokens: number;
    cacheReadInputTokens: number;
  };
}

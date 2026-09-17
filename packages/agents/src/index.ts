export const PACKAGE_NAME = "@bower/agents";

export { defineAgent } from "./define-agent.js";
export { gatedTool } from "./gated-tool.js";
export type { GatedToolConfig } from "./gated-tool.js";
export { untrusted } from "./untrusted.js";
export { renderSnapshot, emptySnapshot } from "./snapshot.js";
export { runAgent } from "./runtime.js";
export type { RunAgentParams } from "./runtime.js";
export { classifyError, ToolExecutionError } from "./errors.js";
export type { ClassifiedError } from "./errors.js";
export { calcCostUsd } from "./pricing.js";

export { createMemoryStore } from "./store/memory.js";
export type { MemoryStore, MemoryStoreOptions } from "./store/memory.js";

export { createAnthropicClient } from "./client/anthropic.js";
export type { AnthropicClientOptions } from "./client/anthropic.js";
export { createFakeClient } from "./client/fake.js";
export type { FakeTurn } from "./client/fake.js";
export type {
  ModelClient,
  ModelContentBlock,
  ModelMessage,
  ModelMessageParam,
  ModelStopReason,
  ModelUsage,
  SystemBlock,
  ToolRun,
  ToolRunParams,
} from "./client/types.js";

export { registry, helloAgent } from "./registry/index.js";

export type {
  AgentConfig,
  AgentEffort,
  AgentEvent,
  AgentEventInput,
  AgentModel,
  AgentRunStatus,
  Approval,
  ApprovalStatus,
  CostLedgerEntry,
  CostLedgerRow,
  RunResult,
  RunStore,
  RunnableTool,
  Run,
  ServerTool,
  ToolContext,
  ToolFactory,
  WeddingSnapshot,
  WeddingSnapshotTask,
} from "./types.js";

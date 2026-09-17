import { emptySnapshot } from "../snapshot.js";
import type {
  AgentEvent,
  AgentEventInput,
  Approval,
  CostLedgerEntry,
  CostLedgerRow,
  Run,
  RunStore,
  WeddingSnapshot,
} from "../types.js";

export interface MemoryStoreOptions {
  /** Wedding snapshots keyed by weddingId, seeded up front. */
  snapshots?: Record<string, WeddingSnapshot>;
}

/**
 * An in-memory `RunStore` for tests and the worker's `dry-run` command
 * (docs/specs/agent-runtime.md). The Supabase-backed store is Phase 0b.
 * Beyond the `RunStore` interface it exposes plain getters so callers
 * (tests, the CLI) can inspect what a run wrote.
 */
export interface MemoryStore extends RunStore {
  getRun(runId: string): Run | undefined;
  getEvents(runId: string): AgentEvent[];
  getApprovals(runId?: string): Approval[];
  getCostLedger(): CostLedgerRow[];
  setSnapshot(weddingId: string, snapshot: WeddingSnapshot): void;
}

export function createMemoryStore(options: MemoryStoreOptions = {}): MemoryStore {
  const runs = new Map<string, Run>();
  const events = new Map<string, AgentEvent[]>();
  const approvals = new Map<string, Approval>();
  const costLedger: CostLedgerRow[] = [];
  const snapshots = new Map<string, WeddingSnapshot>(Object.entries(options.snapshots ?? {}));

  let counter = 0;
  const nextId = (prefix: string) => `${prefix}_${++counter}`;

  return {
    async createRun({ weddingId, agent, input, trigger }) {
      const run: Run = {
        id: nextId("run"),
        weddingId,
        agent,
        input,
        trigger,
        status: "running",
        createdAt: new Date().toISOString(),
      };
      runs.set(run.id, run);
      events.set(run.id, []);
      return run;
    },

    async appendEvent(runId: string, event: AgentEventInput) {
      const list = events.get(runId);
      if (!list) throw new Error(`unknown run: ${runId}`);
      list.push({ ...event, seq: list.length } as AgentEvent);
    },

    async finishRun(runId: string, patch) {
      const run = runs.get(runId);
      if (!run) throw new Error(`unknown run: ${runId}`);
      Object.assign(run, patch, { finishedAt: new Date().toISOString() });
    },

    async createApproval({ weddingId, runId, actionType, payload }) {
      const approval: Approval = {
        id: nextId("approval"),
        weddingId,
        runId,
        actionType,
        payload,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      approvals.set(approval.id, approval);
      return approval;
    },

    async recordCost(entry: CostLedgerEntry) {
      costLedger.push({ ...entry, id: nextId("cost"), createdAt: new Date().toISOString() });
    },

    async getWeddingSnapshot(weddingId: string) {
      return snapshots.get(weddingId) ?? emptySnapshot(weddingId);
    },

    getRun: (runId: string) => runs.get(runId),
    getEvents: (runId: string) => events.get(runId) ?? [],
    getApprovals: (runId?: string) =>
      [...approvals.values()].filter((approval) => !runId || approval.runId === runId),
    getCostLedger: () => costLedger,
    setSnapshot: (weddingId: string, snapshot: WeddingSnapshot) => {
      snapshots.set(weddingId, snapshot);
    },
  };
}

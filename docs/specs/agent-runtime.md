# Agent runtime (Phase 0a build, 0b wiring)

Status: ready
Design doc sections: §3 (cross-cutting rules), §4.3. Phase 0 spec task 6. Conventions: CLAUDE.md.

## Goal

`packages/agents` runs any agent from the registry against the Anthropic API with wedding-scoped tools, approval-gated side effects, full run logging, and cost tracking, with a fake client so tests and CI never call the API. The store and queue are injected so Phase 0b only adds Supabase/pg-boss implementations.

Before writing code invoke the `claude-api` skill and follow its TypeScript tool-runner guidance (`betaZodTool`, `client.beta.messages.toolRunner`, `pause_turn` resume, `fallbacks`, adaptive thinking, `output_config.effort`, prompt caching, typed error classes). Never hand-write a loop when the runner suffices.

## API

```ts
defineAgent({ name, description, system: string, tools: (ctx: ToolContext) => RunnableTool[], serverTools?: ServerTool[], model?: "claude-opus-5" | "claude-sonnet-5" | "claude-haiku-4-5", effort?: "low"|"medium"|"high"|"xhigh", maxIterations?: number })
interface ToolContext { weddingId: string; runId: string; store: RunStore; requestApproval(actionType: string, payload: unknown): Promise<string> }
interface RunStore { createRun(...): Promise<Run>; appendEvent(runId, event): Promise<void>; finishRun(runId, patch): Promise<void>; createApproval(...): Promise<Approval>; recordCost(...): Promise<void>; getWeddingSnapshot(weddingId): Promise<WeddingSnapshot> }
runAgent({ agent, weddingId, input, trigger, store, client }): Promise<RunResult>  // RunResult: { runId, status: "done"|"awaiting_approval"|"failed", finalText, approvals: string[], usage }
gatedTool({ name, description, inputSchema, actionType }) // run() calls ctx.requestApproval and returns "Queued for approval: <id>"
createFakeClient(script: FakeTurn[]) // stands in for Anthropic; drives toolRunner-compatible responses
```

- Request assembly: `system` as content blocks: `[ { text: agent.system, cache_control: { type: "ephemeral" } }, { text: renderSnapshot(snapshot) } ]`, then messages. `model` default `claude-opus-5`, `thinking: { type: "adaptive" }`, `output_config: { effort }`, `betas: ["server-side-fallback-2026-07-01"]`, `fallbacks: "default"`, `max_tokens` 16000.
- Every iteration appends `agent_events` (`text`, `tool_call`, `tool_result`, `approval_requested`, `done`, `error`) with a `seq`.
- Usage from every response accumulates into the run and one `cost_ledger` row per response using the price table in the `claude-api` skill.
- Status: `awaiting_approval` if any approval was requested during the run, else `done`; `failed` on thrown errors (typed Anthropic errors distinguished from tool errors in the event payload).
- Input from inbound email or fetched pages must be passed through `untrusted(text, source)` which wraps it in a clearly delimited data block with an instruction that it is data, not instructions.

## Registry

`src/registry/hello.ts`: name `hello`, system "You are Bower, the couple's wedding concierge...", effort `low`, tools `get_wedding_summary` (reads the snapshot) and `propose_task` (gated, actionType `create_task`, input `{ title, phase, dueDate? }`). `src/registry/index.ts` exports a map by name.

## Store implementations

`src/store/memory.ts` (in-memory, for tests and the worker's dry-run mode). The Supabase-backed store is Phase 0b.

## Tests (vitest, fake client only)

- `runAgent` logs events in order, records usage and cost, returns `done` with final text.
- A gated tool produces an approval, status `awaiting_approval`, and the tool result text.
- `pause_turn` from a server tool is resumed.
- A thrown tool error becomes an `error` event and `failed` status without crashing the process.
- `untrusted()` wraps content and a snapshot renders deterministically (for cache stability).

## Acceptance

`pnpm --filter @bower/agents typecheck lint test` green; `apps/worker` gets a `dry-run` command (`pnpm --filter @bower/worker dev -- dry-run hello "what's next?"`) that runs the hello agent with the memory store and the fake client when `ANTHROPIC_FAKE=1`, or the real client when an API key is present, and prints the events.

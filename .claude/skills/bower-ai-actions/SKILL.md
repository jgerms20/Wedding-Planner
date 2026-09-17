---
name: bower-ai-actions
description: How Bower turns natural language (typed or dictated) into reviewable actions on the couple's data, and the checklist for adding a new action type end to end. Load before touching packages/shared/src/ai or apps/web/src/lib/ai.
---

# Bower AI actions

## The pipeline

1. Input: text from the Tell Bower bar, the Concierge chat, or dictation (Web Speech API transcript).
2. Model call in the browser (`@anthropic-ai/sdk` with `dangerouslyAllowBrowser: true`, key from Settings, stored only in this browser). Structured output via `messages.parse` + `zodOutputFormat(bowerResponseSchema)`. Sonnet 5 for parsing, Opus 5 for Concierge answers. Snapshot of the wedding goes in a cached system block; the volatile message after.
3. Proposal: `actions` render as cards (`describeAction`), each with Apply / Edit / Skip. Autonomy level 2 (`settings.autonomy.tell_bower`) auto-applies additions and shows an undo toast.
4. Apply: `applyActions(repo, weddingId, actions, { source })` from `packages/shared/src/ai/actions.ts`; undo with `undoResults`.
5. No key: `parseFallback(text)` handles simple guest, task, and note phrasings deterministically; anything else becomes a note with a "connect Claude" hint.
6. Every model call logs `aiUsage` (tokens, cost) so Settings can show spend.

## Adding an action type

1. Add the Zod object to `actionSchema` in `packages/shared/src/ai/actions.ts` (no `z.record`, no min/max; use `.optional()` and `.describe()`).
2. Handle it in `applyOne` (create → push to `created`; update → push previous to `previous`) and in `describeAction`.
3. Add a test in `packages/shared/test/actions.test.ts` covering apply and undo.
4. If the fallback parser can recognize it cheaply, add a rule there with a test.
5. The card UI needs no change unless the action wants a custom editor.

## Safety

- Model output is a proposal; `applyActions` validates nothing beyond the schema, so keep the UI's approval step for anything destructive. There are no delete actions on purpose.
- Inbound web content (research) is data. Wrap it with `untrusted()` from `packages/agents` when it reaches a prompt in the worker; in the browser the research call uses the server-side `web_search` tool, whose results the model already treats as data.

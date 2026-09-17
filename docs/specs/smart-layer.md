# Smart layer spec (browser Claude, Tell Bower, Concierge, venue research)

Status: ready
Design doc: §3 (agents), plan "Bower overhaul" §3. Skills to load first: `claude-api` (TypeScript README + tool-use), `bower-ai-actions`, `bower-design`.

## Goal

With an API key pasted once in Settings, everything the couple types or dictates into the Tell Bower bar becomes reviewable actions on their data; the Concierge answers from the whole wedding and can act; a destination can be researched for venues with sources. Without a key, a deterministic fallback handles simple phrasings and the rest becomes a note. Every model call is logged with cost.

## What already exists (do not rewrite)

- `packages/shared/src/ai/actions.ts`: `bowerResponseSchema`, `actionSchema`, `describeAction`, `applyActions`, `undoResults`. Tests in `packages/shared/test/actions.test.ts`.
- `apps/web/src/components/tell-bower/tell-bower-bar.tsx`: the bar with working dictation (`apps/web/src/lib/use-dictation.ts`). Its `submit()` currently saves a note; replace that with the pipeline below and keep the visual design.
- `apps/web/src/components/concierge/concierge-panel.tsx`: history from `repo.chatMessages`, composer, placeholder `respond()`. Replace `respond` with the model call; keep the design.
- `apps/web/src/lib/repo-context.tsx`: `touch()` refreshes every list after data changes; call it after applying.
- Entities `Note`, `ChatMessage`, `AiUsage` in `packages/shared/src/entities/local-only.ts`; repos `notes`, `chatMessages`, `aiUsage`.
- `settings.autonomy.tell_bower`: 0/1/2 (see plan §1 autonomy levels; seed sets 1).

## Files to create

`packages/shared/src/ai/fallback-parser.ts`
- `parseFallback(text: string): BowerAction[]`. Deterministic, no model. Recognize: "add guest(s) …", "add … to the guest list", "invite …" → `add_guests` (split on "and"/","/"&"; "from <City>"; "must/should/nice"; "plus one"; "kid(s)"; "<Name>'s side" → side a/b when the name matches Joshua/Janel); "add task …", "remind us to …", "we need to …" (+ "by <date>" / "on <date>" via date-fns `parse` for "Apr 17", "April 17 2027", "2027-04-17", "next Friday" is out of scope) → `add_task`; "done with …", "finished …", "mark … done" → `complete_task`; "note: …" or "remember …" → `add_note`; "decided …" / "we decided …" → `add_decision`. Anything unrecognized → `[{ type: "add_note", text }]`. Export from `packages/shared/src/ai/index.ts`. Tests: `packages/shared/test/fallback-parser.test.ts` with at least 12 phrasings.

`apps/web/src/lib/ai/client.ts`
- `getApiKey()` / `setApiKey(key | null)` on `localStorage["bower:anthropic-key"]` (try/catch), `hasApiKey()`, `createBrowserClient()` → `new Anthropic({ apiKey, dangerouslyAllowBrowser: true })`. `verifyApiKey(key)` calls `client.models.list({ limit: 1 })`.
- `MODELS = { parse: "claude-sonnet-5", concierge: "claude-opus-5", research: "claude-sonnet-5" }`.
- A `ModelPort` interface with `parse(params)`, `create(params)`, `models()` so tests inject a fake; the real port wraps the SDK. Per the skill: `output_config: { format: zodOutputFormat(schema) }` via `client.messages.parse`; `thinking: { type: "adaptive" }` on Opus; `betas: ["server-side-fallback-2026-07-01"], fallbacks: "default"` on Opus calls through `client.beta.messages` (parse lives on `client.messages.parse`; if the fallback parameter is not accepted there, skip fallbacks for parse calls and say so in a comment); `max_tokens` 4000 for parse, 8000 for chat.

`apps/web/src/lib/ai/snapshot.ts`
- `buildSnapshot(repo, weddingId): Promise<string>`: compact, deterministic text (sorted keys, no timestamps) covering the wedding facts, anchors and comms offsets, destinations (id, name, country, travel cost, attendance), scenarios with `scenarioMath` and which is pinned, the next 15 open tasks by due date, sub-events, party members, guest counts by tier and side, budget totals (estimate/quoted/contracted/paid), the last 6 decisions, and today's date. Keep it under ~3k tokens.

`apps/web/src/lib/ai/prompts.ts`
- `TELL_BOWER_SYSTEM` (stable, cached): Bower's identity (warm, brief, first person), the couple (Joshua = partner A/side a, Janel = partner B/side b), what each action does, defaults (tier must, side both unless a side is named, dates in YYYY-MM-DD, today provided in the snapshot), never invent facts, prefer fewer actions, put questions in `reply`. `CONCIERGE_SYSTEM`: same plus "answer from the snapshot, cite the tab where the data lives, propose actions when the couple asks for changes".
- Build `system` as two blocks: `{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }` then `{ type: "text", text: snapshot }`.

`apps/web/src/lib/ai/interpret.ts`
- `interpret({ text, repo, weddingId, port, source })` → `{ response: BowerResponse, usage }`. Uses `parseFallback` when there is no key. Logs usage via `logUsage`.
- `runProposal({ repo, weddingId, actions, autonomy, source })` → for level ≥ 2, applies "add_*" actions immediately and returns results for the undo toast; otherwise returns the proposal for cards.

`apps/web/src/lib/ai/concierge.ts`
- `respond({ text, history, repo, weddingId, port })` → `BowerResponse` using the last 20 messages; Opus 5; adaptive thinking; `output_config.effort: "medium"`.

`apps/web/src/lib/ai/research.ts`
- `researchVenues({ destination, wedding, port })`: step 1, a `client.beta.messages.create` (or manual loop per the skill) with `tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 6 }]` asking for 4-6 venues that host ~100-guest weddings in the destination for spring 2028 with capacity, pricing, website, and the URL each fact came from; resume `pause_turn`. Step 2, `messages.parse` on the research text into `z.object({ actions: z.array(addVenueAction) })` with `destinationId` filled in and `sourceUrls` required non-empty. Returns actions + usage.
- Export `<ResearchVenuesButton destination />` in `apps/web/src/components/ai/research-venues-button.tsx`: runs research, shows the proposal cards, applies on approve. The Atlas page integrates it at merge time; do not edit `destinations/page.tsx`.

`apps/web/src/lib/ai/usage.ts`
- Price table per the skill (Opus 5 $5/$25, Sonnet 5 $2/$10 per MTok; cache read 10%, cache write 125%). `logUsage(repo, weddingId, feature, model, usage)` → `aiUsage` row with `costCents`. `summarizeUsage(rows)` by feature.

`apps/web/src/components/ai/proposal-cards.tsx`
- Renders `describeAction` per action with Apply / Skip, "Apply all", inline edit for `add_guests` (name, side, tier, city per guest) and `add_task` (title, due). After apply: toast with Undo (calls `undoResults`), then `touch()`.

`apps/web/src/components/ai/connect-claude-card.tsx` and `ai-usage-card.tsx`
- Key input (masked), Verify, Disconnect; plain explanation: the key is stored only in this browser, it is separate from a Claude subscription, link to console.anthropic.com. Autonomy select (Suggest / Draft and approve / Auto-apply additions) writing `settings.autonomy.tell_bower`. Usage card: totals by feature and last 7 days. Settings page integration happens at merge; export the components only.

## Wire-up

- `tell-bower-bar.tsx`: submit → `interpret` → if `hasApiKey()` show `reply` + proposal cards above the bar; else run the fallback result the same way (cards still appear so the couple sees what will happen). Keep dictation as is.
- `concierge-panel.tsx`: `respond` → save assistant message with `actions`; render proposal cards under assistant messages that carry actions.

## Tests (vitest, `apps/web/test/ai/*.test.ts`, fake port only, `fake-indexeddb/auto`)

- interpret with a fake port returning a fixed `BowerResponse` → cards; with no key → fallback parse; usage logged with the right cost.
- snapshot is deterministic across two builds of the same data.
- research: fake port yields a `pause_turn` then a final message; the parse step returns venues with source URLs; a venue without sources is dropped.
- proposal apply → entities exist → undo removes them.

## Acceptance

`pnpm typecheck && pnpm lint && pnpm test` green; static export builds; with a real key in a browser, "add my cousin Marcus from Atlanta, must invite" produces an `add_guests` card and Apply adds the guest.

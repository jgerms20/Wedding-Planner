# Bower: agent-powered wedding planning

Working product name: **Bower** (a bower is the leafy arch a couple stands under; a bowerbird builds elaborate structures for its mate). Domain and trademark check pending; the name lives in one config constant so renaming is trivial.

## Context

You got engaged last week in Brazil, target wedding is spring 2028 (~18 months out), and you want a dashboard "full of agents" that actually does the work of planning: sourcing venues, emailing and negotiating with vendors, keeping the budget and guest list honest, and planning every event around the wedding (engagement party, showers, bachelor/bachelorette, rehearsal dinner). You are the first customer. The end goal is a product you can sell to other couples.

This is the founding design document. It covers what the product does, which agents exist and what each can do, the architecture, the data model, the build order, and how to run the build with sub-agents without burning credits.

Decisions made at kickoff (2026-09-17):

| Decision | Choice |
|---|---|
| Your timeline | Just engaged, spring 2028, no date or venue yet |
| Product shape | Full web app, multi-tenant from day one |
| Vendor outreach in v1 | Email, every outbound message approved by you; voice calling later |
| Users per wedding | The couple (two owner accounts); roles for parents/planner deferred but modeled |

Feedback folded in on 2026-09-17 (second pass): destination-first selection with a comparison tool that recomputes plan and cost; the lifecycle is an editable template built around **anchor events** and **travel windows**; a layer of small persistent micro-agents; a **local data mode** so the app is hosted and usable before any accounts exist; and a model-tiered build process. Two corrections from research, applied below: the agent runtime is the **Anthropic SDK tool runner** (not the "Claude Agent SDK", which is a filesystem/coding harness), and vendor email runs through a **dedicated per-wedding inbox** rather than your Gmail, because reading Gmail replies requires Google's restricted-scope CASA audit for a sellable product.

---

## 1. What the product is

**One sentence:** a wedding operating system where a team of specialist AI agents does the legwork (research, outreach, negotiation, tracking, drafting) and the couple approves and decides.

**Why it beats Zola / The Knot / Joy / WedCheese / TheWeddingPlanner.ai:** those are checklists, trackers, and vendor directories with an AI chat bolted on. None of them will find twenty venues that fit your criteria, email all of them, parse the quotes into a comparison table, chase the ones that go silent, and negotiate toward your target price. That outreach-and-negotiation loop is the moat. Everything else (budget, guest list, timeline) has to be excellent because you live in it daily, but it is table stakes.

**Autonomy levels** (a product concept that applies to every agent, set per agent in settings):

| Level | Meaning | Default for |
|---|---|---|
| 0 Suggest | Agent proposes, does nothing | Legal/admin guidance |
| 1 Draft + approve | Agent drafts, you approve each action | All outbound email, all spending changes |
| 2 Auto within rules | Agent acts on its own inside rules you set (e.g. "send follow-ups after 5 days of silence", "auto-reply to availability questions"), you are notified | Follow-ups, informational replies (opt-in) |
| 3 Autonomous with guardrails | Agent pursues a goal (target price, must-haves) and only escalates | Later, once trust is earned |

Ship v1 with Level 1 for anything that leaves the app. Level 2 is where "we couldn't have done this without it" lives, and it is a settings toggle, not new code.

---

## 2. The domain: what a modern wedding actually involves

This section is the map the agents plan against. It becomes seed data (`packages/agents/knowledge/timeline.ts`) that the Timeline agent adapts to each couple.

### 2.1 Lifecycle phases (default template, fully editable)

The table below is the **default template**, not a rule. Every couple edits it, and the Timeline agent re-derives it from three inputs:

- **Anchor events.** Moments the couple chooses to organize around. For us: a **spring 2027 engagement party** roughly a year out that doubles as the reveal of the date, the destination, and the wedding party; save-the-dates go out immediately after it; invitations go out far earlier than the conventional 6-8 weeks (our default: ~9-12 months, with an early RSVP deadline so guests can book travel). The conventional dates are shown as a reference, never enforced.
- **Travel windows.** Periods when we are physically somewhere useful (e.g. East Coast trips). The Timeline agent schedules in-person tasks (venue tours, tastings, family conversations, attire fittings) into those windows and warns when a window is the last chance for something.
- **Destination template.** A destination wedding shifts communications earlier, adds legal and travel tasks, and changes lead times; choosing a destination scenario (see §2.6) re-plans automatically.

| Phase | When | What happens |
|---|---|---|
| A. Just engaged | Weeks 0-4 | Tell family, then announce publicly; engagement photos; ring insurance/appraisal; align on vision (size, vibe, season, local vs destination); gut guest count; who contributes to budget; planner vs DIY; pick wedding party; engagement party planning (usually 1-3 months post-engagement, often hosted by parents) |
| B. Foundation | 12-18 mo out | Set budget + contributions; guest list draft (A/B tiers); destination/venue research, tours, **book venue and date**; ceremony site if separate; officiant; planner/coordinator; book the vendors that sell out first: photographer, videographer, caterer, band/DJ; wedding website; hotel room blocks (destination: earlier) |
| C. Core vendors | 9-12 mo | Attire shopping (gowns take 4-6 months + alterations); florist; cake; rentals; hair/makeup; transport; honeymoon research; passports; premarital counseling if venue/religion requires; rehearsal dinner venue |
| D. Communications | 6-9 mo | Send save-the-dates (destination: 9-12 mo); invitation design; menu tastings; ceremony music; wedding party attire; wedding bands; showers and bach parties get dates and hosts |
| E. Details | 3-6 mo | Send invitations (6-8 weeks before; 3 months for destination); finalize menu; showers, bach trips, engagement-adjacent events happen; day-of timeline draft; vendor insurance certificates; marriage license research (waiting periods and expiry vary by state); prenup if any (must be done early, separate counsel); vows and readings; seating chart start; gifts for wedding party and parents; fittings |
| F. Final stretch | 1-3 mo | RSVP deadline (3-4 weeks out) and chase non-responders; final headcount to caterer (~2 weeks out); seating chart; final vendor confirmations and payment schedule; get marriage license inside its validity window; hair/makeup trial; final timeline to all vendors; rehearsal; tip envelopes; emergency kit; programs |
| G. Wedding weekend | Days -2 to +1 | Rehearsal + dinner; welcome party; getting ready; ceremony; reception; send-off; after-party; morning-after brunch |
| H. After | 0-3 mo after | Thank-you notes (within 3 months); vendor reviews; certified marriage certificate copies; name change (SSA, DMV, passport, banks, employer); insurance/beneficiary updates; dress/bouquet preservation; photo delivery; budget reconciliation |

### 2.2 Satellite events (each is its own mini-project)

Each has its own date, host, venue, budget, guest subset, and RSVP tracking. Often hosted by someone other than the couple, so each needs a shareable plan.

- Engagement party (soonest for you; plan first)
- Bridal shower(s), couples shower, groom's shower
- Bachelor party and bachelorette party (increasingly destination trips: 6+ months lead time, cost split among attendees, group polling on dates)
- Rehearsal dinner, welcome party, morning-after brunch
- Honeymoon

### 2.3 Wedding party

Roles: maid/matron of honor, best man/best woman, bridesmaids, groomsmen, mixed-role attendants, flower kid, ring bearer, ushers, readers, officiant. Per person: how/when they were asked, duties checklist, attire and who pays, dates they must hold, costs they bear (bach trip, attire), contact info.

### 2.4 Legal and administrative (guidance, always framed as "confirm with the county/an attorney")

- Marriage license: jurisdiction-specific waiting period, validity window, ID and witness requirements, fees, who returns it after the ceremony
- Officiant legality by state; friend-officiant ordination rules
- Destination weddings: many couples do a legal ceremony at home and a symbolic ceremony abroad; foreign legal requirements (residency days, apostilles, translations)
- Prenup timing and independent counsel
- Name change checklist and order of operations
- Insurance: event liability (venues often require), cancellation, ring
- Vendor contracts: cancellation and force majeure, deposit and payment schedule, overtime rates, certificate of insurance, exclusivity, image rights
- After marriage: wills, beneficiaries, health insurance enrollment windows

### 2.5 Things people forget (the "don't forget" agent's seed list)

Vendor meals; tips and who hands them out; overtime; service charges and tax on catering (often 20-25% on top); postage weight of invitations; alterations; marriage license fee; wedding party transport; welcome bags; sunset time on the day (photo schedule); rain plan; accessibility; dietary needs; kids policy; plus-one policy; hotel block release dates; day-of emergency kit; who holds the rings; vendor load-in and parking; sound curfews and permits; open-flame/sparkler rules; dress code communication; timeline buffers; returning the signed license; thank-you notes.

### 2.6 Destination-first selection and the comparison tool

Selection is hierarchical: **destination → venue → date**, and each level is a **scenario** that can be compared side by side before one is pinned as active.

- A **destination** (city/region/country) carries: travel cost per guest from the guest list's home cities, lodging cost bands, weather by month, legal requirements (residency days, apostilles, symbolic vs legal ceremony), peak-season pricing, and an estimated attendance rate (which guests are likely to travel).
- **Venues** live under destinations with capacity, rental fee, F&B minimums, in-house services, lodging on site, and date availability from outreach.
- A **scenario** = destination + venue + date range + guest count assumption. Pinning a scenario recomputes the budget (per-guest and fixed costs), the guest count estimate, the timeline (lead times, legal tasks, communications dates), and the wedding-party costs. Scenarios are versioned so we can revisit "what if Brazil" months later.
- The **comparison tool** shows scenarios in columns with the deltas that matter: total cost, cost per guest, expected attendance, travel burden, weather, lead time risk, and the top three unknowns the Scout still needs to resolve.

---

## 3. The agent roster

Every agent is a declarative config in `packages/agents/registry/` (name, purpose, system prompt, tool set, model, effort, autonomy defaults, triggers). Tools are scoped to one wedding at construction time. Build order is in section 6.

| # | Agent | What it does when it is "super capable" | Tools | Triggers |
|---|---|---|---|---|
| 1 | **Concierge** (the chat on the dashboard) | Answers anything about your wedding from live data, explains the plan, delegates to specialists, produces the daily/weekly brief | read all wedding data, create tasks, schedule reminders, invoke other agents, web search | User message; daily cron |
| 2 | **Intake** | Conversational interview at signup (section 8 questions) that produces the wedding profile, constraints, priorities, and first plan | write profile, create initial tasks | Signup; "re-interview" |
| 3 | **Timeline / Chief of Staff** | Generates the month-by-month plan from date, style, destination, guest count; re-plans when anything changes (date moves, destination chosen); surfaces this week; dependency-aware ("can't send invites before the venue is booked"); owns the don't-forget list | read/write tasks, events, deadlines | Profile change; weekly cron; user ask |
| 4 | **Budget** | Builds the budget from guest count + region + priorities using category benchmarks; tracks estimate → quoted → contracted → paid; payment reminders; reads uploaded quotes/contracts (PDF) and extracts line items; what-if ("cut 20 guests", "skip videographer"); flags service charges and tax | read/write budget, payments; read files; structured extraction | Quote/contract upload; user ask; payment due cron |
| 5 | **Guest List** | Imports CSV/Google contacts, dedupes into households, tiers (must/should/nice), sides, plus-one and kids policy; scenario filters ("who makes the cut at 120?"); tracks save-the-date/invite/RSVP/gift/thank-you per event; emails guests for addresses and dietary needs (approval-gated) | read/write guests, households, RSVPs; send_email (gated) | Import; user ask; RSVP deadline cron |
| 6 | **Destination & Venue Scout** | Works top-down: proposes destinations against criteria (season, budget, guest travel burden, legal simplicity, vibe), then venues under each with sourced facts (capacity, rental fee, F&B minimum, in-house services, lodging, weather by month), estimates per-guest travel cost from the guest list's home cities, builds **scenarios** for the comparison tool, and finds contact channels for outreach | web_search, web_fetch, upsert destinations/venues/scenarios, read guests | User ask; scenario pinned |
| 7 | **Vendor Outreach & Negotiation** | Per vendor thread: drafts the inquiry (availability, pricing, packages), sends after approval, reads replies, extracts quotes into structured data, asks follow-ups, schedules tours into the calendar, chases silence after N days, negotiates toward your target within your rules, escalates decisions | read vendor/thread; send_email (gated); update quote; create calendar event; create approval | Inbound email; approval granted; follow-up cron; user ask |
| 8 | **Contract Reviewer** | Summarizes a contract, flags risky terms (cancellation, force majeure, overtime, deposit non-refundability, exclusivity), builds the payment schedule into the budget | read files (PDF as document blocks); write payments, tasks | Contract upload |
| 9 | **Legal & Admin Guide** | Jurisdiction-specific marriage license steps with citations, officiant rules, destination legal validity, name change checklist, insurance to consider, prenup timing; creates dated tasks | web_search (citations required), create tasks | Venue/date set; user ask |
| 10 | **Events** (engagement party, showers, bach trips, rehearsal dinner, welcome party, brunch) | Each sub-event gets a plan: budget, guest subset, venue options, date polling, host coordination, itinerary (bach trips), cost split; produces a shareable read-only plan for the host | all of the above scoped to a sub-event; web search; date poll links | User creates sub-event |
| 11 | **Wedding Party** | Role assignments, "how to ask" ideas, duties checklists per role, attire tracking, must-hold dates, group message drafts | read/write party members; send_email (gated) | User ask |
| 12 | **Design & Stationery** | Mood boards and palette from inspiration uploads, save-the-date/invite copy and layouts, wedding website content, signage, programs, seating display. Output via HTML→PDF first; Canva connector as a later upgrade | read files, generate documents (code execution or HTML render), write files | User ask |
| 13 | **Day-of Logistics** | Builds the minute-by-minute day-of timeline (sunset, travel times, vendor arrivals), vendor contact sheet, rain plan, emergency kit, seating chart optimizer (constraints: keep apart, keep together, tables) | read everything; write timeline, seating | 8 weeks out |
| 14 | **Gifts & Thank-you** | Registry suggestions, gift log, per-gift thank-you note drafts | read/write gifts | After showers/wedding |
| 15 | **Voice** (Phase 5) | Calls vendors for availability/pricing when email stalls, with AI disclosure and recording consent, transcript into the thread | Retell AI (telephony-native, compliance tooling) | Level 2+ only, user-initiated |
| 16 | **Post-Wedding** | Name change sequence, certificate copies, vendor reviews, preservation, reconciliation | tasks, budget | Day after |

**Micro-agents (persistent, cheap, run on schedules or events; Haiku 4.5 or Sonnet 5):**

| Micro-agent | Job |
|---|---|
| Inbox triage | Classifies every inbound email (vendor reply, quote, guest RSVP, spam) and routes it to the right agent or thread |
| Follow-up chaser | Finds threads silent past their SLA and drafts the nudge (auto-sends at Level 2) |
| Deadline sentinel | Watches tasks, payments, RSVP deadlines, and hotel block release dates; escalates into the daily brief |
| Payment reminder | Upcoming deposits and balances with the contract terms attached |
| Price watcher | Tracks flight and lodging prices for pinned destination scenarios and guest home cities |
| Attendance estimator | Re-estimates likely headcount per scenario from guest tiers, distance, and RSVP history |
| Guest hygiene | Duplicate detection, missing addresses/emails, household merges |
| Decision logger | Turns approved actions and chat conclusions into `decisions` entries so nothing is re-argued |
| Brief composer | Assembles the daily/weekly brief from the above |
| Vendor responsiveness | Tracks response times per vendor as a signal in comparisons |

Cross-cutting rules for every agent:
- **Inbound content is untrusted.** Vendor emails and fetched web pages are wrapped as data; agents never follow instructions found in them, and every outbound action is gated regardless.
- **Every run is logged** (`agent_runs`: input, transcript, tool calls, tokens, cost) and shown in the dashboard activity feed so you can see what each agent did and why.
- **Approvals never block a process.** A gated tool writes a `pending_approvals` row and ends the run. Approval in the UI performs the action and, if needed, starts a new run. No long-lived waiting.

---

## 4. Architecture

### 4.1 Stack

| Layer | Choice | Why |
|---|---|---|
| Monorepo | pnpm workspaces + Turborepo | `apps/web`, `apps/worker`, `packages/db`, `packages/agents`, `packages/shared` |
| Web app | Next.js (App Router), TypeScript, Tailwind, shadcn/ui | Sellable UI fast; you know the ecosystem via Claude Code |
| Database / auth / storage / realtime | Supabase (Postgres, Auth with magic link + Google sign-in, Storage, Realtime) | One vendor, free tier, row-level security is the multi-tenant boundary |
| ORM / migrations | Drizzle | TS-first schema, plain SQL migrations, RLS policies checked into git |
| Background worker | Node service on Railway (or Fly.io) running **pg-boss** on the same Postgres | Agent runs can take minutes; no serverless timeouts; cron and retries built in; zero extra vendors. Swap to Trigger.dev later only if this becomes a burden |
| LLM | `@anthropic-ai/sdk` tool runner (`betaZodTool`), model `claude-opus-5` with `fallbacks: "default"`, adaptive thinking, `effort` per agent; `claude-sonnet-5` for bulk extraction/classification; server tools `web_search_20260209` + `web_fetch_20260209` for scouts; `messages.parse` + Zod for structured extraction; prompt caching on the stable system prompt + wedding context block | Agents are DB-scoped tool users, not filesystem agents; the tool runner gives approval hooks without a hand-written loop |
| Email | Postmark: outbound from `{wedding-slug}@mail.<yourdomain>`, inbound webhook (full body in one POST) → thread → agent job | Avoids Gmail restricted scopes entirely; every wedding gets its own inbox; you can enable "copy me on everything" |
| Calendar | Internal events + per-wedding **ICS feed** (subscribe from Google/Apple) in v1; Google Calendar two-way sync later (calendar scope is only "sensitive", not restricted) | Zero OAuth verification work to be useful now |
| Files | Supabase Storage under `weddings/{id}/…` + `files` table; PDFs passed to Claude as document blocks | Contracts, quotes, inspiration, licenses, vows |
| Data access | A repository interface in `packages/shared` with two adapters: **`local`** (browser IndexedDB, per-device, JSON export/import) and **`supabase`**. Local mode lets the app build as a static site and deploy to **GitHub Pages** with zero accounts, so it is usable immediately; Supabase mode adds shared, multi-device, multi-user data | Usable now, and the same UI code runs against both |
| Hosting | Vercel (web) + Railway (worker) + Supabase | Standard, cheap, scales to first customers |
| Observability | `agent_runs` transcripts + per-wedding cost ledger; Sentry | Needed to sell it and to control spend |
| Billing (Phase 4) | Stripe | |

### 4.2 Data model (core tables; all tenant tables carry `wedding_id`)

- **Tenancy:** `users`, `weddings` (slug, date, date_flexibility, location, style, guest_target, inbox_address), `wedding_members` (role: owner now; viewer/editor/planner later), `wedding_settings` (autonomy levels per agent, notification prefs)
- **Plan:** `tasks` (phase, due, depends_on, status, owner, source_agent), `events` (calendar), `reminders`, `decisions` (a log of choices and why)
- **Money:** `budget_categories`, `budget_items` (estimate, quoted, contracted, paid), `payments` (due date, status), `contributions` (who funds what)
- **People:** `households`, `guests` (side, tier, relationship, plus_one, kids, contact, dietary, address), `guest_event_status` (per sub-event: invited/sent/rsvp/gift/thank_you), `wedding_party_members`
- **Events:** `sub_events` (type, date, host, venue, budget link, guest subset rule)
- **Selection:** `destinations` (travel/lodging/legal/weather facts), `scenarios` (destination, venue, date range, guest assumption, computed deltas, pinned flag, version)
- **Vendors:** `vendors` (category, contact channels, price range, source URLs), `venues` (extends vendor: capacity, fees, minimums, lodging, in-house services), `quotes` + `quote_line_items`, `contracts`, `vendor_status` pipeline (not contacted → contacted → awaiting → replied → quoted → touring → negotiating → booked/declined)
- **Comms:** `threads` (vendor or guest), `messages` (direction, body, parsed fields, postmark ids), `pending_approvals` (action type, payload, agent_run_id, status)
- **Agents:** `agent_runs`, `agent_events` (streamed steps for the live activity feed), `chat_messages` (Concierge), `cost_ledger`
- **Files:** `files` (storage path, kind, linked entity, extracted_text)

### 4.3 Agent runtime (in `apps/worker`)

1. A trigger (user message, inbound email, cron, data change) enqueues `agent.run` with `{wedding_id, agent, input}`.
2. The worker loads the agent config, builds tools closed over `wedding_id` (so a tool physically cannot touch another wedding), assembles context (stable system prompt with `cache_control`, then a wedding snapshot block, then the task), and runs the tool runner. `pause_turn` from server tools is resumed explicitly.
3. Gated tools (`send_email`, `commit_budget_change`, `book_calendar_with_vendor`) do not act: they insert a `pending_approvals` row, return "queued for approval", and the run finishes with a summary.
4. Approval in the UI runs the action handler (e.g. Postmark send), records the message on the thread, and marks the approval executed.
5. Inbound Postmark webhook → verify → match thread by inbox address + `In-Reply-To`/MailboxHash → store message → enqueue `agent.run` for the Outreach agent with the thread history.
6. Every step streams to `agent_events` so the dashboard shows the agent working in real time (Supabase Realtime).
7. Cost: `usage` from every response is written to `cost_ledger`; per-wedding monthly cap enforced in the worker.

### 4.4 Security and trust

- RLS on every tenant table keyed by `wedding_members`; the worker uses the service role but only through wedding-scoped tool factories.
- Inbound email and fetched pages are delimited as untrusted data in prompts; no tool acts on them without approval.
- Outbound rate limits per wedding and per vendor; unsubscribe/stop handling on guest emails.
- Secrets only in the worker and server routes; never in the Next.js client bundle.
- Legal content carries a standing "verify with the county/an attorney" note.

---

## 5. Dashboard (what you see)

- **Home:** countdown, "this week" tasks, budget snapshot (committed vs target), pending approvals count, live agent activity feed, next deadlines.
- **Plan:** the full timeline by phase, filterable; drag due dates; dependencies visible.
- **Budget:** categories, items with the four money states, payment calendar, what-if panel.
- **Guests:** household table with tiers, sides, scenario filter, per-event RSVP columns, import/export.
- **Venues & Vendors:** destinations → venues; pipeline board; comparison table with sourced fields; per-vendor thread view with approve/edit/send.
- **Inbox / Approvals:** every drafted message and proposed change waiting on you; one click to approve, edit, or reject with a note the agent learns from.
- **Events:** one card per satellite event with its own mini-dashboard and a shareable host link.
- **Wedding Party:** roles, duties, attire, dates.
- **Files:** vault with kinds; drop a PDF and the right agent picks it up.
- **Calendar:** month view + ICS subscribe link.
- **Concierge:** persistent chat drawer on every page.
- **Settings:** partner invite, autonomy levels, inbox address, "copy me on emails", notification preferences.

---

## 6. Build order

Each phase ends with something you actually use for your wedding. Phase 2 is the moat; Phase 1 is what makes you open the app daily.

### Phase 0a: Usable now, no accounts (first)
Monorepo scaffold; app shell with every screen; **local data mode** (IndexedDB) with JSON export/import; intake form that seeds the wedding profile; editable timeline with anchors and travel windows generated from the template; destinations/scenarios comparison (manual entry); countdown; static export deployed to GitHub Pages. Also the `packages/db` migration + RLS and the agent runtime with a fake client, so Phase 0b is wiring, not building.
**Done when:** both of you can open the Pages URL and start entering real things this weekend (per-device until 0b).

### Phase 0b: Foundation with accounts
Supabase project; auth; create wedding + invite partner; base schema for tenancy/tasks/events with RLS; app shell and navigation; worker with pg-boss and the agent runtime skeleton running one trivial agent end-to-end with `agent_runs` logging; deploy pipeline (Vercel + Railway); seed script with a fake wedding; CI (typecheck, lint, tests).
**Done when:** both of you can log in, see an empty dashboard, and an agent run shows up in the activity feed.

### Phase 1: Personal MVP ("we use this every day")
Intake agent and onboarding flow; Timeline agent generating the 18-month plan from section 2; Home dashboard with countdown and this-week; Budget module + agent (benchmarks, four money states, what-if); Guest list module + agent (import, households, tiers, scenario filter); Files vault; Calendar + ICS feed; Concierge chat.
**Done when:** your real budget, guest list, and plan live here and the weekly brief is useful.

### Phase 2: Outreach (the differentiator)
Destinations/vendors/venues CRM and pipeline board; Postmark domain, per-wedding inbox, inbound webhook; Venue & Destination Scout with sourced comparison tables; Vendor Outreach & Negotiation agent with the approvals inbox; quote extraction into `quotes`; follow-up scheduler; tour scheduling to calendar; "copy me" setting.
**Done when:** you book your venue through the app: scout → shortlist → outreach → quotes compared → tour → negotiated → booked, with every email approved in the app.

### Phase 3: The rest of the lifecycle
Sub-events module (engagement party first, since it is soonest) and Events agent with shareable host plans; Wedding Party module; Legal & Admin Guide; Contract Reviewer; Design & Stationery (HTML→PDF); guest outreach for addresses/dietary; public RSVP page; basic wedding website.

### Phase 4: Productize
Stripe billing and plan limits; per-wedding cost caps; collaborator roles (parents, planner, host) which the schema already supports; notifications (email/push); mobile polish; marketing site and self-serve onboarding; agent evals (fixture emails and expected extractions) so prompt changes do not regress; admin panel for you to see all weddings and costs.

### Phase 5: Advanced
Voice agent via Retell (AI disclosure in the first seconds, recording consent by state, transcripts into threads); Day-of Logistics and seating optimizer; Gifts & Thank-you; Post-Wedding; Google Calendar two-way sync; Canva connector for design; Managed Agents for heavy research jobs if the worker becomes the bottleneck.

---

## 7. How to run the build with sub-agents on a credit budget

1. **This document** is the source of truth at `docs/plans/2026-09-17-wedding-planner-design.md`; module specs live in `docs/specs/` (start with `phase-0-foundation.md`).
2. **One spec per module** in `docs/specs/` (e.g. `budget.md`, `outreach.md`), each with: data model deltas, UI screens, agent prompt + tool list, acceptance criteria, and test fixtures. Specs are written with the strongest model available; they are the expensive, high-leverage artifact.
3. **Model tiering for the build.** Fable orchestrates: writes specs, reviews diffs, resolves design questions, and merges. Opus 5 handles agent prompts, security-sensitive code (RLS, approvals, email ingestion), and tricky debugging. Sonnet 5 does the bulk of implementation from specs. Haiku 4.5 does mechanical legwork: fixtures, seed data, docs sweeps, repetitive refactors. Sub-agents run in worktrees with a tight brief and acceptance criteria, and are not handed the whole repo to explore.
4. **Tasks, not vibes.** Each spec is split into tasks small enough that a sub-agent needs no exploration: "add `quotes` and `quote_line_items` tables with RLS, migration, Drizzle types, and a unit test". Well-specified implementation tasks go to Sonnet 5 sub-agents in worktrees (`anthropic-skills:subagent-driven-development`); schema, agent prompts, security, and code review stay on the strongest model.
5. **Batch independent tasks** in parallel (`dispatching-parallel-agents`), and never dispatch a task whose spec is still fuzzy: that is where credits vanish.
6. **Verification before merge, every time:** typecheck, lint, unit tests for tools and extraction, a Playwright smoke test per screen, and for agents a fixture eval (a handful of real-shaped vendor emails and the expected parsed output). `verification-before-completion` skill applies.
7. **Runtime cost control for the product:** Opus 5 at `medium` effort for most agents, `high` for negotiation and planning, Sonnet 5 for classification/extraction; prompt caching on the system prompt and wedding snapshot; a per-wedding monthly cap in the worker; cost visible per run in the activity feed.

---

## 8. Intake: questions to extract the rest of your thinking

These become the Intake agent's script. Answer them together; they seed the wedding profile once Phase 1 ships.

- Names, pronouns, and your partner's email for the invite.
- Target date or season, how flexible, dates to avoid.
- Local or destination? Candidate places (given Brazil, is that on the list?), and how much travel you would ask of guests.
- Size: gut number, and the "must invite" count on each side.
- Budget: total range, hard ceiling, who contributes what, and your top three priorities (food, photo, music, venue, flowers, attire, guest experience).
- Vibe: formal/casual, indoor/outdoor, religious/secular, cultural or family traditions to include or avoid.
- Wedding party: sizes, whether people are already chosen, how you want to ask them.
- Satellite events you want: engagement party (when, where, who hosts), showers, bachelor/bachelorette (trip or local), welcome party, brunch.
- Policies: plus-ones, kids, alcohol, dietary and accessibility considerations.
- Who else will end up helping plan (parents, a friend, a professional planner)? This shapes the collaborator roles later.
- Tools you already live in (Google Calendar, Drive, Notion) so imports and sync are prioritized right.
- Finish this sentence: "We could not have done this without the app because it ___."

---

## 9. Verification (end to end)

- **Local:** `pnpm dev` runs web + worker against a local Supabase; seed script creates a demo wedding with a plan, budget, guests, and three vendors.
- **Agent runtime:** a test harness runs each agent against fixtures with a fake Anthropic client and asserts tool calls; a small live smoke test runs the Concierge against the seed wedding.
- **Outreach loop:** Postmark sandbox inbound → thread → agent run → pending approval → approve → outbound recorded. Test with a fake vendor mailbox you control.
- **Tenancy:** an RLS test suite that asserts a second wedding's user cannot read the first wedding's rows through the API.
- **Real use:** Phase 1 done means your actual numbers are in it; Phase 2 done means your venue was booked through it.

---

## 10. Open items and risks

- **Name and domain:** needed before Phase 2 for the Postmark inbox domain. Repo stays `Wedding-Planner` for now.
- **Claude API spend per wedding:** unknown until Phase 1 telemetry; the cap and the cost ledger exist from day one for this reason.
- **Tool runner is beta:** acceptable; the manual loop is a small fallback if needed.
- **Voice calling legal exposure:** AI disclosure (California within 15 seconds), recording consent in two-party states, TCPA treats AI voices as artificial. Calls to businesses for informational purposes are the low-risk case; still Phase 5 and user-initiated only.
- **Legal guidance liability:** every legal/admin output carries a verify-with-professional note; no jurisdiction-specific claim without a citation.
- **Collaborators deferred:** couple-only in v1, but `wedding_members.role` and shareable host plans exist so parents/planners are a settings change later, not a migration.

## Sources consulted

- Google restricted-scope verification and CASA: https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification , https://www.unipile.com/integrating-google-oauth-2-0-user-authentication-into-your-app/ , https://deepstrike.io/blog/google-casa-security-assessment-2025
- Inbound email: https://postmarkapp.com/developer/webhooks/inbound-webhook , https://resend.com/blog/inbound-emails , https://postmarkapp.com/compare/resend-alternative
- Voice platforms: https://www.retellai.com/blog/retell-vs-bland-vs-vapi-vs-elevenlabs , https://www.silverthreadlabs.com/blog/ai-voice-agent-platforms-compared
- Voice compliance: https://www.retellai.com/blog/tcpa-compliance-playbook-voice-ai-outbound , https://www.henson-legal.com/ai-voice-compliance , https://thoughtly.com/blog/ai-disclosure-requirements-what-to-tell-callers
- Competitors: https://www.wedcheese.com/blog/best-ai-wedding-planner-apps-2026/ , https://itsayes.io/blog/best-ai-wedding-planner-tools , https://www.theweddingplanner.ai/
- Timelines: https://www.zola.com/expert-advice/your-ultimate-wedding-planning-checklist , https://withjoy.com/blog/how-to-create-your-perfect-wedding-checklist-a-month-by-month-guide/ , https://www.preciouspicspro.com/wiki/wedding-planning-checklist-complete

# Module specs

One spec per module. A spec is the unit of work handed to a sub-agent: it must be complete enough that the implementer needs no exploration beyond the files it names.

## Template

```
# <Module> spec

Status: draft | ready | in progress | done
Design doc sections: §x.y

## Goal
One paragraph: what exists when this is done and who uses it.

## Data model
Tables/columns added or changed, RLS policy, migration name.

## UI
Screens and components, states (empty/loading/error), routes.

## Agent (if any)
Name, purpose, system prompt outline, tools (name, input schema, gated?), model + effort, triggers, autonomy default.

## Tasks
Numbered, each independently dispatchable, each with acceptance criteria and the files it touches.

## Tests
Unit, RLS isolation, Playwright smoke, agent fixtures.

## Open questions
```

## Order

1. `phase-0-foundation.md` (ready)
2. `intake-and-timeline.md`
3. `budget.md`
4. `guests.md`
5. `files-and-calendar.md`
6. `concierge.md`
7. `vendors-and-inbox.md`
8. `venue-scout.md`
9. `outreach-and-negotiation.md`
10. `sub-events.md`, `wedding-party.md`, `legal-admin.md`, `contract-review.md`, `design-stationery.md`
11. `billing-and-roles.md`
12. `voice.md`, `day-of.md`, `post-wedding.md`

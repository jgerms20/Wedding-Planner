# Shared entities

Single source of truth for entity shapes. `packages/shared` (TypeScript types + Zod) and `packages/db` (Drizzle + SQL) both implement exactly this. Ids are UUID strings; timestamps are ISO strings. Every tenant entity carries `weddingId`. Optional fields are nullable in SQL.

```ts
type DateFlexibility = "fixed" | "month" | "season" | "open";
type PhaseKey = "just_engaged" | "foundation" | "core_vendors" | "communications" | "details" | "final_stretch" | "wedding_weekend" | "after";
type TaskStatus = "todo" | "doing" | "done" | "skipped";
type Side = "a" | "b" | "both";
type Tier = "must" | "should" | "nice";
type VenueStatus = "idea" | "contacted" | "awaiting" | "replied" | "quoted" | "touring" | "negotiating" | "booked" | "declined";
type SubEventKind = "engagement_party" | "bridal_shower" | "couples_shower" | "groom_shower" | "bachelor" | "bachelorette" | "rehearsal_dinner" | "welcome_party" | "brunch" | "honeymoon" | "other";
type AnchorKind = "engagement_party" | "save_the_dates" | "invitations" | "custom";

interface Wedding { id; slug; name; partnerA: { name; pronouns? }; partnerB: { name; pronouns? };
  targetDate?; dateFlexibility: DateFlexibility; targetSeason?; locationText?; styleNotes?;
  guestTarget?: number; isDestination: boolean; activeScenarioId?; createdAt; updatedAt }

interface Anchor { id; kind: AnchorKind; title; date?; reveals: ("date" | "destination" | "wedding_party")[]; notes? }
interface TravelWindow { id; label; start; end; location }
interface PlanConfig { anchors: Anchor[]; travelWindows: TravelWindow[];
  saveTheDatesMonthsBefore: number; invitationsMonthsBefore: number; rsvpDeadlineMonthsBefore: number;
  overrides: Record<string /*templateId*/, { monthsBefore?: number; skipped?: boolean }> }

interface Task { id; weddingId; templateId?; title; description?; phase: PhaseKey; dueDate?; status: TaskStatus;
  tags: string[]; dependsOn: string[]; sourceAgent?; windowId?; createdAt; updatedAt }
interface Event { id; weddingId; title; startsAt; endsAt?; allDay: boolean;
  kind: "anchor" | "deadline" | "tour" | "travel" | "sub_event" | "other"; linkedType?; linkedId? }

interface Destination { id; weddingId; name; country; region?; notes?;
  travelCostPerGuestEstimate?: number; lodgingPerNightEstimate?: number; attendanceRateEstimate?: number /*0..1*/;
  weatherNotes?; legalNotes?; seasonNotes?; sourceUrls: string[]; createdAt; updatedAt }
interface Venue { id; weddingId; destinationId; name; website?; email?; phone?; capacity?: number;
  rentalFee?: number; fbMinimum?: number; perGuestCost?: number; inHouseCatering?: boolean; lodgingOnSite?: boolean;
  styleNotes?; availabilityNotes?; status: VenueStatus; sourceUrls: string[]; createdAt; updatedAt }
interface Scenario { id; weddingId; name; destinationId?; venueId?; dateStart?; dateEnd?;
  guestAssumption: number; attendanceRate: number /*0..1*/; fixedCosts: number; perGuestCost: number; travelCostPerGuest: number;
  notes?; pinned: boolean; createdAt; updatedAt }
// derived, never stored: expectedGuests = round(guestAssumption * attendanceRate);
// totalCost = fixedCosts + perGuestCost * expectedGuests; costPerGuest = totalCost / expectedGuests;
// guestTravelBurden = travelCostPerGuest * expectedGuests

interface Household { id; weddingId; name; side: Side; addressText?; homeCity?; notes? }
interface Guest { id; weddingId; householdId?; firstName; lastName?; email?; phone?; side: Side; tier: Tier;
  relationship?; plusOne: boolean; isChild: boolean; dietary?; homeCity?; tags: string[];
  rsvp: Record<string /*subEventId or "wedding"*/, "pending" | "yes" | "no">; createdAt; updatedAt }

interface BudgetCategory { id; weddingId; name; targetPercent?: number; sortOrder: number }
interface BudgetItem { id; weddingId; categoryId; name; estimate?: number; quoted?: number; contracted?: number; paid?: number;
  venueId?; dueDate?; notes?; createdAt; updatedAt }

interface SubEvent { id; weddingId; kind: SubEventKind; title; date?; location?; hostName?; budgetEstimate?: number; notes?; guestRule? }
interface WeddingPartyMember { id; weddingId; name; role; side: Side; asked: boolean; askedDate?; contact?; notes? }
interface Decision { id; weddingId; title; detail?; decidedAt; decidedBy?; source: "chat" | "approval" | "manual" }
interface Settings { weddingId; autonomy: Record<string, 0 | 1 | 2 | 3>; notifications: Record<string, boolean>;
  monthlyCostCapCents: number; planConfig: PlanConfig }
```

Money is stored as whole currency units (numbers), USD assumed for now; a `currency` column can be added later.

## Repository interface (`packages/shared/src/repo/types.ts`)

`WeddingRepo` exposes, per entity, `list(weddingId)`, `get(id)`, `upsert(entity)`, `remove(id)`, plus `getWedding(slug)`, `upsertWedding`, `getSettings(weddingId)`, `saveSettings`, `exportJson(weddingId): Promise<string>`, `importJson(json): Promise<void>`. Adapters: `createLocalRepo()` (IndexedDB via Dexie, Phase 0a) and `createSupabaseRepo(client)` (Phase 0b).

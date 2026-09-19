import {
  buildDestinationFromSeed,
  buildSeedBundle,
  buildVenueFromSeed,
  COUPLE,
  defaultSettings,
  generateAnchorEvents,
  generatePlan,
  newId,
  nowIso,
  scenarioMath,
  SEED_BENCHMARKS,
  SEED_DESTINATIONS,
  STARTER_GUEST_LIST,
  type Wedding,
  type WeddingRepo,
} from "@bower/shared";

/** Venue names a past research round shipped and then found to violate the couple's
 * no-plantations-or-slavery-marketed-property rule (see `.claude/skills/wedding-research/SKILL.md`
 * rule 7) — removed from the seed data itself, but `reconcileDestinations` only ever adds whole
 * new destinations, so an existing wedding that already synced New Orleans still has these
 * sitting in its own data. "Southern Oaks" self-described as a restored antebellum mansion;
 * "Race & Religious" markets a preserved "slave quarter" building as part of the venue. This is a
 * narrow, one-time correction (remove these exact names if found), not a general "delete venues
 * no longer in the seed" mechanism — that would risk resurrecting or deleting venues the couple
 * has since edited by hand for unrelated reasons. */
const RETRACTED_VENUE_NAMES = new Set(["Southern Oaks", "Race & Religious"]);
import { WEDDING_SLUG } from "./constants";

/** True when the researched seed modules are registered and a full bundle can be built. */
export function seedAvailable(): boolean {
  return SEED_BENCHMARKS !== null && SEED_DESTINATIONS.length > 0;
}

/** Replaces all local data with the bespoke Joshua & Janel bundle (or the minimal wedding when research is not registered). */
export async function restoreSeed(repo: WeddingRepo): Promise<Wedding> {
  if (SEED_BENCHMARKS && SEED_DESTINATIONS.length > 0) {
    const bundle = buildSeedBundle({ destinations: SEED_DESTINATIONS, benchmarks: SEED_BENCHMARKS, slug: WEDDING_SLUG });
    await repo.importJson(JSON.stringify(bundle));
    return bundle.wedding;
  }
  return createMinimalWedding(repo);
}

/** Loads the wedding, seeding it on the very first visit. */
export async function ensureWedding(repo: WeddingRepo): Promise<Wedding> {
  const existing = await repo.getWedding(WEDDING_SLUG);
  if (existing) return existing;
  return restoreSeed(repo);
}

/**
 * Non-destructive maintenance for an *existing* wedding's destinations, run once per load:
 * 1. Backfills `sortOrder` on any destination saved before that field existed, ranked by its
 *    current cost-derived order so nothing visually reshuffles the first time this runs.
 * 2. Adds any seed destination newly registered in `SEED_DESTINATIONS` (matched by name) that
 *    isn't already present — e.g. a destination added to the research pass after this couple's
 *    wedding was first seeded. New destinations are appended after whatever's already there and
 *    are never auto-pinned; `restoreSeed()` is the only thing that replaces existing data.
 * Both steps are no-ops once already applied.
 */
export async function reconcileDestinations(repo: WeddingRepo, weddingId: string): Promise<void> {
  const [destinations, scenarios] = await Promise.all([repo.destinations.list(weddingId), repo.scenarios.list(weddingId)]);
  const now = nowIso();

  const missingSortOrder = destinations.filter((d) => d.sortOrder === undefined);
  if (missingSortOrder.length > 0) {
    const totalFor = (destinationId: string) => {
      const scenario = scenarios.find((s) => s.destinationId === destinationId);
      return scenario ? scenarioMath(scenario).totalCost : Number.MAX_SAFE_INTEGER;
    };
    const ranked = [...destinations].sort((a, b) => totalFor(a.id) - totalFor(b.id));
    await Promise.all(
      ranked.map((d, i) => (d.sortOrder === undefined ? repo.destinations.upsert({ ...d, sortOrder: i + 1, updatedAt: now }) : Promise.resolve())),
    );
  }

  const existingNames = new Set(destinations.map((d) => d.name.trim().toLowerCase()));
  const missingSeeds = SEED_DESTINATIONS.filter((seed) => !existingNames.has(seed.name.trim().toLowerCase()));
  if (missingSeeds.length === 0) return;

  let nextSortOrder = Math.max(0, ...destinations.map((d, i) => d.sortOrder ?? i + 1)) + 1;
  for (const seed of missingSeeds) {
    const { destination, venues, scenario } = buildDestinationFromSeed(seed, weddingId, now, {
      guestTarget: COUPLE.guestTarget,
      sortOrder: nextSortOrder++,
      pinned: false,
    });
    await repo.destinations.upsert(destination);
    for (const venue of venues) await repo.venues.upsert(venue);
    await repo.scenarios.upsert(scenario);
  }
}

/**
 * Adds the couple's own dictated guest list to an *existing* wedding, run once per load
 * alongside `reconcileDestinations`. Purely additive and idempotent: diffs by lowercased
 * first+last name against guests already on file, so re-running never double-inserts and a
 * guest the couple has since edited or removed by hand is never recreated.
 */
export async function reconcileGuests(repo: WeddingRepo, weddingId: string): Promise<void> {
  const existing = await repo.guests.list(weddingId);
  const existingNames = new Set(existing.map((g) => `${g.firstName} ${g.lastName ?? ""}`.trim().toLowerCase()));
  const now = nowIso();
  for (const note of STARTER_GUEST_LIST) {
    const key = `${note.firstName} ${note.lastName ?? ""}`.trim().toLowerCase();
    if (existingNames.has(key)) continue;
    await repo.guests.upsert({
      id: newId(),
      weddingId,
      firstName: note.firstName,
      lastName: note.lastName,
      side: note.side,
      tier: note.tier,
      relationship: note.relationship,
      plusOne: false,
      isChild: false,
      tags: [],
      rsvp: {},
      createdAt: now,
      updatedAt: now,
    });
  }
}

/**
 * Reaches an *existing* destination's venue list, run once per load alongside
 * `reconcileDestinations` (which only ever adds whole new destinations, never touches venues on
 * one already present). Two things happen here, both safe to re-run:
 * 1. Any venue named in `RETRACTED_VENUE_NAMES` is removed outright — a narrow, explicit
 *    correction for a specific bad venue a past round shipped, not a general sync.
 * 2. Any venue in a registered seed's `venues` list, matched by name, that isn't already present
 *    under the corresponding existing destination gets added — the same additive-by-name
 *    approach `reconcileDestinations` already uses for whole destinations, applied one level
 *    down so a researched venue *addition* to an already-synced destination (e.g. a couple more
 *    Portland or DC options) reaches existing wedding data too.
 */
export async function reconcileVenues(repo: WeddingRepo, weddingId: string): Promise<void> {
  const [destinations, venues] = await Promise.all([repo.destinations.list(weddingId), repo.venues.list(weddingId)]);
  const now = nowIso();

  for (const venue of venues) {
    if (RETRACTED_VENUE_NAMES.has(venue.name)) {
      await repo.venues.remove(venue.id);
    }
  }

  const destinationByName = new Map(destinations.map((d) => [d.name.trim().toLowerCase(), d]));
  const remainingVenues = venues.filter((v) => !RETRACTED_VENUE_NAMES.has(v.name));

  for (const seed of SEED_DESTINATIONS) {
    const destination = destinationByName.get(seed.name.trim().toLowerCase());
    if (!destination) continue; // not yet synced to this wedding — reconcileDestinations handles that case
    const existingNames = new Set(remainingVenues.filter((v) => v.destinationId === destination.id).map((v) => v.name.trim().toLowerCase()));
    for (const venueSeed of seed.venues) {
      if (existingNames.has(venueSeed.name.trim().toLowerCase())) continue;
      await repo.venues.upsert(buildVenueFromSeed(venueSeed, weddingId, destination.id, now));
    }
  }
}

async function createMinimalWedding(repo: WeddingRepo): Promise<Wedding> {
  const now = nowIso();
  const wedding: Wedding = {
    id: newId(),
    slug: WEDDING_SLUG,
    name: COUPLE.name,
    partnerA: { ...COUPLE.partnerA },
    partnerB: { ...COUPLE.partnerB },
    dateFlexibility: "season",
    targetSeason: COUPLE.targetSeason,
    guestTarget: COUPLE.guestTarget,
    isDestination: true,
    createdAt: now,
    updatedAt: now,
  };
  const settings = defaultSettings(wedding.id);
  settings.planConfig = {
    ...settings.planConfig,
    anchors: [
      {
        id: newId(),
        kind: "engagement_party",
        title: COUPLE.engagementParty.title,
        date: COUPLE.engagementParty.date,
        reveals: ["date", "destination", "wedding_party"],
      },
    ],
    saveTheDatesMonthsBefore: 12,
    invitationsMonthsBefore: 9,
    rsvpDeadlineMonthsBefore: 5,
  };
  await repo.upsertWedding(wedding);
  await repo.saveSettings(settings);
  for (const task of generatePlan({ wedding, planConfig: settings.planConfig, existingTasks: [] })) {
    await repo.tasks.upsert(task);
  }
  for (const event of generateAnchorEvents(wedding, settings.planConfig)) {
    await repo.events.upsert(event);
  }
  return wedding;
}

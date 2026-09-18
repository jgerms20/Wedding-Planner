import {
  buildDestinationFromSeed,
  buildSeedBundle,
  COUPLE,
  defaultSettings,
  generateAnchorEvents,
  generatePlan,
  newId,
  nowIso,
  scenarioMath,
  SEED_BENCHMARKS,
  SEED_DESTINATIONS,
  type Wedding,
  type WeddingRepo,
} from "@bower/shared";
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

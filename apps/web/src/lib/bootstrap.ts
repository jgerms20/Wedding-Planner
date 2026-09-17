import {
  buildSeedBundle,
  COUPLE,
  defaultSettings,
  generateAnchorEvents,
  generatePlan,
  newId,
  nowIso,
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

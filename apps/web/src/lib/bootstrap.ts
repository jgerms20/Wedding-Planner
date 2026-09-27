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
  stableId,
  STARTER_GUEST_LIST,
  coreName,
  GUEST_CORRECTIONS,
  GUEST_LIST_ROUND_6,
  type Destination,
  type DestinationSeed,
  type Guest,
  type GuestListEntry,
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
 * What's already been added from the seed data, kept in the wedding's settings (so it's shared
 * between both partners). The reconcile steps below add new seed records exactly once: a record
 * the couple later deletes, renames, or sets aside is never quietly re-added.
 *
 * Records these steps create get ids derived from what they are (`stableId`), so if both partners
 * open the app at the same moment and both add the same new record, they write one record.
 */
interface Ledger {
  has(key: string): boolean;
  add(key: string): void;
  /** True the first time this kind of record ("d:", "v:", "g:") is reconciled against a ledger —
   * i.e. the wedding's existing records of that kind predate it. Per kind, because the three
   * reconcile steps run in turn and each saves. */
  firstRunFor(prefix: string): boolean;
  save(): Promise<void>;
}

async function openLedger(repo: WeddingRepo, weddingId: string): Promise<Ledger> {
  const settings = (await repo.getSettings(weddingId)) ?? defaultSettings(weddingId);
  const keys = new Set(settings.seedLedger ?? []);
  const before = keys.size;
  const seenPrefixes = new Set([...keys].map((k) => k.slice(0, 2)));
  return {
    has: (key) => keys.has(key),
    add: (key) => void keys.add(key),
    firstRunFor: (prefix) => !seenPrefixes.has(prefix),
    async save() {
      if (settings.seedLedger !== undefined && keys.size === before) return;
      const latest = (await repo.getSettings(weddingId)) ?? settings;
      await repo.saveSettings({ ...latest, seedLedger: [...new Set([...(latest.seedLedger ?? []), ...keys])] });
    },
  };
}

const norm = (value: string | undefined) => (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
const destinationKey = (name: string) => `d:${norm(name)}`;
const venueKey = (destination: string, venue: string) => `v:${norm(destination)}|${norm(venue)}`;
const guestKey = (g: { side: string; firstName: string; lastName?: string; relationship?: string }) =>
  `g:${g.side}:${norm(`${g.firstName} ${g.lastName ?? ""}`)}:${norm(g.relationship)}`;

/**
 * Keeps an *existing* wedding's destinations current, once per load:
 * 1. Backfills `sortOrder` on anything saved before that field existed.
 * 2. Adds seed destinations registered since this wedding last synced — once. The first time this
 *    runs against a wedding that predates the ledger, a seed destination that's missing was
 *    removed by hand, so it comes back set aside ("not for us") rather than active.
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

  const ledger = await openLedger(repo, weddingId);
  const existingNames = new Set(destinations.map((d) => norm(d.name)));
  const established = destinations.length > 0;
  let nextSortOrder = Math.max(0, ...destinations.map((d, i) => d.sortOrder ?? i + 1)) + 1;

  for (const seed of SEED_DESTINATIONS) {
    const key = destinationKey(seed.name);
    if (existingNames.has(norm(seed.name))) {
      ledger.add(key);
      const existing = destinations.find((d) => norm(d.name) === norm(seed.name));
      const filled = existing && backfillResearch(existing, seed);
      if (filled) await repo.destinations.upsert({ ...filled, updatedAt: now });
      continue;
    }
    if (ledger.has(key)) continue; // added before, then removed on purpose
    const built = buildDestinationFromSeed(seed, weddingId, now, { guestTarget: COUPLE.guestTarget, sortOrder: nextSortOrder++, pinned: false });
    const destinationId = stableId(weddingId, "destinations", key);
    const setAside = ledger.firstRunFor("d:") && established;
    await repo.destinations.upsert({
      ...built.destination,
      id: destinationId,
      excluded: setAside || undefined,
      excludedNote: setAside ? "Removed before \"Not for us\" existed — restore it if that was a mistake." : undefined,
    });
    for (const venue of built.venues) {
      await repo.venues.upsert({ ...venue, id: stableId(weddingId, "venues", venueKey(seed.name, venue.name)), destinationId });
    }
    await repo.scenarios.upsert({ ...built.scenario, id: stableId(weddingId, "scenarios", key), destinationId });
    ledger.add(key);
    for (const venue of seed.venues) ledger.add(venueKey(seed.name, venue.name));
  }
  await ledger.save();
}

/**
 * Research fields added to the seed after a wedding was created (flight split, per-city flights,
 * photos) never reached destinations that already existed. Fills only what's missing, so nothing
 * the couple edited is overwritten. Returns the filled destination, or undefined if nothing changed.
 */
export function backfillResearch(destination: Destination, seed: DestinationSeed): Destination | undefined {
  const patch: Partial<Destination> = {};
  if (destination.flightCostEstimate === undefined && seed.flightCostEstimate !== undefined) patch.flightCostEstimate = seed.flightCostEstimate;
  if (!destination.originFlights?.length && seed.originFlights?.length) patch.originFlights = seed.originFlights;
  if (!destination.imageUrl && seed.imageUrl) {
    patch.imageUrl = seed.imageUrl;
    patch.imageCredit = seed.imageCredit;
  }
  return Object.keys(patch).length > 0 ? { ...destination, ...patch } : undefined;
}

/**
 * Brings the couple's own guest lists into an *existing* wedding, once per load:
 * 1. The round-4 dictated list: added in full to a brand-new wedding; for a wedding that already
 *    has guests, just recorded as done (so a guest they removed or renamed never comes back).
 * 2. Round-6 corrections (Janel's re-spelled names, new plus-ones) — applied once, so a later
 *    hand edit wins.
 * 3. Round-6 additions from both lists, skipping anyone already listed under the same name and
 *    side (the two Amoses are told apart by relationship).
 */
export async function reconcileGuests(repo: WeddingRepo, weddingId: string): Promise<void> {
  const existing = await repo.guests.list(weddingId);
  const ledger = await openLedger(repo, weddingId);
  const now = nowIso();

  const add = async (entry: GuestListEntry, key: string) => {
    const guest: Guest = {
      id: stableId(weddingId, "guests", key),
      weddingId,
      firstName: entry.firstName,
      lastName: entry.lastName,
      side: entry.side,
      tier: entry.tier,
      relationship: entry.relationship,
      notes: entry.notes,
      plusOne: entry.plusOne ?? false,
      plusOneCount: entry.plusOneCount,
      isChild: false,
      tags: entry.tags ?? [],
      rsvp: {},
      createdAt: now,
      updatedAt: now,
    };
    await repo.guests.upsert(guest);
    existing.push(guest);
  };

  const round4 = STARTER_GUEST_LIST.map((entry) => ({ entry: entry as GuestListEntry, key: guestKey(entry) }));
  if (ledger.firstRunFor("g:") && existing.length > 0) {
    for (const { key } of round4) ledger.add(key);
  } else {
    for (const { entry, key } of round4) {
      if (ledger.has(key)) continue;
      await add(entry, key);
      ledger.add(key);
    }
  }

  for (const correction of GUEST_CORRECTIONS) {
    const key = `fix:${correction.match.side}:${norm(correction.match.firstName)}:${JSON.stringify(correction.set)}`;
    if (ledger.has(key)) continue;
    const target = existing.find(
      (g) =>
        g.side === correction.match.side &&
        norm(g.firstName) === norm(correction.match.firstName) &&
        (!correction.match.relationshipIncludes || norm(g.relationship).includes(norm(correction.match.relationshipIncludes))),
    );
    if (target) {
      const updated = { ...target, ...correction.set, updatedAt: now };
      await repo.guests.upsert(updated);
      existing.splice(existing.indexOf(target), 1, updated);
    }
    ledger.add(key);
  }

  for (const entry of GUEST_LIST_ROUND_6) {
    const key = guestKey(entry);
    if (ledger.has(key)) continue;
    const listed = existing.some(
      (g) =>
        coreName(g) === coreName(entry) &&
        (g.side === entry.side || g.side === "both" || entry.side === "both") &&
        (!entry.relationship || !g.relationship || norm(g.relationship).slice(0, 6) === norm(entry.relationship).slice(0, 6)),
    );
    if (!listed) await add(entry, key);
    ledger.add(key);
  }

  await ledger.save();
}

/**
 * Keeps an *existing* destination's venues current, once per load:
 * 1. Any venue named in `RETRACTED_VENUE_NAMES` is removed outright — a narrow, explicit
 *    correction for specific bad venues a past round shipped.
 * 2. Seed venues added since this wedding last synced are added once; one the couple removed
 *    stays removed.
 */
export async function reconcileVenues(repo: WeddingRepo, weddingId: string): Promise<void> {
  const [destinations, venues] = await Promise.all([repo.destinations.list(weddingId), repo.venues.list(weddingId)]);
  const now = nowIso();

  for (const venue of venues) {
    if (RETRACTED_VENUE_NAMES.has(venue.name)) await repo.venues.remove(venue.id);
  }

  const ledger = await openLedger(repo, weddingId);
  const firstRun = ledger.firstRunFor("v:");
  const destinationByName = new Map(destinations.map((d) => [norm(d.name), d]));
  const remainingVenues = venues.filter((v) => !RETRACTED_VENUE_NAMES.has(v.name));

  for (const seed of SEED_DESTINATIONS) {
    const destination = destinationByName.get(norm(seed.name));
    if (!destination) continue; // reconcileDestinations handles a whole missing destination
    const existingNames = new Set(remainingVenues.filter((v) => v.destinationId === destination.id).map((v) => norm(v.name)));
    for (const venueSeed of seed.venues) {
      const key = venueKey(seed.name, venueSeed.name);
      if (existingNames.has(norm(venueSeed.name)) || firstRun) {
        ledger.add(key);
        continue;
      }
      if (ledger.has(key)) continue;
      await repo.venues.upsert({ ...buildVenueFromSeed(venueSeed, weddingId, destination.id, now), id: stableId(weddingId, "venues", key) });
      ledger.add(key);
    }
  }
  await ledger.save();
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

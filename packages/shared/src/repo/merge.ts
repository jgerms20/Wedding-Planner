import type {
  BudgetCategory,
  BudgetItem,
  Decision,
  Destination,
  Event,
  Guest,
  Household,
  Note,
  Priority,
  SavingsEntry,
  Scenario,
  SubEvent,
  Task,
  Venue,
  WatchItem,
  WeddingPartyMember,
} from "../entities/index";
import type { ExportBundle } from "./export-bundle";
import type { EntityCollection } from "./doc-store";

/** One document to write into the shared wedding. */
export interface MergeWrite {
  collection: EntityCollection;
  entity: { id: string; weddingId: string };
}

export interface MergeSummary {
  /** New records brought over, per collection (only collections with at least one). */
  added: Partial<Record<EntityCollection, number>>;
  /** Destinations whose favorites changed because the other browser had hearts this one didn't. */
  favoritesMerged: number;
  /** Tasks the incoming browser had marked done that the shared copy hadn't. */
  tasksCompleted: number;
  /** Destinations the incoming browser had set aside as "not for us". */
  exclusionsMerged: number;
}

export interface MergePlan {
  writes: MergeWrite[];
  summary: MergeSummary;
}

const norm = (value: string | undefined) => (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Merges another browser's copy of the wedding (`incoming`) into the shared one (`existing`)
 * without duplicating anything or losing either partner's work.
 *
 * The two copies were seeded independently, so the *same* destination, guest, or task carries a
 * different id in each. Records are therefore matched by what they are (a destination's name, a
 * guest's full name, a task's title + phase) rather than by id, one-to-one — two guests who are
 * both "Amos" on one side pair with the two Amoses on the other, never both with the first.
 *
 * Matched records keep the shared copy's version, except where combining is obviously what both
 * people want: favorites are unioned, a "not for us" exclusion carries over, and a task or
 * must-have either person finished stays finished. Unmatched incoming records are added, re-pointed
 * at the shared wedding and at the shared ids of whatever they reference.
 */
export function planMerge(existing: ExportBundle, incoming: ExportBundle): MergePlan {
  const weddingId = existing.wedding.id;
  const idMap = new Map<string, string>();
  const writes: MergeWrite[] = [];
  const summary: MergeSummary = { added: {}, favoritesMerged: 0, tasksCompleted: 0, exclusionsMerged: 0 };
  const mapId = (id: string | undefined) => (id === undefined ? undefined : (idMap.get(id) ?? id));

  function merge<T extends { id: string; weddingId: string }>(
    collection: EntityCollection,
    existingList: T[],
    incomingList: T[],
    key: (item: T, bundle: ExportBundle) => string,
    options: {
      /** Re-points references on an incoming record that is about to be added. */
      remap?: (item: T) => T;
      /** Returns an updated shared record when the incoming match should change it. */
      combine?: (shared: T, other: T) => T | undefined;
      /** Among several shared records with the same key, prefers the one this returns true for. */
      prefer?: (shared: T, other: T) => boolean;
    } = {},
  ) {
    const pool = new Map<string, T[]>();
    for (const item of existingList) {
      const k = key(item, existing);
      pool.set(k, [...(pool.get(k) ?? []), item]);
    }
    for (const item of incomingList) {
      const candidates = pool.get(key(item, incoming));
      if (candidates && candidates.length > 0) {
        const index = Math.max(0, options.prefer ? candidates.findIndex((c) => options.prefer!(c, item)) : 0);
        const [match] = candidates.splice(index, 1) as [T];
        idMap.set(item.id, match.id);
        const combined = options.combine?.(match, item);
        if (combined) writes.push({ collection, entity: combined });
        continue;
      }
      const added = { ...(options.remap ? options.remap(item) : item), weddingId };
      idMap.set(item.id, added.id);
      writes.push({ collection, entity: added });
      summary.added[collection] = (summary.added[collection] ?? 0) + 1;
    }
  }

  const destinationName = (id: string | undefined, bundle: ExportBundle) =>
    norm(bundle.destinations.find((d) => d.id === id)?.name);
  const categoryName = (id: string, bundle: ExportBundle) => norm(bundle.budgetCategories.find((c) => c.id === id)?.name);

  merge<Destination>("destinations", existing.destinations, incoming.destinations, (d) => norm(d.name), {
    combine(shared, other) {
      const hearts = [...new Set([...(shared.favoritedBy ?? []), ...(other.favoritedBy ?? [])])].sort() as ("A" | "B")[];
      const heartsChanged = hearts.length !== (shared.favoritedBy ?? []).length;
      const excluded = Boolean(shared.excluded) || Boolean(other.excluded);
      const exclusionChanged = excluded !== Boolean(shared.excluded);
      if (!heartsChanged && !exclusionChanged) return undefined;
      if (heartsChanged) summary.favoritesMerged++;
      if (exclusionChanged) summary.exclusionsMerged++;
      return { ...shared, favoritedBy: hearts, excluded, updatedAt: new Date().toISOString() };
    },
  });

  merge<Venue>(
    "venues",
    existing.venues,
    incoming.venues,
    (v, b) => `${destinationName(v.destinationId, b)}|${norm(v.name)}`,
    { remap: (v) => ({ ...v, destinationId: mapId(v.destinationId)! }) },
  );

  merge<Scenario>(
    "scenarios",
    existing.scenarios,
    incoming.scenarios,
    (s, b) => `${destinationName(s.destinationId, b)}|${norm(s.name)}`,
    { remap: (s) => ({ ...s, destinationId: mapId(s.destinationId), venueId: mapId(s.venueId), pinned: false }) },
  );

  merge<Household>("households", existing.households, incoming.households, (h) => norm(h.name));

  merge<Guest>("guests", existing.guests, incoming.guests, (g) => `${norm(g.firstName)} ${norm(g.lastName)}`, {
    remap: (g) => ({ ...g, householdId: mapId(g.householdId) }),
    prefer: (shared, other) => norm(shared.relationship) === norm(other.relationship),
  });

  merge<BudgetCategory>("budgetCategories", existing.budgetCategories, incoming.budgetCategories, (c) => norm(c.name));

  merge<BudgetItem>(
    "budgetItems",
    existing.budgetItems,
    incoming.budgetItems,
    (i, b) => `${categoryName(i.categoryId, b)}|${norm(i.name)}`,
    { remap: (i) => ({ ...i, categoryId: mapId(i.categoryId)!, venueId: mapId(i.venueId) }) },
  );

  merge<Task>("tasks", existing.tasks, incoming.tasks, (t) => `${norm(t.title)}|${t.phase}`, {
    combine(shared, other) {
      if (other.status !== "done" || shared.status === "done") return undefined;
      summary.tasksCompleted++;
      return { ...shared, status: "done", updatedAt: new Date().toISOString() };
    },
  });

  merge<SubEvent>("subEvents", existing.subEvents, incoming.subEvents, (e) => `${e.kind}|${norm(e.title)}`);

  merge<Event>("events", existing.events, incoming.events, (e) => `${norm(e.title)}|${e.startsAt.slice(0, 10)}`, {
    remap: (e) => ({ ...e, linkedId: mapId(e.linkedId) }),
  });

  merge<WeddingPartyMember>("partyMembers", existing.partyMembers, incoming.partyMembers, (m) => norm(m.name));
  // Content only: each browser stamped its own seed records with its own clock, so timestamps
  // never line up across copies.
  merge<Decision>("decisions", existing.decisions, incoming.decisions, (d) => norm(d.title));
  merge<Note>("notes", existing.notes, incoming.notes, (n) => norm(n.text), {
    remap: (n) => ({ ...n, linkedId: mapId(n.linkedId) }),
  });

  const finishedEither = <T extends { done: boolean }>(shared: T, other: T) =>
    other.done && !shared.done ? { ...shared, done: true } : undefined;
  merge<Priority>("priorities", existing.priorities, incoming.priorities, (p) => `${norm(p.area)}|${norm(p.label)}`, {
    combine: finishedEither,
  });
  merge<WatchItem>("watchItems", existing.watchItems, incoming.watchItems, (w) => `${w.kind}|${norm(w.title)}`, {
    combine: finishedEither,
  });
  merge<SavingsEntry>(
    "savingsEntries",
    existing.savingsEntries,
    incoming.savingsEntries,
    (s) => `${s.date}|${s.amount}|${norm(s.note)}`,
  );

  return { writes, summary };
}

/** Plain-language one-liner for the merge result, e.g. "Brought over 3 guests and 2 favorites." */
export function describeMerge(summary: MergeSummary): string {
  const parts: string[] = [];
  const count = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
  if (summary.favoritesMerged) parts.push(count(summary.favoritesMerged, "favorite", "favorites"));
  if (summary.exclusionsMerged) parts.push(count(summary.exclusionsMerged, "set-aside destination", "set-aside destinations"));
  if (summary.tasksCompleted) parts.push(count(summary.tasksCompleted, "finished task", "finished tasks"));
  const labels: Partial<Record<EntityCollection, [string, string]>> = {
    guests: ["guest", "guests"],
    destinations: ["destination", "destinations"],
    venues: ["venue", "venues"],
    scenarios: ["scenario", "scenarios"],
    tasks: ["task", "tasks"],
    budgetItems: ["budget line", "budget lines"],
    subEvents: ["event", "events"],
    priorities: ["must-have", "must-haves"],
    savingsEntries: ["savings entry", "savings entries"],
    notes: ["note", "notes"],
  };
  for (const [collection, n] of Object.entries(summary.added) as [EntityCollection, number][]) {
    const label = labels[collection];
    if (label) parts.push(count(n, `new ${label[0]}`, `new ${label[1]}`));
  }
  return parts.length === 0 ? "Nothing new — both copies already matched." : `Brought over ${parts.join(", ")}.`;
}

import { describe, expect, it } from "vitest";
import { createDocRepo, createMemoryDocStore, rehomeBundle } from "../src/repo/doc-store";
import type { ExportBundle } from "../src/repo/export-bundle";
import { describeMerge, planMerge } from "../src/repo/merge";
import type { FilesRepo } from "../src/repo/types";
import { buildSeedBundle } from "../src/seed/builder";
import { SEED_BENCHMARKS, SEED_DESTINATIONS } from "../src/seed/index";
import { newId, nowIso } from "../src/util";

const noFiles: FilesRepo = {
  list: async () => [],
  upload: async () => {
    throw new Error("not in tests");
  },
  remove: async () => {},
  getObjectUrl: async () => undefined,
};

/** A fresh copy of the wedding, as each partner's browser built its own on first visit. */
function browserCopy(): ExportBundle {
  if (!SEED_BENCHMARKS) throw new Error("seed benchmarks must be registered for this test");
  return JSON.parse(
    JSON.stringify(buildSeedBundle({ destinations: SEED_DESTINATIONS, benchmarks: SEED_BENCHMARKS, slug: "our-wedding" })),
  ) as ExportBundle;
}

function addGuest(bundle: ExportBundle, firstName: string, relationship: string) {
  const now = nowIso();
  bundle.guests.push({
    id: newId(),
    weddingId: bundle.wedding.id,
    firstName,
    relationship,
    side: "b",
    tier: 1,
    plusOne: false,
    isChild: false,
    tags: [],
    rsvp: {},
    createdAt: now,
    updatedAt: now,
  });
}

function heart(bundle: ExportBundle, name: string, partner: "A" | "B") {
  const destination = bundle.destinations.find((d) => d.name === name);
  if (!destination) throw new Error(`no destination named ${name}`);
  destination.favoritedBy = [...new Set([...(destination.favoritedBy ?? []), partner])];
}

describe("createDocRepo — the shared store behind the same WeddingRepo", () => {
  it("round-trips a whole wedding and keeps every record pointed at the shared wedding id", async () => {
    const sharedId = newId();
    const repo = createDocRepo(createMemoryDocStore(), sharedId, noFiles);
    const bundle = browserCopy();
    await repo.importJson(JSON.stringify(bundle));

    const wedding = await repo.getWedding("anything");
    expect(wedding?.id).toBe(sharedId);
    const destinations = await repo.destinations.list(sharedId);
    expect(destinations).toHaveLength(bundle.destinations.length);
    expect(destinations.every((d) => d.weddingId === sharedId)).toBe(true);
    expect(await repo.guests.list(newId())).toEqual([]);

    const exported = JSON.parse(await repo.exportJson(sharedId)) as ExportBundle;
    expect(exported.guests).toHaveLength(bundle.guests.length);
  });

  it("skips a document an older app version can't read instead of failing the whole list", async () => {
    const sharedId = newId();
    const store = createMemoryDocStore();
    const repo = createDocRepo(store, sharedId, noFiles);
    await store.put("guests", "broken", { id: "broken", weddingId: sharedId, firstName: 42 });
    expect(await repo.guests.list(sharedId)).toEqual([]);
  });
});

describe("planMerge — bringing the second browser's copy into the shared wedding", () => {
  it("unions both partners' hearts without duplicating a single destination", () => {
    const joshua = browserCopy();
    const janel = browserCopy();
    heart(joshua, "Tulum", "A");
    heart(janel, "Tulum", "B");
    heart(janel, "Charleston, SC", "B");

    const shared = rehomeBundle(joshua, joshua.wedding.id);
    const { writes, summary } = planMerge(shared, janel);

    expect(summary.added.destinations ?? 0).toBe(0);
    expect(summary.favoritesMerged).toBe(2);
    const tulum = writes.find((w) => w.collection === "destinations" && (w.entity as { name: string }).name === "Tulum");
    expect((tulum?.entity as { favoritedBy: string[] }).favoritedBy).toEqual(["A", "B"]);
    expect(writes.every((w) => w.entity.weddingId === shared.wedding.id)).toBe(true);
    expect(describeMerge(summary)).toBe("Brought over 2 favorites.");
  });

  it("matches same-name guests one-to-one, so the two Amoses stay two people", () => {
    const joshua = browserCopy();
    const janel = browserCopy();
    for (const copy of [joshua, janel]) addGuest(copy, "Amos", "Uncle");
    for (const copy of [joshua, janel]) addGuest(copy, "Amos", "Cousin (not Uncle Amos)");
    // Janel's copy has a third Amos the shared copy doesn't — only that one is new.
    addGuest(janel, "Amos", "Family friend");

    const { writes, summary } = planMerge(joshua, janel);
    expect(summary.added.guests).toBe(1);
    expect((writes.find((w) => w.collection === "guests")!.entity as { relationship: string }).relationship).toBe("Family friend");
  });

  it("adds what only the second browser has, re-pointed at the shared wedding and its records", () => {
    const joshua = browserCopy();
    const janel = browserCopy();
    const now = nowIso();
    janel.guests.push({
      id: newId(),
      weddingId: janel.wedding.id,
      firstName: "Nya",
      side: "b",
      tier: 1,
      plusOne: false,
      isChild: false,
      tags: [],
      rsvp: {},
      createdAt: now,
      updatedAt: now,
    });
    const janelTulum = janel.destinations.find((d) => d.name === "Tulum")!;
    janel.venues.push({
      id: newId(),
      weddingId: janel.wedding.id,
      destinationId: janelTulum.id,
      name: "A venue Janel found",
      status: "idea",
      sourceUrls: [],
      createdAt: now,
      updatedAt: now,
    });
    const doneTask = janel.tasks[0]!;
    doneTask.status = "done";

    const { writes, summary } = planMerge(joshua, janel);
    expect(summary.added.guests).toBe(1);
    expect(summary.added.venues).toBe(1);
    expect(summary.tasksCompleted).toBe(1);

    const venue = writes.find((w) => w.collection === "venues")!.entity as { destinationId: string; weddingId: string };
    expect(venue.destinationId).toBe(joshua.destinations.find((d) => d.name === "Tulum")!.id);
    expect(venue.weddingId).toBe(joshua.wedding.id);
  });

  it("carries a 'not for us' exclusion over, and never un-excludes", () => {
    const joshua = browserCopy();
    const janel = browserCopy();
    janel.destinations.find((d) => d.name === "Iceland")!.excluded = true;
    joshua.destinations.find((d) => d.name === "Maldives")!.excluded = true;

    const { writes, summary } = planMerge(joshua, janel);
    expect(summary.exclusionsMerged).toBe(1);
    expect(writes.some((w) => (w.entity as { name?: string }).name === "Maldives")).toBe(false);
  });

  it("is a no-op when both copies already match", () => {
    const joshua = browserCopy();
    const { writes, summary } = planMerge(joshua, browserCopy());
    expect(writes).toEqual([]);
    expect(describeMerge(summary)).toBe("Nothing new — both copies already matched.");
  });
});

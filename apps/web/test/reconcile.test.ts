import { createLocalRepo, GUEST_LIST_ROUND_6, newId, nowIso, STARTER_GUEST_LIST, type Guest, type WeddingRepo } from "@bower/shared";
import { describe, expect, it } from "vitest";
import { ensureWedding, reconcileDestinations, reconcileGuests, reconcileVenues } from "@/lib/bootstrap";

async function reconcileAll(repo: WeddingRepo, weddingId: string) {
  await reconcileDestinations(repo, weddingId);
  await reconcileVenues(repo, weddingId);
  await reconcileGuests(repo, weddingId);
}

const named = (guests: Guest[], firstName: string, side?: Guest["side"]) =>
  guests.filter((g) => g.firstName === firstName && (!side || g.side === side));

/** A wedding as round 5 left it: the round-4 list imported by name only (one Amos), no ledger. */
async function roundFiveWedding() {
  const repo = createLocalRepo(`reconcile-${newId()}`);
  const wedding = await ensureWedding(repo);
  const now = nowIso();
  const seen = new Set<string>();
  for (const entry of STARTER_GUEST_LIST) {
    const key = `${entry.firstName} ${entry.lastName ?? ""}`.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    await repo.guests.upsert({ id: newId(), weddingId: wedding.id, ...entry, plusOne: false, isChild: false, tags: [], rsvp: {}, createdAt: now, updatedAt: now });
  }
  return { repo, weddingId: wedding.id };
}

describe("reconcile — an existing wedding from last round", () => {
  it("fixes Janel's re-spelled names instead of duplicating them, and adds the second Amos", async () => {
    const { repo, weddingId } = await roundFiveWedding();
    await reconcileAll(repo, weddingId);
    const guests = await repo.guests.list(weddingId);

    for (const [old, fixed] of [["Elena", "Alayna"], ["Lori", "Laurie"], ["Marissa", "Nerissa"], ["Deja", "Dai'ja"], ["Tasha", "Tasna"], ["Wanita", "Juanita"]]) {
      expect(named(guests, old!)).toHaveLength(0);
      expect(named(guests, fixed!, "b")).toHaveLength(1);
    }
    const amoses = named(guests, "Amos", "b");
    expect(amoses).toHaveLength(2);
    expect(amoses.map((g) => g.relationship?.slice(0, 5)).sort()).toEqual(["Cousi", "Uncle"]);
    expect(named(guests, "April")[0]).toMatchObject({ plusOne: true, plusOneCount: 3 });
  });

  it("keeps each partner's Mom and Dad separate, and lists shared friends once", async () => {
    const { repo, weddingId } = await roundFiveWedding();
    await reconcileAll(repo, weddingId);
    const guests = await repo.guests.list(weddingId);
    expect(named(guests, "Mom", "a")).toHaveLength(1);
    expect(named(guests, "Mom", "b")).toHaveLength(1);
    expect(named(guests, "Jonny")).toMatchObject([{ side: "both" }]);
    expect(named(guests, "Viv")).toMatchObject([{ side: "both" }]);
  });

  it("is idempotent, and never brings back a guest who was renamed or removed", async () => {
    const { repo, weddingId } = await roundFiveWedding();
    await reconcileAll(repo, weddingId);
    const first = await repo.guests.list(weddingId);

    await reconcileAll(repo, weddingId);
    expect(await repo.guests.list(weddingId)).toHaveLength(first.length);

    const alayna = named(first, "Alayna")[0]!;
    await repo.guests.upsert({ ...alayna, firstName: "Alaina" });
    await repo.guests.remove(named(first, "Kenny")[0]!.id);
    await repo.guests.remove(named(first, "Mullet")[0]!.id);
    await reconcileAll(repo, weddingId);

    const after = await repo.guests.list(weddingId);
    expect(named(after, "Alayna")).toHaveLength(0);
    expect(named(after, "Elena")).toHaveLength(0);
    expect(named(after, "Kenny")).toHaveLength(0);
    expect(named(after, "Mullet")).toHaveLength(0);
    expect(after).toHaveLength(first.length - 2);
  });
});

describe("reconcile — a brand-new wedding", () => {
  it("adds both rounds of the guest lists", async () => {
    const repo = createLocalRepo(`reconcile-${newId()}`);
    const wedding = await ensureWedding(repo);
    await reconcileAll(repo, wedding.id);
    const guests = await repo.guests.list(wedding.id);
    expect(named(guests, "Amos", "b")).toHaveLength(2);
    expect(named(guests, "Grandmommy", "a")).toHaveLength(1);
    expect(guests.length).toBeGreaterThan(STARTER_GUEST_LIST.length + GUEST_LIST_ROUND_6.length - 10);
    expect(guests.find((g) => g.tags.includes("group"))?.firstName).toBe("Faithful Black Audis chat");
  });
});

describe("reconcile — destinations", () => {
  it("never re-adds a destination removed after the ledger exists", async () => {
    const repo = createLocalRepo(`reconcile-${newId()}`);
    const wedding = await ensureWedding(repo);
    await reconcileAll(repo, wedding.id);
    const destinations = await repo.destinations.list(wedding.id);
    const iceland = destinations.find((d) => d.name === "Iceland")!;
    await repo.destinations.remove(iceland.id);

    await reconcileAll(repo, wedding.id);
    expect((await repo.destinations.list(wedding.id)).some((d) => d.name === "Iceland")).toBe(false);
  });

  it("brings a destination removed before the ledger existed back as 'not for us', not active", async () => {
    const repo = createLocalRepo(`reconcile-${newId()}`);
    const wedding = await ensureWedding(repo);
    const maldives = (await repo.destinations.list(wedding.id)).find((d) => d.name === "Maldives")!;
    await repo.destinations.remove(maldives.id);

    await reconcileAll(repo, wedding.id);
    const back = (await repo.destinations.list(wedding.id)).find((d) => d.name === "Maldives");
    expect(back?.excluded).toBe(true);
  });
});

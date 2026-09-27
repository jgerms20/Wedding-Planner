import { describe, expect, it } from "vitest";
import type { Guest } from "../src/entities/index";
import { findPossibleDuplicates, guestHeadcount, mergeGuests, orderGuests, parseGuestList } from "../src/guests/index";
import { stableId } from "../src/util";

describe("parseGuestList — the shorthand from the couple's own pasted lists", () => {
  const parse = (text: string) => parseGuestList(text, { side: "b" });

  it("reads '+1' as a plus-one, not a second person", () => {
    const [reagan] = parse("Reagan +1");
    expect(reagan).toMatchObject({ firstName: "Reagan", plusOne: true });
    expect(reagan!.plusOneCount).toBeUndefined();
  });

  it("splits 'A + B' into two people and links the second to the first", () => {
    const rows = parse("Lauren + Ben");
    expect(rows.map((r) => r.firstName)).toEqual(["Lauren", "Ben"]);
    expect(rows[1]!.relationship).toBe("Lauren's partner");
    expect(rows.every((r) => !r.plusOne)).toBe(true);
  });

  it("keeps honorifics with the name and still splits the couple", () => {
    const rows = parse("Mr. Clint + Ms. Tasna");
    expect(rows.map((r) => r.firstName)).toEqual(["Mr. Clint", "Ms. Tasna"]);
  });

  it("flags hedged people as maybes (tier 4), but a hedged plus-one only as a note", () => {
    const [danielle] = parse("Danielle (maybe +1)");
    expect(danielle).toMatchObject({ firstName: "Danielle", plusOne: true, tier: 3, flags: [], notes: "maybe +1" });
    const [quint, tiffany] = parse("Quint + Tiffany (maybe)");
    expect([quint!.tier, tiffany!.tier]).toEqual([4, 4]);
    const [anna] = parse("Cousin Anna (?)");
    expect(anna).toMatchObject({ firstName: "Anna", relationship: "Cousin", tier: 4 });
  });

  it("counts '+2' and kids toward the headcount", () => {
    const [sienna] = parse("Sienna (maybe +2)");
    expect(sienna).toMatchObject({ plusOne: true, plusOneCount: 2 });
    const [april, bobo] = parse("Ms. April + Bobo (+ their 3 children potentially)");
    expect(april).toMatchObject({ firstName: "Ms. April", plusOne: true, plusOneCount: 3 });
    expect(bobo!.firstName).toBe("Bobo");
  });

  it("keeps a trailing description as a note", () => {
    const [kayleigh] = parse("Kayleigh — girl from CLT");
    expect(kayleigh).toMatchObject({ firstName: "Kayleigh", notes: "girl from CLT" });
  });

  it("strips numbering and markdown, and flags unclear transcriptions", () => {
    const [mullet] = parse("34. Mullet — *name/transcription unclear*");
    expect(mullet).toMatchObject({ firstName: "Mullet", flags: ["check spelling"], tags: ["check spelling"] });
    const [taraji] = parse("29. Taraji — maybe");
    expect(taraji).toMatchObject({ firstName: "Taraji", tier: 4 });
  });

  it("turns a whole group into one placeholder that doesn't count toward the headcount", () => {
    const [group] = parse("86. **All the guys from the Faithful Black Audis chat** — group, individual names TBD");
    expect(group!.tags).toEqual(["group"]);
    expect(guestHeadcount({ plusOne: false, tags: group!.tags })).toBe(0);
  });

  it("skips section headers and prose", () => {
    const rows = parse(
      [
        "Family / family friends",
        "",
        "Mom",
        "My friends",
        "So the cleanest way to think about it right now is roughly 84–85 named people + the Faithful Black Audis group, because a couple of those may collapse.",
      ].join("\n"),
    );
    expect(rows.map((r) => r.firstName)).toEqual(["Mom"]);
  });

  it(`takes tiers from "Tier N" headings and marks every other tier as a placeholder`, () => {
    const rows = parse(["Tier 1:", "Mom", "Tier 2 — close friends", "Lauren + Ben", "", "Kayleigh"].join("\n"));
    const byName = Object.fromEntries(rows.map((r) => [r.firstName, r]));
    expect(byName.Mom).toMatchObject({ tier: 1, tierGuessed: false });
    expect(byName.Ben).toMatchObject({ tier: 2, tierGuessed: false });
    // A heading carries on until the next one: the list said "Tier 2" above Kayleigh too.
    expect(byName.Kayleigh).toMatchObject({ tier: 2, tierGuessed: false });

    const plain = parse("Mom\nTaraji — maybe");
    expect(plain.map((r) => [r.tier, r.tierGuessed])).toEqual([
      [3, true],
      [4, true],
    ]);
  });
});

function guest(partial: Partial<Guest> & Pick<Guest, "firstName">): Guest {
  return {
    id: stableId(partial.firstName, partial.relationship ?? "", partial.side ?? "b", String(Math.random())),
    weddingId: "w",
    side: "b",
    tier: 3,
    plusOne: false,
    isChild: false,
    tags: [],
    rsvp: {},
    createdAt: "",
    updatedAt: "",
    ...partial,
  };
}

describe("findPossibleDuplicates", () => {
  it("treats the two Amoses as two people", () => {
    const list = [guest({ firstName: "Amos", relationship: "Uncle" }), guest({ firstName: "Amos", relationship: "Cousin" })];
    expect(findPossibleDuplicates(list)).toEqual([]);
  });

  it("never pairs up each partner's Mom", () => {
    const list = [guest({ firstName: "Mom", side: "a" }), guest({ firstName: "Mom", side: "b" })];
    expect(findPossibleDuplicates(list)).toEqual([]);
  });

  it("flags the same name on both sides for a check", () => {
    const list = [guest({ firstName: "Regina", side: "b" }), guest({ firstName: "Regina", side: "a" })];
    expect(findPossibleDuplicates(list)).toMatchObject([{ reason: "both-sides" }]);
  });

  it("flags near-identical spellings, ignoring honorifics", () => {
    const list = [guest({ firstName: "Ms. Candice", side: "b" }), guest({ firstName: "Candace", side: "a" })];
    expect(findPossibleDuplicates(list)).toMatchObject([{ reason: "similar-spelling" }]);
  });

  it("respects a pair the couple already said are different people", () => {
    const a = guest({ firstName: "Regina", side: "b" });
    const b = guest({ firstName: "Regina", side: "a" });
    expect(findPossibleDuplicates([a, b], [[a.id, b.id].sort().join("|")])).toEqual([]);
  });

  it("merging keeps the more generous invite and moves a cross-side person to Both", () => {
    const a = guest({ firstName: "Jonny", side: "b", tier: 3 });
    const b = guest({ firstName: "Johnny", side: "a", tier: 2, plusOne: true, notes: "college" });
    expect(mergeGuests(a, b)).toMatchObject({ firstName: "Jonny", side: "both", tier: 2, plusOne: true, notes: "college" });
  });
});

describe("stableId", () => {
  it("is deterministic and distinct", () => {
    expect(stableId("w", "guests", "reagan")).toBe(stableId("w", "guests", "reagan"));
    expect(stableId("w", "guests", "reagan")).not.toBe(stableId("w", "guests", "rj"));
    expect(stableId("a")).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});

describe("orderGuests — family first, then the couple's own order", () => {
  const list = [
    guest({ firstName: "Alayna", relationship: "Cousin" }),
    guest({ firstName: "Wanita", relationship: 'Mom\'s friend, a childhood "play aunt"' }),
    guest({ firstName: "Eddie", relationship: "Reagan's partner" }),
    guest({ firstName: "Renee", relationship: "Aunt" }),
    guest({ firstName: "Mom", relationship: "Mother" }),
    guest({ firstName: "Grandmommy", relationship: "Joshua's grandmother" }),
    guest({ firstName: "Reagan", relationship: "Sister" }),
    guest({ firstName: "Bobo", relationship: "Godfather" }),
    guest({ firstName: "Dad" }),
    guest({ firstName: "Kayleigh" }),
  ];

  it("puts parents, siblings (with partners right under them), grandparents, godparents, aunts, cousins, friends in that order", () => {
    expect(orderGuests(list).map((g) => g.firstName)).toEqual([
      "Dad", "Mom", "Reagan", "Eddie", "Grandmommy", "Bobo", "Renee", "Alayna", "Wanita", "Kayleigh",
    ]);
  });

  it("lets a hand-placed order win, with anyone not yet placed after it", () => {
    const placed = list.map((g) => (g.firstName === "Kayleigh" ? { ...g, sortOrder: 0 } : g.firstName === "Mom" ? { ...g, sortOrder: 1 } : g));
    expect(orderGuests(placed).map((g) => g.firstName).slice(0, 3)).toEqual(["Kayleigh", "Mom", "Dad"]);
  });
});

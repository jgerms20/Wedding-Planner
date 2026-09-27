import type { Guest, Side, Tier } from "../entities/index";
import { DEFAULT_TIER } from "../entities/index";

/** Wedding-party parts the couple can pick from (they can also type their own). */
export const WEDDING_ROLES = [
  "Best man",
  "Maid of honor",
  "Matron of honor",
  "Groomsman",
  "Bridesmaid",
  "Flower girl",
  "Ring bearer",
  "Officiant",
  "Mother of the bride",
  "Father of the bride",
  "Mother of the groom",
  "Father of the groom",
  "Reader",
  "Usher",
] as const;

/** A guest standing in for a group whose names aren't known yet ("the Faithful Black Audis chat"). */
export const GROUP_TAG = "group";
/** Set on names the couple should double-check (unclear transcription, uncertain spelling). */
export const CHECK_SPELLING_TAG = "check spelling";

/** People this guest accounts for: themselves plus anyone they bring. Group placeholders count 0. */
export function guestHeadcount(guest: Pick<Guest, "plusOne" | "plusOneCount" | "tags">): number {
  if (guest.tags.includes(GROUP_TAG)) return 0;
  return 1 + (guest.plusOne ? (guest.plusOneCount ?? 1) : 0);
}

export function guestDisplayName(guest: Pick<Guest, "firstName" | "lastName">): string {
  return [guest.firstName, guest.lastName].filter(Boolean).join(" ");
}

const HONORIFICS = new Set(["mr", "mrs", "ms", "miss", "dr", "aunt", "uncle", "cousin", "grandma", "grandpa"]);
/** Names that are roles, not people — each partner's "Mom" is a different person. */
const ROLE_NAMES = new Set(["mom", "dad", "mother", "father", "grandmommy", "grandma", "grandpa", "grandmother", "grandfather"]);

const norm = (value: string | undefined) =>
  (value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** "Miss Nerissa" and "Nerissa" are the same name; so are "Cousin Anna" and "Anna". */
export function coreName(guest: Pick<Guest, "firstName" | "lastName">): string {
  return norm(guestDisplayName(guest))
    .split(" ")
    .filter((part) => !HONORIFICS.has(part.replace(/\.$/, "")))
    .join(" ");
}

function editDistance(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]!;
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j]!;
      dp[j] = Math.min(dp[j]! + 1, dp[j - 1]! + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = temp;
    }
  }
  return dp[b.length]!;
}

export type DuplicateReason = "same-name" | "both-sides" | "similar-spelling";

export interface PossibleDuplicate {
  /** Sorted "idA|idB" — what `settings.notDuplicates` stores when the couple says they differ. */
  key: string;
  a: Guest;
  b: Guest;
  reason: DuplicateReason;
}

export const pairKey = (a: string, b: string) => [a, b].sort().join("|");

/**
 * Guests who might be the same person listed twice. Deliberately conservative about what it
 * *doesn't* flag: two guests with the same name but different stated relationships on the same
 * side (the two Amoses) are two people; each partner's "Mom" is two people.
 */
export function findPossibleDuplicates(guests: Guest[], notDuplicates: string[] = []): PossibleDuplicate[] {
  const dismissed = new Set(notDuplicates);
  const found: PossibleDuplicate[] = [];
  const people = guests.filter((g) => !g.tags.includes(GROUP_TAG));

  for (let i = 0; i < people.length; i++) {
    for (let j = i + 1; j < people.length; j++) {
      const a = people[i]!;
      const b = people[j]!;
      const key = pairKey(a.id, b.id);
      if (dismissed.has(key)) continue;
      const nameA = coreName(a);
      const nameB = coreName(b);
      if (!nameA || !nameB || ROLE_NAMES.has(nameA) || ROLE_NAMES.has(nameB)) continue;

      const firstA = nameA.split(" ")[0]!;
      const firstB = nameB.split(" ")[0]!;
      const lastA = nameA.split(" ").slice(1).join(" ");
      const lastB = nameB.split(" ").slice(1).join(" ");
      // Different last names, when both have one, are different people.
      if (lastA && lastB && lastA !== lastB) continue;

      const sameSide = a.side === b.side;
      const relationshipsDiffer = norm(a.relationship) !== "" && norm(b.relationship) !== "" && norm(a.relationship) !== norm(b.relationship);

      if (firstA === firstB) {
        if (sameSide) {
          if (!relationshipsDiffer) found.push({ key, a, b, reason: "same-name" });
        } else {
          found.push({ key, a, b, reason: "both-sides" });
        }
        continue;
      }
      if (firstA.length >= 4 && firstB.length >= 4 && editDistance(firstA, firstB) === 1) {
        found.push({ key, a, b, reason: "similar-spelling" });
      }
    }
  }
  return found;
}

/** Folds guest `b` into `a` (the one that stays): the more generous invite and both notes win. */
export function mergeGuests(a: Guest, b: Guest): Guest {
  const notes = [a.notes, b.notes].filter(Boolean);
  const relationship = a.relationship ?? b.relationship;
  return {
    ...a,
    lastName: a.lastName ?? b.lastName,
    side: a.side === b.side ? a.side : a.side === "unsure" ? b.side : b.side === "unsure" ? a.side : "both",
    role: a.role ?? b.role,
    withGuestIds: [...new Set([...(a.withGuestIds ?? []), ...(b.withGuestIds ?? [])])].filter((id) => id !== a.id && id !== b.id),
    tier: Math.min(a.tier, b.tier) as Tier,
    relationship,
    plusOne: a.plusOne || b.plusOne,
    plusOneCount: Math.max(a.plusOneCount ?? 1, b.plusOneCount ?? 1) > 1 ? Math.max(a.plusOneCount ?? 1, b.plusOneCount ?? 1) : undefined,
    email: a.email ?? b.email,
    phone: a.phone ?? b.phone,
    homeCity: a.homeCity ?? b.homeCity,
    dietary: a.dietary ?? b.dietary,
    notes: notes.length > 0 ? [...new Set(notes)].join(" · ") : undefined,
    tags: [...new Set([...a.tags, ...b.tags])],
    updatedAt: new Date().toISOString(),
  };
}

/** One row the bulk-add parser produced, for the couple to review before anything is saved. */
export interface ParsedGuest {
  firstName: string;
  lastName?: string;
  relationship?: string;
  notes?: string;
  side: Side;
  tier: Tier;
  plusOne: boolean;
  plusOneCount?: number;
  tags: string[];
  /** Why this row deserves a look: "maybe", "check spelling", "group". */
  flags: string[];
  /** The line it came from, shown in review so nothing is silently reinterpreted. */
  source: string;
  /** The list didn't say a tier, so `tier` is a placeholder for the couple to pick. */
  tierGuessed?: boolean;
}

const RELATIONSHIP_PREFIX = /^(aunt|uncle|cousin|grandma|grandpa|grandmother|grandfather|godmother|godfather)\s+/i;
const MAYBE = /\b(maybe|potentially|possibly|tbd)\b|\?/i;
const UNCLEAR = /(unclear|transcri|assum|not sure of (?:the )?spelling|spelling)/i;
const PLUS_N = /\+\s*(\d+)/;

function titleWord(word: string) {
  return /^[a-z]/.test(word) ? word[0]!.toUpperCase() + word.slice(1) : word;
}

function splitName(raw: string): { firstName: string; lastName?: string } {
  const words = raw.trim().split(/\s+/).map(titleWord);
  const honorific = words.length > 1 && /^(mr|mrs|ms|miss|dr)\.?$/i.test(words[0]!);
  // "Miss Nikki", "Mr. Chavez": keep the honorific with the name — it's how they're known.
  if (honorific) return { firstName: words.join(" ") };
  if (words.length === 1) return { firstName: words[0]! };
  return { firstName: words[0]!, lastName: words.slice(1).join(" ") };
}

/**
 * Turns a pasted or dropped list — numbered, bulleted, or one name per line, with the shorthand
 * people actually use ("Reagan +1", "Lauren + Ben", "Danielle (maybe +1)", "Kayleigh — girl from
 * CLT") — into guest rows for review. Never guesses silently: anything hedged or unclear is
 * flagged, and every row keeps the line it came from.
 */
export function parseGuestList(text: string, options: { side: Side; tier?: Tier }): ParsedGuest[] {
  const rows: ParsedGuest[] = [];
  // "Tier 2:" / "Tier 2 — close friends" headings set the tier for the lines under them.
  let sectionTier: Tier | undefined;
  for (const rawLine of text.split(/\r?\n/)) {
    let line = rawLine
      .replace(/\*\*|__|`/g, "")
      .replace(/^\s*(?:[-*•·]+|\d+\s*[.)])\s*/, "")
      .trim();
    if (!line) continue;
    const tierHeading = /^tier\s*([1-5])\b(?:\s*(?:[:—–-].*)?)?$/i.exec(line);
    if (tierHeading) {
      sectionTier = Number(tierHeading[1]) as Tier;
      continue;
    }
    const statedTier = options.tier ?? sectionTier;
    // Section headers ("My friends", "Family / family friends:"), not names.
    if (/:$/.test(line)) continue;
    if (/^(family|friends|my friends|family\s*\/\s*family friends|guests?|guest list)$/i.test(line)) continue;

    const source = rawLine.trim();
    const flags: string[] = [];
    const notes: string[] = [];

    // Group entries ("All the guys from the Faithful Black Audis chat").
    if (/^all (the )?(guys|girls|people|folks)\b/i.test(line) || /\b(group|chat)\b.*\b(tbd|names)\b/i.test(line)) {
      rows.push({
        firstName: line.replace(/\s*[—–-]\s*.*$/, "").replace(/^all (the )?/i, "").replace(/^\w/, (c) => c.toUpperCase()),
        notes: "Group — individual names to come",
        side: options.side,
        tier: statedTier ?? DEFAULT_TIER,
        plusOne: false,
        tags: [GROUP_TAG],
        flags: ["group"],
        source,
        tierGuessed: statedTier === undefined,
      });
      continue;
    }

    // Prose, not a name: judge only the part before any " — note".
    const namePart = line.replace(/\([^)]*\)/g, " ").split(/\s+[—–-]\s+/)[0]!;
    if (namePart.trim().split(/\s+/).length > 6) continue;

    // Parentheticals: "(maybe +1)", "(?)", "(+ their 3 children potentially)".
    const parens = [...line.matchAll(/\(([^)]*)\)/g)].map((m) => m[1]!.trim());
    line = line.replace(/\([^)]*\)/g, " ").trim();
    // Trailing notes after a dash: "Kayleigh — girl from CLT", "Taraji — maybe".
    const dash = /\s+[—–-]\s+(.+)$/.exec(line);
    if (dash) {
      notes.push(dash[1]!.replace(/\*/g, "").trim());
      line = line.slice(0, dash.index).trim();
    }
    // "Jared from LA", "Sam O. from Wieden": where they're from is a note, not a last name.
    const from = /\s+(from\s+.+)$/i.exec(line);
    if (from) {
      notes.push(from[1]!);
      line = line.slice(0, from.index).trim();
    }
    // "Tasa / Tasia", "“Dinner” / Dena?": the first spelling is the name, the rest a note.
    line = line.replace(/[“”"]/g, "").trim();
    const slash = /\s*\/\s*(.+)$/.exec(line);
    if (slash) {
      notes.push(`or ${slash[1]!.trim()}`);
      line = line.slice(0, slash.index).trim();
    }
    // A trailing "maybe"/"potentially" written straight after the name.
    const trailingMaybe = /\s+(maybe|potentially)$/i.exec(line);
    if (trailingMaybe) {
      notes.push(trailingMaybe[1]!.toLowerCase());
      line = line.slice(0, trailingMaybe.index).trim();
    }
    for (const p of parens) if (p) notes.push(p);

    // "+1" / "+2" on the name itself.
    let plusOne = false;
    let plusOneCount: number | undefined;
    const ownPlus = PLUS_N.exec(line);
    if (ownPlus) {
      plusOne = true;
      const n = Number(ownPlus[1]);
      if (n > 1) plusOneCount = n;
      line = line.replace(PLUS_N, " ").replace(/\s+/g, " ").trim();
    }
    const notePlus = notes.map((n) => PLUS_N.exec(n)).find(Boolean);
    if (!plusOne && notePlus) {
      plusOne = true;
      const n = Number(notePlus[1]);
      if (n > 1) plusOneCount = n;
    }
    const childrenNote = notes.map((n) => /(\d+)\s+(?:children|kids)/i.exec(n)).find(Boolean);
    if (childrenNote) {
      plusOne = true;
      plusOneCount = Math.max(plusOneCount ?? 1, Number(childrenNote[1]));
    }

    const noteText = notes.join(" · ");
    // A hedge on the extra guests ("maybe +1", "+1?", "their 3 children potentially") is about the
    // plus-one, not the person — it stays a note and doesn't lower their tier.
    const personHedges = notes.filter((n) => MAYBE.test(n) && !/\d/.test(n) && !/same person/i.test(n));
    const nameHedged = /\?/.test(line) || (/\(\s*\?\s*\)/.test(rawLine) && !plusOne);
    const hedged = personHedges.length > 0 || nameHedged || (/\(\s*\?\s*\)/.test(rawLine) && notes.every((n) => n === "?"));
    if (hedged) flags.push("maybe");
    if (UNCLEAR.test(noteText) || /same person/i.test(noteText)) flags.push("check spelling");
    const tier: Tier = statedTier ?? (hedged ? 4 : DEFAULT_TIER);

    // "Lauren + Ben", "Mr. Clint + Ms. Tasna", "Jonny & Viv": two people.
    const names = line
      .split(/\s+(?:\+|&|and)\s+/i)
      .map((n) => n.replace(/^\+|\+$/g, "").trim())
      .filter((n) => n && !/^\d+$/.test(n));
    if (names.length === 0) continue;

    names.forEach((name, index) => {
      let relationship: string | undefined;
      const prefix = RELATIONSHIP_PREFIX.exec(name);
      if (prefix) {
        relationship = titleWord(prefix[1]!.toLowerCase());
        name = name.slice(prefix[0].length);
      }
      const parts = splitName(name);
      if (index > 0 && !relationship) relationship = `${splitName(names[0]!.replace(RELATIONSHIP_PREFIX, "")).firstName}'s partner`;
      const plusOneNote = /\d/.test(noteText) && !hedged;
      rows.push({
        ...parts,
        relationship,
        // A note about the first person's extra guests doesn't belong on their partner's row.
        notes: index > 0 && plusOneNote ? undefined : noteText || undefined,
        side: options.side,
        tier,
        // A named partner is their own row, so only the first person carries a leftover "+1".
        plusOne: index === 0 ? plusOne : false,
        plusOneCount: index === 0 ? plusOneCount : undefined,
        tags: flags.includes("check spelling") ? [CHECK_SPELLING_TAG] : [],
        flags: [...flags],
        source,
        tierGuessed: statedTier === undefined,
      });
    });
  }
  return rows;
}

/** Rows that match someone already on the list (same side, same name). */
export function alreadyListed(row: Pick<ParsedGuest, "firstName" | "lastName" | "side">, guests: Guest[]): Guest | undefined {
  const name = coreName(row);
  return guests.find((g) => coreName(g) === name && (g.side === row.side || g.side === "both" || row.side === "both"));
}

/* ------------------------------------------------------------------ */
/* Family-first order                                                  */
/* ------------------------------------------------------------------ */

/** Who comes first by default: closest family at the top, then out through friends. */
const CLOSENESS: [RegExp, number][] = [
  [/\b(step-?)?(mom|mother|dad|father|parents?|mama|papa)\b/, 0],
  [/\b(sister|brother|sibling)\b/, 1],
  [/\bgrand(mother|father|ma|pa|mommy|daddy|parents?|mom|dad)\b/, 2],
  [/\bgod(mother|father|parents?)\b/, 3],
  [/\bcousin/, 5],
  [/\b(aunt|uncle)\b/, 4],
  [/\b(niece|nephew|in-law|family)\b(?! friend)/, 6],
  [/\b(family friend|play aunt|babysitter|mom's friend|dad's friend)\b/, 7],
  [/\b(friend|roommate|coworker|colleague|classmate|teammate)\b/, 8],
];
const OTHER = 9;
const PARTNER_OF = /^(?:possibly\s+)?(?:uncle\s+|aunt\s+|cousin\s+)?([\p{L}][\p{L}'.-]*)'s\s+(partner|husband|wife|boyfriend|girlfriend|fianc[ée]e?|spouse)\b/iu;

function ownRank(guest: Pick<Guest, "firstName" | "relationship">): number {
  const rel = norm(guest.relationship ?? "");
  // "Uncle Marcus & Regina's child", "Cousin's family": the family branch, not the aunt/uncle.
  if (/'s (child|kids?|son|daughter|family)\b/.test(rel)) return 5;
  // "Mom's friend, a childhood play aunt": someone's friend, not the parent.
  if (/'s (friend|coworker|colleague|neighbor)\b/.test(rel)) return 7;
  for (const [pattern, rank] of CLOSENESS) if (pattern.test(rel)) return rank;
  // "Mom" and "Dad" often arrive as the name itself, with no relationship.
  for (const [pattern, rank] of CLOSENESS.slice(0, 3)) if (pattern.test(norm(guest.firstName))) return rank;
  return OTHER;
}

/**
 * Sort key for the family-first default: [rank, anchor name, 0 for the person / 1 for their
 * partner]. A partner ("Reagan's partner") sits right under the person they came with.
 */
export function closenessKey(guest: Guest, everyone: Guest[]): [number, string, number] {
  const partnerOf = PARTNER_OF.exec(guest.relationship ?? "");
  if (partnerOf) {
    const anchorName = norm(partnerOf[1]!);
    const anchor = everyone.find((g) => g.id !== guest.id && g.side === guest.side && norm(g.firstName) === anchorName)
      ?? everyone.find((g) => g.id !== guest.id && norm(g.firstName) === anchorName);
    if (anchor) return [ownRank(anchor), coreName(anchor), 1];
  }
  return [ownRank(guest), coreName(guest), 0];
}

/**
 * One tier's guests in display order: anyone the couple placed by hand (sortOrder) first, in
 * their order; everyone else after, family first, then by name.
 */
export function orderGuests(tierGuests: Guest[], everyone: Guest[] = tierGuests): Guest[] {
  const keys = new Map(tierGuests.map((g) => [g.id, closenessKey(g, everyone)]));
  return [...tierGuests].sort((a, b) => {
    const ao = a.sortOrder ?? Number.POSITIVE_INFINITY;
    const bo = b.sortOrder ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    const [ar, an, ap] = keys.get(a.id)!;
    const [br, bn, bp] = keys.get(b.id)!;
    return ar - br || an.localeCompare(bn) || ap - bp || coreName(a).localeCompare(coreName(b)) || a.side.localeCompare(b.side);
  });
}

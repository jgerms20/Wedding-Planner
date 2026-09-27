import type { Guest, Side, Tier } from "../entities/index";

/**
 * Round 6 of the couple's own guest lists (real personal data — no citations). Two sources:
 *
 * - Janel's list ("Family / family friends" + "My friends"), side "b". Much of the family half is
 *   the same people as her round-4 dictation with corrected spellings — those are
 *   `GUEST_CORRECTIONS` against the existing records, not new guests.
 * - Joshua's numbered "master invite pool", side "a". Transcription-unclear names carry the
 *   "check spelling" tag instead of being guessed at.
 *
 * Tiers are a starting point, not a ranking the couple gave: parents and Grandmommy are 1,
 * named aunts/uncles/cousins 2, everyone else 3, anyone hedged ("maybe", "?") 4.
 */
export interface GuestListEntry {
  firstName: string;
  lastName?: string;
  relationship?: string;
  notes?: string;
  side: Side;
  tier: Tier;
  plusOne?: boolean;
  plusOneCount?: number;
  tags?: string[];
}

export interface GuestCorrection {
  /** Which existing guest: same side, this first name, and (optionally) a relationship containing this. */
  match: { firstName: string; side: Side; relationshipIncludes?: string };
  set: Partial<Pick<Guest, "firstName" | "lastName" | "relationship" | "notes" | "plusOne" | "plusOneCount" | "side">>;
}

const CHECK = ["check spelling"];

export const GUEST_CORRECTIONS: GuestCorrection[] = [
  { match: { firstName: "Elena", side: "b" }, set: { firstName: "Alayna", relationship: "Cousin" } },
  { match: { firstName: "Lori", side: "b" }, set: { firstName: "Laurie", relationship: "Aunt" } },
  { match: { firstName: "Marissa", side: "b" }, set: { firstName: "Nerissa", relationship: 'Family friend ("Miss Nerissa")' } },
  { match: { firstName: "Deja", side: "b" }, set: { firstName: "Dai'ja", plusOne: true, notes: "maybe 2" } },
  { match: { firstName: "Tasha", side: "b" }, set: { firstName: "Tasna", relationship: 'Family friend ("Ms. Tasna") — Mr. Clint\'s partner' } },
  { match: { firstName: "Wanita", side: "b" }, set: { firstName: "Juanita", relationship: 'Aunt — mom\'s friend, a childhood "play aunt"' } },
  { match: { firstName: "DJ", side: "b" }, set: { plusOne: true } },
  { match: { firstName: "Danielle", side: "b" }, set: { plusOne: true, notes: "maybe +1" } },
  { match: { firstName: "Sandra", side: "b" }, set: { plusOne: true } },
  { match: { firstName: "Jason", side: "b" }, set: { plusOne: true } },
  { match: { firstName: "April", side: "b" }, set: { plusOne: true, plusOneCount: 3, notes: "their 3 children, potentially" } },
];

const b = (firstName: string, tier: Tier, extra: Partial<GuestListEntry> = {}): GuestListEntry => ({ firstName, tier, side: "b", ...extra });
const a = (firstName: string, tier: Tier, extra: Partial<GuestListEntry> = {}): GuestListEntry => ({ firstName, tier, side: "a", ...extra });

export const GUEST_LIST_ROUND_6: GuestListEntry[] = [
  // ——— Janel: family / family friends (new names; corrected spellings are above) ———
  // Round 4's name-only import could only ever add one Amos; this is the second one.
  b("Amos", 1, { relationship: "Cousin — a different Amos than Uncle Amos" }),
  b("Sienna", 2, { plusOne: true, plusOneCount: 2, notes: "maybe +2" }),
  b("Waleicha", 2),
  b("Ms. Candice", 2),
  b("Ashleigh", 2),
  b("Kennedi", 2),
  b("Bernard", 2),
  b("Mr. Robert", 2),
  b("Jacia", 3, { relationship: "Tony's partner" }),
  b("Quint", 4, { notes: "maybe" }),
  b("Tiffany", 4, { relationship: "Quint's partner", notes: "maybe" }),
  b("Roger", 4, { relationship: "Uncle", plusOne: true, notes: "?" }),
  b("Mr. Williams", 2),

  // ——— Janel: her friends ———
  b("Nya", 3),
  b("Qhira", 3),
  b("Ruth", 3),
  b("Anaury", 3),
  b("Donovon", 3),
  // On both lists (Janel's "Jonny + Viv", Joshua's "Johnny" and "Viv"): one record each, both sides.
  { firstName: "Jonny", tier: 3, side: "both", notes: "Spelled \"Johnny\" on Joshua's list" },
  { firstName: "Viv", tier: 3, side: "both", relationship: "Jonny's partner" },
  b("Parth", 3),
  b("Jake", 3),
  b("Nelson", 3),
  b("Fredo", 3),
  b("Charlize", 3, { relationship: "Fredo's partner" }),
  b("Dajuan", 3),
  b("Taryn", 3, { relationship: "Dajuan's partner" }),
  b("Jalen", 3),
  b("Nicole", 4, { notes: "?" }),
  b("Taylor", 3),
  b("AJ", 3, { relationship: "Taylor's partner" }),
  b("Holly", 3, { plusOne: true }),
  b("Sammie", 3),
  b("Shannon", 3, { plusOne: true, notes: "+1?" }),
  b("Zari", 3, { plusOne: true }),
  b("Shedera", 3),
  b("Kayleigh", 3, { notes: "girl from CLT" }),
  b("Julio", 4, { notes: "?" }),
  b("Sarwat", 4, { notes: "?" }),
  b("Jack", 3, { lastName: "Lind" }),
  b("Amanda", 4, { notes: "?" }),
  b("Anusha", 3),
  b("Julian", 3, { relationship: "Anusha's partner" }),
  b("Cassie", 3),
  b("Jazmyne", 3, { lastName: "McCrae", plusOne: true }),

  // ——— Joshua: the numbered master invite pool ———
  a("Mom", 1, { relationship: "Joshua's mom" }),
  a("Dad", 1, { relationship: "Joshua's dad" }),
  a("Nick", 3),
  a("Brig", 3),
  a("Daniel", 3),
  a("Grandmommy", 1, { relationship: "Joshua's grandmother" }),
  a("David", 2, { relationship: "Uncle" }),
  a("Chamre", 2, { relationship: "Aunt" }),
  a("Karen", 3),
  a("Drew", 3),
  a("Erskin", 2, { relationship: "Uncle" }),
  a("Hope", 2, { relationship: "Aunt" }),
  a("Jordan", 3),
  a("Leslie", 2, { relationship: "Cousin" }),
  a("Burn", 2, { relationship: "Cousin" }),
  a("Trey", 3, { notes: "A cousin Trey came up on Janel's side last round and was left off — check this is a different Trey" }),
  a("Justin", 3),
  a("Nick", 3, { lastName: "Raymond" }),
  a("Chase", 3, { lastName: "Raymond" }),
  a("Mr. Chavez", 3),
  a("Miss Nikki", 3),
  a("Jared", 3, { notes: "from LA" }),
  a("Benji", 3),
  a("Adarius", 3),
  a("Kenzie", 3),
  a("Simone", 3),
  a("Neo", 3),
  a("Corey", 3),
  a("Taraji", 4, { notes: "maybe" }),
  a("Mitchell", 3, { lastName: "Lambert" }),
  a("Josh", 3, { lastName: "Lusk" }),
  a("Kyle", 3),
  a("Parker", 3),
  a("Mullet", 3, { notes: "name unclear in the transcription", tags: CHECK }),
  a("Sydney", 3),
  a("Gino", 3, { notes: "the transcript caught this as \"No\"", tags: CHECK }),
  a("Miles", 3, { lastName: "Parker" }),
  a("Miss Gerlyn", 3),
  a("Mr. Darnell", 3),
  a("Miss Rosland", 3),
  a("Tasa", 3, { notes: "or Tasia", tags: CHECK }),
  a("Kevin", 3),
  a("NQA", 2, { relationship: "Cousin", notes: "name unclear in the transcription", tags: CHECK }),
  a("Clayton", 4, { notes: "potentially" }),
  a("Casey", 4, { lastName: "Paxman", notes: "from Oregon · maybe" }),
  a("Miss Rosin", 3, { notes: "may be the same person as Miss Rosland", tags: CHECK }),
  a("Marcus", 2, { relationship: "Cousin" }),
  a("Regina", 3),
  a("Miss Pam", 3),
  a("Miss Lans", 3, { notes: "spelling unclear", tags: CHECK }),
  a("Candace", 3, { notes: "from Chiat (the transcript said \"Shia\")", tags: CHECK }),
  a("Noah", 3),
  a("Sierra", 4, { notes: "potentially · a cousin Sierra came up on Janel's side last round and was left off — check this is a different Sierra" }),
  a("Michael", 3, { lastName: "Williams" }),
  a("Kier", 4, { notes: "maybe invite" }),
  a("Matt", 3, { lastName: "McNamera" }),
  a("Spencer", 3, { notes: "from college" }),
  a("Charlotte", 3),
  a("Danell", 4, { notes: "potentially" }),
  a("Lenise", 3, { notes: "from Goodby" }),
  a("Ba", 3, { notes: "from Goodby", tags: CHECK }),
  a("Dynasty", 3),
  a("Grace", 3),
  a("Jason", 3, { lastName: "Tawa", notes: "from Portland" }),
  a("Mateesh", 3, { notes: "from college" }),
  a("Malik", 3, { lastName: "Walker" }),
  a("Malik", 3, { lastName: "Brazil" }),
  a("Matt", 3, { lastName: "Anderson" }),
  a("Ma", 2, { relationship: "Cousin", notes: "name unclear in the transcription", tags: CHECK }),
  a("Germaine", 2, { relationship: "Cousin" }),
  a("Evelyn", 3),
  a("Miss Bert", 3),
  a("Anita", 3),
  a("Dion", 3),
  a("Tabria", 3),
  a("Sam", 3, { lastName: "O.", notes: "from Wieden" }),
  a("Taylor", 3, { lastName: "Bell" }),
  a("Mahanila", 3),
  a("Byron", 3, { lastName: "Morgan" }),
  a("Caleb", 3, { notes: "from New York" }),
  a("Sydney", 3, { lastName: "Wheeler" }),
  a("Aisha", 3),
  a("Dinner", 4, { notes: "or Dena? — unclear in the transcription", tags: CHECK }),
  a("Faithful Black Audis chat", 3, { notes: "All the guys from the chat — individual names to come", tags: ["group"] }),
];

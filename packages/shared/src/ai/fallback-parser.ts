import { isValid, parse as parseDateString } from "date-fns";
import type { Side, Tier } from "../entities/index";
import type { BowerAction, GuestDraft } from "./actions";

/**
 * The no-key path. When Claude is not connected, this turns the simplest,
 * most common phrasings into the same actions the model would propose, so
 * the couple still sees a card instead of a shrug. It is deliberately
 * conservative: anything it does not recognize becomes a note, never a guess.
 *
 * Every rule here is pure string work — no model call, no network, and no
 * clock beyond `options.now`, which tests pin so year-less dates stay fixed.
 */

export interface FallbackOptions {
  /** "Today", as YYYY-MM-DD. Defaults to the real date. Resolves "by Apr 17". */
  now?: string;
  /** Partner A's first name; "<name>'s side" maps to side "a". */
  partnerAName?: string;
  /** Partner B's first name; "<name>'s side" maps to side "b". */
  partnerBName?: string;
}

const DEFAULT_PARTNER_A = "Joshua";
const DEFAULT_PARTNER_B = "Janel";

/** Words that introduce a person rather than name them; kept as `relationship`. */
const RELATIONSHIPS = [
  "college friend",
  "work friend",
  "best friend",
  "childhood friend",
  "family friend",
  "co-worker",
  "coworker",
  "godmother",
  "godfather",
  "grandmother",
  "grandfather",
  "grandma",
  "grandpa",
  "stepmom",
  "stepdad",
  "mother",
  "father",
  "brother",
  "sister",
  "cousin",
  "nephew",
  "niece",
  "roommate",
  "neighbor",
  "colleague",
  "friend",
  "aunt",
  "uncle",
  "boss",
  "mom",
  "dad",
];

const GUEST_TRIGGERS: RegExp[] = [
  /^add\s+(.+?)\s+to\s+(?:the\s+|our\s+|my\s+)?guest\s*list\b.*$/i,
  /^put\s+(.+?)\s+on\s+(?:the\s+|our\s+|my\s+)?guest\s*list\b.*$/i,
  /^add\s+guests?[:,]?\s+(.+)$/i,
  /^invite\s+(.+)$/i,
  /^add\s+((?:my|our|his|her|their)\s+.+)$/i,
];

const TASK_TRIGGERS: RegExp[] = [
  /^add\s+(?:a\s+)?task[:,]?\s+(.+)$/i,
  /^add\s+(?:a\s+)?to-?do[:,]?\s+(.+)$/i,
  /^(?:please\s+)?remind\s+(?:us|me)\s+to\s+(.+)$/i,
  /^we\s+need\s+to\s+(.+)$/i,
  /^i\s+need\s+to\s+(.+)$/i,
  /^we\s+should\s+(.+)$/i,
];

const COMPLETE_TRIGGERS: RegExp[] = [
  /^mark\s+(.+?)\s+(?:as\s+)?(?:done|complete|completed)\s*$/i,
  /^(?:we(?:'re|\s+are)?\s+)?done\s+with\s+(.+)$/i,
  /^(?:we\s+)?(?:just\s+)?finished\s+(.+)$/i,
];

const NOTE_TRIGGERS: RegExp[] = [/^note[:,]?\s+(.+)$/i, /^remember(?:\s+that)?[:,]?\s+(.+)$/i];

const DECISION_TRIGGERS: RegExp[] = [/^(?:we\s+)?decided(?:\s+(?:to|on|that))?[:,]?\s+(.+)$/i];

/**
 * Turns one utterance into actions without a model. Order matters: the most
 * specific verbs win, and anything left over is saved verbatim as a note.
 */
export function parseFallback(text: string, options: FallbackOptions = {}): BowerAction[] {
  const trimmed = text.trim().replace(/\s+/g, " ");
  if (!trimmed) return [];
  const body = trimmed.replace(/[.!]+$/, "");

  const note = firstMatch(NOTE_TRIGGERS, body);
  if (note) return [{ type: "add_note", text: note }];

  const decision = firstMatch(DECISION_TRIGGERS, body);
  if (decision) return [{ type: "add_decision", title: sentenceCase(decision) }];

  const completed = firstMatch(COMPLETE_TRIGGERS, body);
  if (completed) return [{ type: "complete_task", titleMatch: stripArticle(completed) }];

  // "we need to invite Ray" is a guest add wearing a task's clothes.
  const task = firstMatch(TASK_TRIGGERS, body);
  if (task && !/^invite\s+/i.test(task)) return [taskAction(task, options)];

  const guestBody = firstMatch(GUEST_TRIGGERS, body) ?? (task ? task.replace(/^invite\s+/i, "") : undefined);
  if (guestBody) {
    const guests = parseGuests(guestBody, options);
    if (guests.length > 0) return [{ type: "add_guests", guests }];
  }

  if (task) return [taskAction(task, options)];

  return [{ type: "add_note", text: trimmed }];
}

function firstMatch(patterns: RegExp[], text: string): string | undefined {
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match?.[1]) return match[1].trim();
  }
  return undefined;
}

function taskAction(rest: string, options: FallbackOptions): BowerAction {
  const { title, dueDate } = splitDue(rest, options);
  return { type: "add_task", title: sentenceCase(title), ...(dueDate ? { dueDate } : {}) };
}

/** Pulls a trailing "by <date>" / "on <date>" off a task phrase. */
function splitDue(text: string, options: FallbackOptions): { title: string; dueDate?: string } {
  const match = /^(.*?),?\s+(?:by|on|before|due)\s+(.+)$/i.exec(text);
  if (!match) return { title: text.trim() };
  const dueDate = parseLooseDate(match[2]!.trim(), options.now);
  if (!dueDate) return { title: text.trim() };
  return { title: match[1]!.trim(), dueDate };
}

const DATE_PATTERNS = ["yyyy-MM-dd", "MMMM d yyyy", "MMM d yyyy", "MMMM d", "MMM d", "M/d/yyyy", "M/d"];

/**
 * Parses the handful of date shapes people actually say. Relative phrasings
 * ("next Friday") are deliberately out of scope — the model handles those.
 */
export function parseLooseDate(value: string, now?: string): string | undefined {
  const cleaned = value
    .replace(/[.,]+$/, "")
    .replace(/\b(\d{1,2})(st|nd|rd|th)\b/gi, "$1")
    .trim();
  const reference = now ? new Date(`${now}T12:00:00.000Z`) : new Date();
  const referenceIso = now ?? toIsoDate(reference);
  for (const pattern of DATE_PATTERNS) {
    const parsed = parseDateString(cleaned, pattern, reference);
    if (!isValid(parsed)) continue;
    const iso = toIsoDate(parsed);
    if (!pattern.includes("yyyy") && iso < referenceIso) {
      // A year-less date that has already passed means next year.
      const next = new Date(parsed);
      next.setFullYear(next.getFullYear() + 1);
      return toIsoDate(next);
    }
    return iso;
  }
  return undefined;
}

function toIsoDate(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseGuests(body: string, options: FallbackOptions): GuestDraft[] {
  const shared = readModifiers(body, options);
  const segments = body.split(/\s*(?:,|\band\b|&)\s*/i);
  const guests: GuestDraft[] = [];
  for (const segment of segments) {
    const draft = parseGuestSegment(segment, shared, options);
    if (draft) guests.push(draft);
  }
  return guests;
}

interface Modifiers {
  tier?: Tier;
  side?: Side;
  plusOne?: boolean;
  isChild?: boolean;
  homeCity?: string;
}

function readModifiers(text: string, options: FallbackOptions): Modifiers {
  const partnerA = options.partnerAName ?? DEFAULT_PARTNER_A;
  const partnerB = options.partnerBName ?? DEFAULT_PARTNER_B;
  const mods: Modifiers = {};
  if (/\bmust\b/i.test(text)) mods.tier = "must";
  else if (/\bshould\b/i.test(text)) mods.tier = "should";
  else if (/\bnice(?:\s+to\s+have)?\b/i.test(text)) mods.tier = "nice";
  if (/\b(?:plus[\s-]?ones?|\+\s?1)\b/i.test(text)) mods.plusOne = true;
  if (/\b(?:kids?|child|children)\b/i.test(text)) mods.isChild = true;
  const sideMatch = /\b([A-Za-z]+)(?:'s|s')\s+side\b/i.exec(text);
  if (sideMatch) {
    const who = sideMatch[1]!.toLowerCase();
    if (who === partnerA.toLowerCase()) mods.side = "a";
    else if (who === partnerB.toLowerCase()) mods.side = "b";
  }
  const city = readCity(text);
  if (city) mods.homeCity = city;
  return mods;
}

/** Words that end a "from <city>" phrase; everything before them is the city. */
const CITY_STOP_WORDS = new Set([
  "and",
  "on",
  "with",
  "who",
  "must",
  "should",
  "nice",
  "plus",
  "kid",
  "kids",
  "child",
  "children",
  "side",
  "to",
]);

function readCity(text: string): string | undefined {
  const match = /\bfrom\s+(.+)$/i.exec(text);
  if (!match) return undefined;
  const words: string[] = [];
  for (const raw of match[1]!.split(/\s+/)) {
    const word = raw.replace(/[^A-Za-z.-]/g, "");
    if (!word) break;
    if (CITY_STOP_WORDS.has(word.toLowerCase())) break;
    if (/['’]/.test(raw)) break;
    words.push(word);
    if (/[,&]/.test(raw)) break;
  }
  return words.length > 0 ? titleCase(words.join(" ")) : undefined;
}

/** Phrases that describe a guest but are never part of their name. */
const MODIFIER_PHRASES: RegExp[] = [
  /\bmust[\s-]?(?:invite|have)?\b/gi,
  /\bshould[\s-]?(?:invite|have)?\b/gi,
  /\bnice(?:[\s-]to[\s-]have)?\b/gi,
  /\bwith\s+a\s+(?:plus[\s-]?one|\+\s?1)\b/gi,
  /\b(?:plus[\s-]?ones?|\+\s?1)\b/gi,
  /\b(?:their|his|her)\s+(?:kids?|children)\b/gi,
  /\b(?:the\s+)?(?:kids?|child|children)\b/gi,
  /\b[A-Za-z]+(?:'s|s')\s+side\b/gi,
  /\bon\s+(?:his|her|their)\s+side\b/gi,
  /\bto\s+(?:the\s+)?guest\s*list\b/gi,
  /\bfrom\s+[A-Za-z][A-Za-z.\s-]*$/i,
];

function parseGuestSegment(segment: string, shared: Modifiers, options: FallbackOptions): GuestDraft | undefined {
  const own = readModifiers(segment, options);
  let rest = segment;
  for (const phrase of MODIFIER_PHRASES) rest = rest.replace(phrase, " ");
  rest = rest
    .replace(/^\s*(?:my|our|his|her|their|the|a|an)\s+/i, " ")
    .replace(/\s+/g, " ")
    .trim();

  let relationship: string | undefined;
  for (const word of RELATIONSHIPS) {
    const pattern = new RegExp(`^${word}\\b`, "i");
    if (pattern.test(rest)) {
      relationship = word;
      rest = rest.replace(pattern, "").trim();
      break;
    }
  }

  const name = rest
    .replace(/[^A-Za-z'.\- ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!name) return undefined;
  const parts = name.split(" ");
  const draft: GuestDraft = { firstName: titleCase(parts[0]!) };
  if (parts.length > 1) draft.lastName = titleCase(parts.slice(1).join(" "));
  if (relationship) draft.relationship = relationship;
  const side = own.side ?? shared.side;
  if (side) draft.side = side;
  draft.tier = own.tier ?? shared.tier ?? "must";
  const homeCity = own.homeCity ?? shared.homeCity;
  if (homeCity) draft.homeCity = homeCity;
  if (own.plusOne ?? shared.plusOne) draft.plusOne = true;
  if (own.isChild ?? shared.isChild) draft.isChild = true;
  return draft;
}

function stripArticle(text: string): string {
  return text.replace(/^\s*(?:the|our|my|that)\s+/i, "").trim();
}

function sentenceCase(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function titleCase(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

import type {
  BudgetCategory,
  BudgetItem,
  Decision,
  Destination,
  Event,
  Guest,
  Scenario,
  Settings,
  SubEvent,
  SubEventKind,
  Task,
  Venue,
  WatchItem,
  Wedding,
} from "../entities/index";
import { defaultSettings, scenarioMath } from "../entities/index";
import type { ExportBundle } from "../repo/export-bundle";
import { generateAnchorEvents, generatePlan } from "../timeline/index";
import { newId, nowIso } from "../util";
import type { CostBenchmarks, DestinationSeed, VenueSeed } from "./types";

export interface SeedInput {
  destinations: DestinationSeed[];
  benchmarks: CostBenchmarks;
  /** Local mode's single wedding slug. */
  slug?: string;
  /** Overrides "now", for deterministic tests. ISO date-time. */
  now?: string;
}

/** Joshua & Janel's known facts. Edit here, not in the UI code. */
export const COUPLE = {
  name: "Joshua & Janel",
  partnerA: { name: "Joshua" },
  partnerB: { name: "Janel" },
  engagedOn: "2026-09-10",
  engagedWhere: "Brazil",
  targetSeason: "spring 2028",
  /** Mid-spring stand-in used only to derive satellite-event dates until a real date is chosen. */
  nominalWeddingDate: "2028-04-15",
  guestTarget: 100,
  engagementParty: {
    /** A Saturday about a year before the wedding; a placeholder until they pick one. */
    date: "2027-04-17",
    title: "Engagement party",
  },
} as const;

/** Satellite events derived from the nominal wedding date. Offsets are days before the wedding. */
const SUB_EVENT_PLAN: Array<{ kind: SubEventKind; title: string; daysBefore: number; guestRule: string; note: string }> = [
  {
    kind: "bridal_shower",
    title: "Bridal shower",
    daysBefore: 90,
    guestRule: "Janel's side plus close friends",
    note: "Typically 2-3 months before the wedding; usually hosted by the wedding party or family.",
  },
  {
    kind: "groom_shower",
    title: "Groom's shower",
    daysBefore: 83,
    guestRule: "Joshua's side plus close friends",
    note: "A newer tradition; same window as the bridal shower.",
  },
  {
    kind: "bachelorette",
    title: "Bachelorette trip",
    daysBefore: 63,
    guestRule: "Janel's wedding party and closest friends",
    note: "Trips book 6+ months out; the wedding party usually splits the cost.",
  },
  {
    kind: "bachelor",
    title: "Bachelor trip",
    daysBefore: 56,
    guestRule: "Joshua's wedding party and closest friends",
    note: "Trips book 6+ months out; the wedding party usually splits the cost.",
  },
  {
    kind: "welcome_party",
    title: "Welcome party",
    daysBefore: 1,
    guestRule: "Everyone who traveled",
    note: "For a destination wedding this often replaces a formal rehearsal dinner.",
  },
  {
    kind: "rehearsal_dinner",
    title: "Rehearsal dinner",
    daysBefore: 1,
    guestRule: "Wedding party, immediate family, officiant",
    note: "Can fold into the welcome party at a destination.",
  },
  {
    kind: "brunch",
    title: "Morning-after brunch",
    daysBefore: -1,
    guestRule: "Everyone still in town",
    note: "Casual; often hosted by parents.",
  },
];

function shiftDate(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function round(n: number): number {
  return Math.round(n);
}

/**
 * Builds one destination (plus its venues and a starting scenario) from a researched seed.
 * Shared by `buildSeedBundle` (the first-ever bootstrap) and `reconcileDestinations` (adding a
 * newly-registered seed destination to an existing wedding later, without touching anything
 * else) — `sortOrder`/`pinned` are the caller's call since they mean different things in each
 * context (seed rank vs. "append after what's already there"; "the initial pick" vs. "never
 * auto-pin something the couple hasn't looked at yet").
 */
/** Builds one runtime `Venue` from a researched `VenueSeed`. Shared by `buildDestinationFromSeed`
 * (a brand-new destination) and `reconcileVenues` (adding/swapping a venue on a destination that
 * already exists in the couple's data). */
export function buildVenueFromSeed(seed: VenueSeed, weddingId: string, destinationId: string, now: string): Venue {
  return {
    id: newId(),
    weddingId,
    destinationId,
    name: seed.name,
    website: seed.website,
    email: seed.email,
    phone: seed.phone,
    capacity: seed.capacity,
    rentalFee: seed.rentalFee,
    fbMinimum: seed.fbMinimum,
    perGuestCost: seed.perGuestCost,
    inHouseCatering: seed.inHouseCatering,
    lodgingOnSite: seed.lodgingOnSite,
    styleNotes: [seed.styleNotes, seed.estimated ? "Figures are estimates, not published prices." : undefined]
      .filter(Boolean)
      .join(" "),
    availabilityNotes: seed.availabilityNotes,
    status: seed.status ?? "idea",
    sourceUrls: seed.sourceUrls,
    createdAt: now,
    updatedAt: now,
  };
}

export function buildDestinationFromSeed(
  seed: DestinationSeed,
  weddingId: string,
  now: string,
  options: { guestTarget: number; sortOrder: number; pinned: boolean },
): { destination: Destination; venues: Venue[]; scenario: Scenario } {
  const destinationId = newId();
  const destination: Destination = {
    id: destinationId,
    weddingId,
    name: seed.name,
    country: seed.country,
    region: seed.region,
    notes: [seed.whyHere, seed.notes, seed.travelNotes].filter(Boolean).join("\n\n"),
    travelCostPerGuestEstimate: seed.travelCostPerGuestEstimate,
    lodgingPerNightEstimate: seed.lodgingPerNightEstimate,
    attendanceRateEstimate: seed.attendanceRateEstimate,
    weatherNotes: seed.weatherNotes,
    legalNotes: seed.legalNotes,
    seasonNotes: seed.seasonNotes,
    sourceUrls: seed.sourceUrls,
    imageUrl: seed.imageUrl,
    imageCredit: seed.imageCredit,
    sortOrder: options.sortOrder,
    createdAt: now,
    updatedAt: now,
  };

  const venues: Venue[] = seed.venues.map((v) => buildVenueFromSeed(v, weddingId, destinationId, now));

  const scenario: Scenario = {
    id: newId(),
    weddingId,
    name: seed.name,
    destinationId,
    guestAssumption: options.guestTarget,
    attendanceRate: seed.scenario.attendanceRate,
    fixedCosts: seed.scenario.fixedCosts,
    perGuestCost: seed.scenario.perGuestCost,
    travelCostPerGuest: seed.scenario.travelCostPerGuest,
    notes: seed.scenario.notes,
    pinned: options.pinned,
    createdAt: now,
    updatedAt: now,
  };

  return { destination, venues, scenario };
}

/**
 * Builds the bespoke first-load bundle for Joshua & Janel from researched
 * destination seeds and cost benchmarks. Everything derived is labeled as such
 * in notes so the couple can see where a number came from.
 */
export function buildSeedBundle(input: SeedInput): ExportBundle {
  const now = input.now ?? nowIso();
  const slug = input.slug ?? "our-wedding";
  const weddingId = newId();

  const sortedDestinations = [...input.destinations].sort((a, b) => a.rank - b.rank);

  const destinations: Destination[] = [];
  const venues: Venue[] = [];
  const scenarios: Scenario[] = [];

  for (const seed of sortedDestinations) {
    const built = buildDestinationFromSeed(seed, weddingId, now, {
      guestTarget: COUPLE.guestTarget,
      sortOrder: seed.rank,
      pinned: seed.rank === 1,
    });
    destinations.push(built.destination);
    venues.push(...built.venues);
    scenarios.push(built.scenario);
  }

  const pinned = scenarios.find((s) => s.pinned) ?? scenarios[0];

  const wedding: Wedding = {
    id: weddingId,
    slug,
    name: COUPLE.name,
    partnerA: { ...COUPLE.partnerA },
    partnerB: { ...COUPLE.partnerB },
    dateFlexibility: "season",
    targetSeason: COUPLE.targetSeason,
    locationText: `Deciding between ${sortedDestinations.map((d) => d.name).join(", ")}. ${sortedDestinations[0]?.name ?? ""} is the front-runner.`,
    styleNotes: `Engaged ${COUPLE.engagedOn} in ${COUPLE.engagedWhere}. Destination wedding likely. Guest target of ${COUPLE.guestTarget} is a placeholder until the list is built.`,
    guestTarget: COUPLE.guestTarget,
    isDestination: true,
    activeScenarioId: pinned?.id,
    createdAt: now,
    updatedAt: now,
  };

  const settings: Settings = {
    ...defaultSettings(weddingId),
    autonomy: { tell_bower: 1 },
    planConfig: {
      anchors: [
        {
          id: newId(),
          kind: "engagement_party",
          title: COUPLE.engagementParty.title,
          date: COUPLE.engagementParty.date,
          reveals: ["date", "destination", "wedding_party"],
          notes:
            "About a year before the wedding. Doubles as the reveal of the date, the destination, and the wedding party. Date is a placeholder Saturday until you pick one.",
        },
      ],
      travelWindows: [],
      saveTheDatesMonthsBefore: 12,
      invitationsMonthsBefore: 9,
      rsvpDeadlineMonthsBefore: 5,
      overrides: {},
    },
  };

  // Budget: categories from benchmarks, estimates as a share of the pinned scenario's total.
  const scenarioTotal = pinned ? scenarioMath(pinned).totalCost : input.benchmarks.averageDestinationWeddingCost;
  const budgetCategories: BudgetCategory[] = [];
  const budgetItems: BudgetItem[] = [];
  for (const bench of [...input.benchmarks.categories].sort((a, b) => a.sortOrder - b.sortOrder)) {
    const categoryId = newId();
    budgetCategories.push({
      id: categoryId,
      weddingId,
      name: bench.category,
      targetPercent: bench.percent,
      sortOrder: bench.sortOrder,
    });
    budgetItems.push({
      id: newId(),
      weddingId,
      categoryId,
      name: bench.category,
      estimate: round((scenarioTotal * bench.percent) / 100),
      notes: `Estimated as ${bench.percent}% of the pinned scenario total (${pinned?.name ?? "benchmark"}). ${bench.note} Sources: ${bench.sourceUrls.join(" ")}`,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Satellite events with derived dates and benchmark budgets.
  const subEvents: SubEvent[] = [
    {
      id: newId(),
      weddingId,
      kind: "engagement_party",
      title: COUPLE.engagementParty.title,
      date: COUPLE.engagementParty.date,
      hostName: undefined,
      budgetEstimate: midpoint(input.benchmarks, "engagement_party"),
      notes:
        "The reveal: date, destination, and wedding party. Save-the-dates go out right after. Placeholder date until you pick one.",
      guestRule: "Family and close friends, ideally most of the eventual guest list",
    },
    ...SUB_EVENT_PLAN.map((p) => ({
      id: newId(),
      weddingId,
      kind: p.kind,
      title: p.title,
      date: shiftDate(COUPLE.nominalWeddingDate, -p.daysBefore),
      budgetEstimate: midpoint(input.benchmarks, p.kind),
      notes: `${p.note} Date is derived from a mid-April 2028 stand-in and moves with the real date.`,
      guestRule: p.guestRule,
    })),
  ];

  const decisions: Decision[] = [
    {
      id: newId(),
      weddingId,
      title: `${sortedDestinations[0]?.name ?? "Brazil"} is the front-runner`,
      detail: "Where the engagement happened. Other candidates stay on the atlas until a scenario is pinned for good.",
      decidedAt: now,
      decidedBy: "us",
      source: "manual",
    },
    {
      id: newId(),
      weddingId,
      title: "Engagement party in spring 2027 doubles as the reveal",
      detail: "Date, destination, and wedding party get announced there, about a year before the wedding.",
      decidedAt: now,
      decidedBy: "us",
      source: "manual",
    },
    {
      id: newId(),
      weddingId,
      title: "Save-the-dates go out right after the engagement party",
      detail: "Roughly 12 months before the wedding so guests can plan travel.",
      decidedAt: now,
      decidedBy: "us",
      source: "manual",
    },
    {
      id: newId(),
      weddingId,
      title: "Invitations go out about a year out, not 8 weeks",
      detail: "Destination timing. RSVP deadline set around 5 months before so headcounts and blocks can be locked.",
      decidedAt: now,
      decidedBy: "us",
      source: "manual",
    },
  ];

  const tasks: Task[] = generatePlan({ wedding, planConfig: settings.planConfig, existingTasks: [] });
  tasks.unshift({
    id: newId(),
    weddingId,
    title: "Add our East Coast trip dates",
    description:
      "Bower schedules in-person tasks (tours, tastings, family conversations) into the windows when you are there. Add them under Plan → Travel windows.",
    phase: "just_engaged",
    dueDate: shiftDate(now.slice(0, 10), 14),
    status: "todo",
    tags: ["travel", "setup"],
    dependsOn: [],
    sourceAgent: "seed",
    createdAt: now,
    updatedAt: now,
  });

  const events: Event[] = [
    ...generateAnchorEvents(wedding, settings.planConfig),
    ...subEvents
      .filter((s) => s.kind !== "engagement_party" && s.date)
      .map<Event>((s) => ({
        id: newId(),
        weddingId,
        title: s.title,
        startsAt: s.date!,
        allDay: true,
        kind: "sub_event",
        linkedType: "sub_event",
        linkedId: s.id,
      })),
  ];

  return {
    version: 1,
    exportedAt: now,
    wedding,
    settings,
    tasks,
    events,
    destinations,
    venues,
    scenarios,
    households: [],
    guests: [],
    budgetCategories,
    budgetItems,
    subEvents,
    partyMembers: [],
    decisions,
    notes: [],
    priorities: [],
    watchItems: buildStarterWatchList(weddingId),
    savingsEntries: [],
  };
}

const STARTER_WATCH_LIST: Array<{ kind: WatchItem["kind"]; title: string }> = [
  { kind: "movie", title: "Materialists (2025)" },
  { kind: "movie", title: "The Wedding Banquet (2025)" },
  { kind: "movie", title: "Plus One (2019)" },
  { kind: "show", title: "Love Is Blind" },
];

function buildStarterWatchList(weddingId: string): WatchItem[] {
  const now = nowIso();
  return STARTER_WATCH_LIST.map((item) => ({
    id: newId(),
    weddingId,
    kind: item.kind,
    title: item.title,
    done: false,
    createdAt: now,
  }));
}

/**
 * One entry from the couple's own dictated guest-list conversation — real personal data, not
 * researched content, so there's no `sourceUrls`/citation requirement here the way there is for
 * destinations. `relationship` doubles as a plain-language note for anything hedged ("maybe",
 * "respectful invite") so a lower-tier entry reads honestly rather than as a firm invite.
 *
 * `side` is a stated guess, not a determination: the recording reads as one person walking
 * through their whole family tree while the other listens, but nothing in it says whose tree it
 * is. Everyone here defaults to "a" (Joshua's side, since he's the one who relayed the notes) —
 * a single bulk edit on the Guests page fixes this if it's actually Janel's family.
 */
export const STARTER_GUEST_LIST: Array<{
  firstName: string;
  lastName?: string;
  relationship: string;
  tier: Guest["tier"];
  side: Guest["side"];
}> = [
  // Confirmed, closest circle (tier: must)
  { firstName: "Mom", relationship: "Mother", tier: "must", side: "a" },
  { firstName: "Dad", relationship: "Father", tier: "must", side: "a" },
  { firstName: "Reagan", relationship: "Sister", tier: "must", side: "a" },
  { firstName: "Eddie", relationship: "Reagan's partner", tier: "must", side: "a" },
  { firstName: "RJ", relationship: "Brother", tier: "must", side: "a" },
  { firstName: "Tori", relationship: "RJ's partner", tier: "must", side: "a" },
  { firstName: "Renee", relationship: "Aunt", tier: "must", side: "a" },
  { firstName: "Amos", relationship: "Uncle", tier: "must", side: "a" },
  { firstName: "Amos", relationship: "Cousin (a different Amos than the uncle, same first name)", tier: "must", side: "a" },
  { firstName: "Elena", relationship: "Cousin (also called Lena)", tier: "must", side: "a" },
  { firstName: "Darren", relationship: "Uncle", tier: "must", side: "a" },
  { firstName: "Lori", relationship: "Aunt (also spelled Lorie)", tier: "must", side: "a" },
  { firstName: "Lauren", relationship: "Cousin", tier: "must", side: "a" },
  { firstName: "Ben", relationship: "Lauren's husband", tier: "must", side: "a" },
  { firstName: "Danielle", relationship: "Cousin", tier: "must", side: "a" },
  { firstName: "DJ", relationship: "Family friend (exact relation not stated in the notes)", tier: "must", side: "a" },
  { firstName: "Jackie", relationship: "Cousin", tier: "must", side: "a" },
  { firstName: "Ryan", relationship: "Cousin", tier: "must", side: "a" },
  { firstName: "Jasmine", relationship: "Cousin", tier: "must", side: "a" },
  { firstName: "Melissa", relationship: "Cousin", tier: "must", side: "a" },
  { firstName: "April", relationship: "Godmother", tier: "must", side: "a" },
  { firstName: "Bobo", relationship: "Godfather", tier: "must", side: "a" },
  { firstName: "Marissa", relationship: "Family friend (\"Miss Marissa\")", tier: "must", side: "a" },
  { firstName: "Deja", relationship: "Family friend", tier: "must", side: "a" },
  { firstName: "Clint", relationship: "Family friend", tier: "must", side: "a" },
  { firstName: "Tasha", relationship: "Family friend", tier: "must", side: "a" },
  { firstName: "Barbara", relationship: "Cousin", tier: "must", side: "a" },
  { firstName: "Nathaniel", relationship: "Cousin", tier: "must", side: "a" },

  // Confirmed, real invite but stated more plainly than the closest circle (tier: should)
  { firstName: "Carol", relationship: "Cousin — invited, though not expected to attend", tier: "should", side: "a" },
  { firstName: "Wanita", relationship: "Mom's friend, a childhood \"play aunt\"", tier: "should", side: "a" },
  { firstName: "Sandra", relationship: "Family friend (\"Miss Sandra\"), a childhood babysitter", tier: "should", side: "a" },
  { firstName: "Jason", relationship: "Family friend — invited along with his wife (her name wasn't given in the notes)", tier: "should", side: "a" },
  { firstName: "Jessica", relationship: "Family friend", tier: "should", side: "a" },
  { firstName: "Tony", relationship: "Family friend", tier: "should", side: "a" },
  { firstName: "Evelyn", relationship: "Aunt", tier: "should", side: "a" },
  { firstName: "Arlene", relationship: "Cousin", tier: "should", side: "a" },
  { firstName: "Marcus", relationship: "Uncle", tier: "should", side: "a" },
  { firstName: "Regina", relationship: "Possibly Uncle Marcus's wife — unclear from the notes", tier: "should", side: "a" },

  // Hedged in the notes (tier: nice — the hedge is kept in `relationship` so it reads honestly)
  { firstName: "Kenny", relationship: "Family friend — hedged (\"why not, that's a possibility\")", tier: "nice", side: "a" },
  { firstName: "Manar", relationship: "Family friend — hedged (\"why not, that's a possibility\")", tier: "nice", side: "a" },
  { firstName: "Jerome", relationship: "Cousin — hedged (\"it's on the line\")", tier: "nice", side: "a" },
  { firstName: "Sheniqua", relationship: "Hedged alongside cousin Jerome (\"it's on the line\")", tier: "nice", side: "a" },
  { firstName: "Javon", relationship: "Cousin — hedged (\"maybe a respectful invite, let them know\")", tier: "nice", side: "a" },
  { firstName: "JJ", relationship: "Cousin's family — hedged (\"maybe a respectful invite, let them know\")", tier: "nice", side: "a" },
  { firstName: "Dion", relationship: "Cousin — hedged (\"maybe, low-key\")", tier: "nice", side: "a" },
  { firstName: "Mark", relationship: "Uncle Marcus & Regina's child — hedged (\"if they wanted to\")", tier: "nice", side: "a" },
  { firstName: "Anna", relationship: "Uncle Marcus & Regina's child — hedged (\"if they wanted to\")", tier: "nice", side: "a" },
];

function midpoint(benchmarks: CostBenchmarks, kind: SubEventKind): number | undefined {
  const est = benchmarks.subEventEstimates.find((e) => e.kind === kind);
  return est ? round((est.low + est.high) / 2) : undefined;
}

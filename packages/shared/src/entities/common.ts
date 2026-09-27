import { z } from "zod";

/** Money is stored as whole currency units (numbers); USD assumed for now. */
export const moneySchema = z.number();

export const dateFlexibilitySchema = z.enum(["fixed", "month", "season", "open"]);
export type DateFlexibility = z.infer<typeof dateFlexibilitySchema>;

export const phaseKeySchema = z.enum([
  "just_engaged",
  "foundation",
  "core_vendors",
  "communications",
  "details",
  "final_stretch",
  "wedding_weekend",
  "after",
]);
export type PhaseKey = z.infer<typeof phaseKeySchema>;

/** Phases in chronological order, for grouping and sorting the plan. */
export const PHASE_ORDER: PhaseKey[] = [
  "just_engaged",
  "foundation",
  "core_vendors",
  "communications",
  "details",
  "final_stretch",
  "wedding_weekend",
  "after",
];

export const PHASE_LABELS: Record<PhaseKey, string> = {
  just_engaged: "Just engaged",
  foundation: "Foundation",
  core_vendors: "Core vendors",
  communications: "Communications",
  details: "Details",
  final_stretch: "Final stretch",
  wedding_weekend: "Wedding weekend",
  after: "After",
};

export const taskStatusSchema = z.enum(["todo", "doing", "done", "skipped"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const sideSchema = z.enum(["a", "b", "both"]);
export type Side = z.infer<typeof sideSchema>;

/** Guest priority, 1 (can't get married without them) through 5 (only if there's room). */
export const TIERS = [1, 2, 3, 4, 5] as const;
export type Tier = (typeof TIERS)[number];

/** Guests saved before numbered tiers used must/should/nice; those map onto the 1–5 scale. */
const LEGACY_TIERS: Record<string, Tier> = { must: 1, should: 3, nice: 5 };

export const tierSchema = z.preprocess(
  (value) => (typeof value === "string" ? (LEGACY_TIERS[value] ?? Number(value)) : value),
  z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
);

export const TIER_LABELS: Record<Tier, string> = {
  1: "Can't get married without them",
  2: "Closest circle",
  3: "Want them there",
  4: "Would be nice",
  5: "Only if there's room",
};

/** Where a newly added guest lands until someone ranks them. */
export const DEFAULT_TIER: Tier = 3;

export const venueStatusSchema = z.enum([
  "idea",
  "contacted",
  "awaiting",
  "replied",
  "quoted",
  "touring",
  "negotiating",
  "booked",
  "declined",
]);
export type VenueStatus = z.infer<typeof venueStatusSchema>;

export const subEventKindSchema = z.enum([
  "engagement_party",
  "bridal_shower",
  "couples_shower",
  "groom_shower",
  "bachelor",
  "bachelorette",
  "joint_bachelor_bachelorette",
  "premarital_counseling",
  "rehearsal_dinner",
  "welcome_party",
  "after_party",
  "brunch",
  "second_reception",
  "sangeet",
  "henna_night",
  "tea_ceremony",
  "engagement_photoshoot",
  "bridal_party_proposal",
  "tasting",
  "dress_shopping",
  "suit_fitting",
  "stock_the_bar_party",
  "bridesmaids_luncheon",
  "group_excursion",
  "day_after_pool_party",
  "farewell_dinner",
  "barbershop_day",
  "glam_morning",
  "families_meet",
  "knocking_ceremony",
  "traditional_engagement",
  "lobola_negotiation",
  "kitchen_party",
  "haldi",
  "baraat",
  "door_games",
  "paebaek",
  "aufruf",
  "polterabend",
  "callejoneada",
  "second_line",
  "jumping_the_broom",
  "honeymoon",
  "other",
]);
export type SubEventKind = z.infer<typeof subEventKindSchema>;

export const anchorKindSchema = z.enum([
  "engagement_party",
  "save_the_dates",
  "invitations",
  "custom",
]);
export type AnchorKind = z.infer<typeof anchorKindSchema>;

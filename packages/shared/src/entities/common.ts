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

export const tierSchema = z.enum(["must", "should", "nice"]);
export type Tier = z.infer<typeof tierSchema>;

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

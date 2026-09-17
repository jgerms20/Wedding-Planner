import { z } from "zod";
import { anchorKindSchema, dateFlexibilitySchema } from "./common";

export const partnerSchema = z.object({
  name: z.string(),
  pronouns: z.string().optional(),
});
export type Partner = z.infer<typeof partnerSchema>;

export const weddingSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  partnerA: partnerSchema,
  partnerB: partnerSchema,
  targetDate: z.string().optional(),
  dateFlexibility: dateFlexibilitySchema,
  targetSeason: z.string().optional(),
  locationText: z.string().optional(),
  styleNotes: z.string().optional(),
  guestTarget: z.number().optional(),
  isDestination: z.boolean(),
  activeScenarioId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Wedding = z.infer<typeof weddingSchema>;

export const anchorSchema = z.object({
  id: z.string(),
  kind: anchorKindSchema,
  title: z.string(),
  date: z.string().optional(),
  reveals: z.array(z.enum(["date", "destination", "wedding_party"])),
  notes: z.string().optional(),
});
export type Anchor = z.infer<typeof anchorSchema>;

export const travelWindowSchema = z.object({
  id: z.string(),
  label: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string(),
});
export type TravelWindow = z.infer<typeof travelWindowSchema>;

export const planConfigSchema = z.object({
  anchors: z.array(anchorSchema),
  travelWindows: z.array(travelWindowSchema),
  saveTheDatesMonthsBefore: z.number(),
  invitationsMonthsBefore: z.number(),
  rsvpDeadlineMonthsBefore: z.number(),
  overrides: z.record(
    z.string(),
    z.object({
      monthsBefore: z.number().optional(),
      skipped: z.boolean().optional(),
    }),
  ),
});
export type PlanConfig = z.infer<typeof planConfigSchema>;

export const settingsSchema = z.object({
  weddingId: z.string(),
  autonomy: z.record(z.string(), z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])),
  notifications: z.record(z.string(), z.boolean()),
  monthlyCostCapCents: z.number(),
  planConfig: planConfigSchema,
});
export type Settings = z.infer<typeof settingsSchema>;

export function defaultPlanConfig(): PlanConfig {
  return {
    anchors: [],
    travelWindows: [],
    saveTheDatesMonthsBefore: 6,
    invitationsMonthsBefore: 2,
    rsvpDeadlineMonthsBefore: 1,
    overrides: {},
  };
}

export function defaultSettings(weddingId: string): Settings {
  return {
    weddingId,
    autonomy: {},
    notifications: {},
    monthlyCostCapCents: 0,
    planConfig: defaultPlanConfig(),
  };
}

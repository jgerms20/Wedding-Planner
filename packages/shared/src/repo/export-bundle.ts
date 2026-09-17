import { z } from "zod";
import {
  budgetCategorySchema,
  budgetItemSchema,
  decisionSchema,
  destinationSchema,
  eventSchema,
  guestSchema,
  householdSchema,
  scenarioSchema,
  settingsSchema,
  subEventSchema,
  taskSchema,
  venueSchema,
  weddingPartyMemberSchema,
  weddingSchema,
} from "../entities/index";

export const EXPORT_BUNDLE_VERSION = 1;

export const exportBundleSchema = z.object({
  version: z.literal(EXPORT_BUNDLE_VERSION),
  exportedAt: z.string(),
  wedding: weddingSchema,
  settings: settingsSchema.optional(),
  tasks: z.array(taskSchema),
  events: z.array(eventSchema),
  destinations: z.array(destinationSchema),
  venues: z.array(venueSchema),
  scenarios: z.array(scenarioSchema),
  households: z.array(householdSchema),
  guests: z.array(guestSchema),
  budgetCategories: z.array(budgetCategorySchema),
  budgetItems: z.array(budgetItemSchema),
  subEvents: z.array(subEventSchema),
  partyMembers: z.array(weddingPartyMemberSchema),
  decisions: z.array(decisionSchema),
});
export type ExportBundle = z.infer<typeof exportBundleSchema>;

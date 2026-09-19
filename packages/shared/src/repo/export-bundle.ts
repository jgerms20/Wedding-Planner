import { z } from "zod";
import {
  budgetCategorySchema,
  budgetItemSchema,
  decisionSchema,
  destinationSchema,
  eventSchema,
  guestSchema,
  householdSchema,
  noteSchema,
  prioritySchema,
  savingsEntrySchema,
  scenarioSchema,
  settingsSchema,
  subEventSchema,
  taskSchema,
  venueSchema,
  watchItemSchema,
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
  /** Added after version 1 shipped; older exports simply have none. */
  notes: z.array(noteSchema).default([]),
  priorities: z.array(prioritySchema).default([]),
  watchItems: z.array(watchItemSchema).default([]),
  savingsEntries: z.array(savingsEntrySchema).default([]),
});
export type ExportBundle = z.infer<typeof exportBundleSchema>;

import { z } from "zod";
import { sideSchema, tierSchema } from "./common";

export const householdSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  name: z.string(),
  side: sideSchema,
  addressText: z.string().optional(),
  homeCity: z.string().optional(),
  notes: z.string().optional(),
});
export type Household = z.infer<typeof householdSchema>;

export const rsvpStatusSchema = z.enum(["pending", "yes", "no"]);
export type RsvpStatus = z.infer<typeof rsvpStatusSchema>;

export const guestSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  householdId: z.string().optional(),
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  side: sideSchema,
  tier: tierSchema,
  relationship: z.string().optional(),
  plusOne: z.boolean(),
  /** How many people come with them when `plusOne` is on (a partner, or "+2", or kids). Default 1. */
  plusOneCount: z.number().int().min(1).max(10).optional(),
  isChild: z.boolean(),
  dietary: z.string().optional(),
  homeCity: z.string().optional(),
  /** Anything hedged or worth remembering: "maybe", "girl from CLT", "spelling unclear". */
  notes: z.string().optional(),
  tags: z.array(z.string()),
  /** The couple's own order within the tier (drag and drop). Unset falls back to family-first. */
  sortOrder: z.number().optional(),
  /** Keyed by sub-event id, or the literal "wedding" for the main event. */
  rsvp: z.record(z.string(), rsvpStatusSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Guest = z.infer<typeof guestSchema>;

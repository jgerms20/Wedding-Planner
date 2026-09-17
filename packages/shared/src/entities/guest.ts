import { z } from "zod";
import { sideSchema, tierSchema } from "./common.js";

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
  isChild: z.boolean(),
  dietary: z.string().optional(),
  homeCity: z.string().optional(),
  tags: z.array(z.string()),
  /** Keyed by sub-event id, or the literal "wedding" for the main event. */
  rsvp: z.record(z.string(), rsvpStatusSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Guest = z.infer<typeof guestSchema>;

import { z } from "zod";
import { venueStatusSchema } from "./common";

export const destinationSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  name: z.string(),
  country: z.string(),
  region: z.string().optional(),
  notes: z.string().optional(),
  travelCostPerGuestEstimate: z.number().optional(),
  lodgingPerNightEstimate: z.number().optional(),
  attendanceRateEstimate: z.number().min(0).max(1).optional(),
  weatherNotes: z.string().optional(),
  legalNotes: z.string().optional(),
  seasonNotes: z.string().optional(),
  sourceUrls: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Destination = z.infer<typeof destinationSchema>;

export const venueSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  destinationId: z.string(),
  name: z.string(),
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  capacity: z.number().optional(),
  rentalFee: z.number().optional(),
  fbMinimum: z.number().optional(),
  perGuestCost: z.number().optional(),
  inHouseCatering: z.boolean().optional(),
  lodgingOnSite: z.boolean().optional(),
  styleNotes: z.string().optional(),
  availabilityNotes: z.string().optional(),
  status: venueStatusSchema,
  sourceUrls: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Venue = z.infer<typeof venueSchema>;

export const scenarioSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  name: z.string(),
  destinationId: z.string().optional(),
  venueId: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  guestAssumption: z.number(),
  attendanceRate: z.number().min(0).max(1),
  fixedCosts: z.number(),
  perGuestCost: z.number(),
  travelCostPerGuest: z.number(),
  notes: z.string().optional(),
  pinned: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Scenario = z.infer<typeof scenarioSchema>;

/** Derived scenario numbers, never stored. */
export function scenarioMath(scenario: Scenario) {
  const expectedGuests = Math.round(scenario.guestAssumption * scenario.attendanceRate);
  const totalCost = scenario.fixedCosts + scenario.perGuestCost * expectedGuests;
  const costPerGuest = expectedGuests > 0 ? totalCost / expectedGuests : 0;
  const guestTravelBurden = scenario.travelCostPerGuest * expectedGuests;
  return { expectedGuests, totalCost, costPerGuest, guestTravelBurden };
}

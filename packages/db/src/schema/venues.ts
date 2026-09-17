import { boolean, integer, numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { destinations } from "./destinations";
import { weddings } from "./weddings";

export const venueStatusValues = [
  "idea",
  "contacted",
  "awaiting",
  "replied",
  "quoted",
  "touring",
  "negotiating",
  "booked",
  "declined",
] as const;
export type VenueStatus = (typeof venueStatusValues)[number];

export const venues = pgTable("venues", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  destinationId: uuid("destination_id")
    .notNull()
    .references(() => destinations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  website: text("website"),
  email: text("email"),
  phone: text("phone"),
  capacity: integer("capacity"),
  rentalFee: numeric("rental_fee"),
  fbMinimum: numeric("fb_minimum"),
  perGuestCost: numeric("per_guest_cost"),
  inHouseCatering: boolean("in_house_catering"),
  lodgingOnSite: boolean("lodging_on_site"),
  styleNotes: text("style_notes"),
  availabilityNotes: text("availability_notes"),
  status: text("status").$type<VenueStatus>().notNull().default("idea"),
  sourceUrls: text("source_urls").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Venue = typeof venues.$inferSelect;
export type NewVenue = typeof venues.$inferInsert;

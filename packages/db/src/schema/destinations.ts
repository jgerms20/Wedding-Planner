import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export const destinations = pgTable("destinations", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region"),
  notes: text("notes"),
  travelCostPerGuestEstimate: numeric("travel_cost_per_guest_estimate"),
  lodgingPerNightEstimate: numeric("lodging_per_night_estimate"),
  attendanceRateEstimate: numeric("attendance_rate_estimate"),
  weatherNotes: text("weather_notes"),
  legalNotes: text("legal_notes"),
  seasonNotes: text("season_notes"),
  sourceUrls: text("source_urls").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Destination = typeof destinations.$inferSelect;
export type NewDestination = typeof destinations.$inferInsert;

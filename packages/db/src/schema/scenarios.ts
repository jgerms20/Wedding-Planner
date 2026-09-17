import { boolean, date, integer, numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { destinations } from "./destinations";
import { venues } from "./venues";
import { weddings } from "./weddings";

export const scenarios = pgTable("scenarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  destinationId: uuid("destination_id").references(() => destinations.id, { onDelete: "set null" }),
  venueId: uuid("venue_id").references(() => venues.id, { onDelete: "set null" }),
  dateStart: date("date_start"),
  dateEnd: date("date_end"),
  guestAssumption: integer("guest_assumption").notNull().default(0),
  attendanceRate: numeric("attendance_rate").notNull().default("1"),
  fixedCosts: numeric("fixed_costs").notNull().default("0"),
  perGuestCost: numeric("per_guest_cost").notNull().default("0"),
  travelCostPerGuest: numeric("travel_cost_per_guest").notNull().default("0"),
  notes: text("notes"),
  pinned: boolean("pinned").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Scenario = typeof scenarios.$inferSelect;
export type NewScenario = typeof scenarios.$inferInsert;

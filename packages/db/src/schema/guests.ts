import { boolean, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { households, type Side } from "./households";
import { weddings } from "./weddings";

export const tierValues = ["must", "should", "nice"] as const;
export type Tier = (typeof tierValues)[number];

export type RsvpStatus = "pending" | "yes" | "no";

export const guests = pgTable("guests", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  householdId: uuid("household_id").references(() => households.id, { onDelete: "set null" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  side: text("side").$type<Side>().notNull().default("both"),
  tier: text("tier").$type<Tier>().notNull().default("should"),
  relationship: text("relationship"),
  plusOne: boolean("plus_one").notNull().default(false),
  isChild: boolean("is_child").notNull().default(false),
  dietary: text("dietary"),
  homeCity: text("home_city"),
  tags: text("tags").array().notNull().default([]),
  // Keyed by sub-event id or the literal "wedding".
  rsvp: jsonb("rsvp").$type<Record<string, RsvpStatus>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;

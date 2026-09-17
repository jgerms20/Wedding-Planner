import { boolean, date, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const dateFlexibilityValues = ["fixed", "month", "season", "open"] as const;
export type DateFlexibility = (typeof dateFlexibilityValues)[number];

export interface PartnerInfo {
  name: string;
  pronouns?: string;
}

export const weddings = pgTable("weddings", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  partnerA: jsonb("partner_a").$type<PartnerInfo>().notNull().default({} as PartnerInfo),
  partnerB: jsonb("partner_b").$type<PartnerInfo>().notNull().default({} as PartnerInfo),
  targetDate: date("target_date"),
  dateFlexibility: text("date_flexibility").$type<DateFlexibility>().notNull().default("open"),
  targetSeason: text("target_season"),
  locationText: text("location_text"),
  styleNotes: text("style_notes"),
  guestTarget: integer("guest_target"),
  isDestination: boolean("is_destination").notNull().default(false),
  // References scenarios(id); the FK constraint is added after the
  // scenarios table exists (see migrations/0000_foundation.sql).
  activeScenarioId: uuid("active_scenario_id"),
  createdBy: uuid("created_by").references(() => profiles.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Wedding = typeof weddings.$inferSelect;
export type NewWedding = typeof weddings.$inferInsert;

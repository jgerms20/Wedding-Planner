import { integer, jsonb, pgTable, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export interface Anchor {
  id: string;
  kind: "engagement_party" | "save_the_dates" | "invitations" | "custom";
  title: string;
  date?: string;
  reveals: ("date" | "destination" | "wedding_party")[];
  notes?: string;
}

export interface TravelWindow {
  id: string;
  label: string;
  start: string;
  end: string;
  location: string;
}

export interface PlanConfig {
  anchors: Anchor[];
  travelWindows: TravelWindow[];
  saveTheDatesMonthsBefore: number;
  invitationsMonthsBefore: number;
  rsvpDeadlineMonthsBefore: number;
  overrides: Record<string, { monthsBefore?: number; skipped?: boolean }>;
}

export const weddingSettings = pgTable("wedding_settings", {
  weddingId: uuid("wedding_id")
    .primaryKey()
    .references(() => weddings.id, { onDelete: "cascade" }),
  autonomy: jsonb("autonomy").$type<Record<string, 0 | 1 | 2 | 3>>().notNull().default({}),
  notifications: jsonb("notifications").$type<Record<string, boolean>>().notNull().default({}),
  monthlyCostCapCents: integer("monthly_cost_cap_cents").notNull().default(5000),
  planConfig: jsonb("plan_config").$type<PlanConfig>().notNull().default({
    anchors: [],
    travelWindows: [],
    saveTheDatesMonthsBefore: 9,
    invitationsMonthsBefore: 3,
    rsvpDeadlineMonthsBefore: 1,
    overrides: {},
  }),
});

export type WeddingSettings = typeof weddingSettings.$inferSelect;
export type NewWeddingSettings = typeof weddingSettings.$inferInsert;

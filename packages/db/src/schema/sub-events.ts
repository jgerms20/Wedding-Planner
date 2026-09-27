import { date, integer, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export const subEventKindValues = [
  "engagement_party",
  "bridal_shower",
  "couples_shower",
  "groom_shower",
  "bachelor",
  "bachelorette",
  "joint_bachelor_bachelorette",
  "premarital_counseling",
  "rehearsal_dinner",
  "welcome_party",
  "after_party",
  "brunch",
  "second_reception",
  "sangeet",
  "henna_night",
  "tea_ceremony",
  "engagement_photoshoot",
  "bridal_party_proposal",
  "tasting",
  "dress_shopping",
  "suit_fitting",
  "stock_the_bar_party",
  "bridesmaids_luncheon",
  "group_excursion",
  "day_after_pool_party",
  "farewell_dinner",
  "honeymoon",
  "other",
] as const;
export type SubEventKind = (typeof subEventKindValues)[number];

export const subEvents = pgTable("sub_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  kind: text("kind").$type<SubEventKind>().notNull(),
  title: text("title").notNull(),
  date: date("date"),
  location: text("location"),
  hostName: text("host_name"),
  budgetEstimate: numeric("budget_estimate"),
  notes: text("notes"),
  guestRule: text("guest_rule"),
  sortOrder: integer("sort_order"),
});

export type SubEvent = typeof subEvents.$inferSelect;
export type NewSubEvent = typeof subEvents.$inferInsert;

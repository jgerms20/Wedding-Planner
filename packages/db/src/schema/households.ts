import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export const sideValues = ["a", "b", "both"] as const;
export type Side = (typeof sideValues)[number];

export const households = pgTable("households", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  side: text("side").$type<Side>().notNull().default("both"),
  addressText: text("address_text"),
  homeCity: text("home_city"),
  notes: text("notes"),
});

export type Household = typeof households.$inferSelect;
export type NewHousehold = typeof households.$inferInsert;

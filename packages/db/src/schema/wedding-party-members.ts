import { boolean, date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import type { Side } from "./households";
import { weddings } from "./weddings";

export const weddingPartyMembers = pgTable("wedding_party_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  side: text("side").$type<Side>().notNull().default("both"),
  asked: boolean("asked").notNull().default(false),
  askedDate: date("asked_date"),
  contact: text("contact"),
  notes: text("notes"),
});

export type WeddingPartyMember = typeof weddingPartyMembers.$inferSelect;
export type NewWeddingPartyMember = typeof weddingPartyMembers.$inferInsert;

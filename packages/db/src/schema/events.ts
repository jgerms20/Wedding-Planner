import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export const eventKindValues = ["anchor", "deadline", "tour", "travel", "sub_event", "other"] as const;
export type EventKind = (typeof eventKindValues)[number];

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  allDay: boolean("all_day").notNull().default(false),
  kind: text("kind").$type<EventKind>().notNull(),
  linkedType: text("linked_type"),
  linkedId: uuid("linked_id"),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

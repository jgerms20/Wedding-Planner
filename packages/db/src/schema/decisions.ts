import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { weddings } from "./weddings";

export const decisionSourceValues = ["chat", "approval", "manual"] as const;
export type DecisionSource = (typeof decisionSourceValues)[number];

export const decisions = pgTable("decisions", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  detail: text("detail"),
  decidedAt: timestamp("decided_at", { withTimezone: true }).notNull().defaultNow(),
  decidedBy: uuid("decided_by").references(() => profiles.id),
  source: text("source").$type<DecisionSource>().notNull().default("manual"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Decision = typeof decisions.$inferSelect;
export type NewDecision = typeof decisions.$inferInsert;

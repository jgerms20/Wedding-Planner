import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export const phaseKeyValues = [
  "just_engaged",
  "foundation",
  "core_vendors",
  "communications",
  "details",
  "final_stretch",
  "wedding_weekend",
  "after",
] as const;
export type PhaseKey = (typeof phaseKeyValues)[number];

export const taskStatusValues = ["todo", "doing", "done", "skipped"] as const;
export type TaskStatus = (typeof taskStatusValues)[number];

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  templateId: text("template_id"),
  title: text("title").notNull(),
  description: text("description"),
  phase: text("phase").$type<PhaseKey>().notNull(),
  dueDate: date("due_date"),
  status: text("status").$type<TaskStatus>().notNull().default("todo"),
  tags: text("tags").array().notNull().default([]),
  dependsOn: uuid("depends_on").array().notNull().default([]),
  sourceAgent: text("source_agent"),
  windowId: uuid("window_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

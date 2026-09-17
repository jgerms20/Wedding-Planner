import { date, numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { budgetCategories } from "./budget-categories";
import { venues } from "./venues";
import { weddings } from "./weddings";

export const budgetItems = pgTable("budget_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => budgetCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  estimate: numeric("estimate"),
  quoted: numeric("quoted"),
  contracted: numeric("contracted"),
  paid: numeric("paid"),
  venueId: uuid("venue_id").references(() => venues.id, { onDelete: "set null" }),
  dueDate: date("due_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type BudgetItem = typeof budgetItems.$inferSelect;
export type NewBudgetItem = typeof budgetItems.$inferInsert;

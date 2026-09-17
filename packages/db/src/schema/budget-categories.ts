import { integer, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { weddings } from "./weddings";

export const budgetCategories = pgTable("budget_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  weddingId: uuid("wedding_id")
    .notNull()
    .references(() => weddings.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  targetPercent: numeric("target_percent"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type BudgetCategory = typeof budgetCategories.$inferSelect;
export type NewBudgetCategory = typeof budgetCategories.$inferInsert;

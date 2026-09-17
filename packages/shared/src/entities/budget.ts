import { z } from "zod";

export const budgetCategorySchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  name: z.string(),
  targetPercent: z.number().optional(),
  sortOrder: z.number(),
});
export type BudgetCategory = z.infer<typeof budgetCategorySchema>;

export const budgetItemSchema = z.object({
  id: z.string(),
  weddingId: z.string(),
  categoryId: z.string(),
  name: z.string(),
  estimate: z.number().optional(),
  quoted: z.number().optional(),
  contracted: z.number().optional(),
  paid: z.number().optional(),
  venueId: z.string().optional(),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BudgetItem = z.infer<typeof budgetItemSchema>;

/** Typical category split, used to seed a fresh wedding's budget categories. */
export const DEFAULT_BUDGET_CATEGORIES: Array<{ name: string; targetPercent: number }> = [
  { name: "Venue & catering", targetPercent: 45 },
  { name: "Photo & video", targetPercent: 12 },
  { name: "Attire", targetPercent: 7 },
  { name: "Flowers & decor", targetPercent: 9 },
  { name: "Music", targetPercent: 7 },
  { name: "Stationery", targetPercent: 3 },
  { name: "Cake", targetPercent: 2 },
  { name: "Transport", targetPercent: 2 },
  { name: "Rings", targetPercent: 3 },
  { name: "Planner", targetPercent: 5 },
  { name: "Gifts & favors", targetPercent: 2 },
  { name: "Contingency", targetPercent: 3 },
];

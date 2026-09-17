import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Mirrors `auth.users.id` on Supabase (and the local `auth.users` stub the
 * migration creates when the `auth` schema doesn't already exist).
 */
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  displayName: text("display_name"),
  pronouns: text("pronouns"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

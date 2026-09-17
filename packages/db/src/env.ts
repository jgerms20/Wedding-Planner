import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";

/**
 * Loads `.env` from the monorepo root (if present) without overriding
 * variables already set in the environment, then returns `DATABASE_URL`.
 * Throws with a clear message if it's missing.
 */
export function loadDatabaseUrl(): string {
  const rootEnvPath = resolve(import.meta.dirname, "../../../.env");
  if (existsSync(rootEnvPath)) {
    loadDotenv({ path: rootEnvPath });
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Start a local Postgres with `packages/db/scripts/local-pg.sh start` " +
        "and export the DATABASE_URL it prints, or set it in a root .env file (see .env.example).",
    );
  }
  return url;
}

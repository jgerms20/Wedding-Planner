import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { buildSetupSql, SETUP_SQL_PATH } from "../src/setup-sql";

describe("supabase-setup.sql", () => {
  it("matches the migrations (run `pnpm --filter @bower/db setup-sql` if this fails)", async () => {
    expect(await readFile(SETUP_SQL_PATH, "utf8")).toBe(await buildSetupSql());
  });
});

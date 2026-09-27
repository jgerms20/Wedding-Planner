import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MIGRATIONS_DIR = resolve(import.meta.dirname, "../migrations");
export const SETUP_SQL_PATH = resolve(import.meta.dirname, "../supabase-setup.sql");

const HEADER = `-- supabase-setup.sql — GENERATED, do not edit by hand.
-- Run \`pnpm --filter @bower/db setup-sql\` after changing any migration.
--
-- Every migration in packages/db/migrations, in order, as one file to paste
-- into a Supabase project's SQL Editor (Run once; safe to run again). This
-- is how shared mode gets its tables without the database password ever
-- leaving the Supabase dashboard.
`;

/** All migrations concatenated in filename order, with a header. */
export async function buildSetupSql(): Promise<string> {
  const names = (await readdir(MIGRATIONS_DIR)).filter((n) => n.endsWith(".sql")).sort();
  const parts = await Promise.all(
    names.map(async (name) => {
      const sql = await readFile(resolve(MIGRATIONS_DIR, name), "utf8");
      return `\n-- ${"=".repeat(76)}\n-- ${name}\n-- ${"=".repeat(76)}\n\n${sql.trimEnd()}\n`;
    }),
  );
  return HEADER + parts.join("");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeFile(SETUP_SQL_PATH, await buildSetupSql());
  console.log(`wrote ${SETUP_SQL_PATH}`);
}

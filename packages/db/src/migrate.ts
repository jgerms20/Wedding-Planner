import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";
import { loadDatabaseUrl } from "./env";

const MIGRATIONS_DIR = resolve(import.meta.dirname, "../migrations");
const TRACKING_TABLE = "_bower_migrations";

interface MigrationFile {
  name: string;
  sql: string;
  checksum: string;
}

async function loadMigrationFiles(): Promise<MigrationFile[]> {
  const entries = await readdir(MIGRATIONS_DIR);
  const sqlFiles = entries.filter((name) => name.endsWith(".sql")).sort();
  return Promise.all(
    sqlFiles.map(async (name) => {
      const sql = await readFile(resolve(MIGRATIONS_DIR, name), "utf8");
      const checksum = createHash("sha256").update(sql).digest("hex");
      return { name, sql, checksum };
    }),
  );
}

/**
 * Applies every `.sql` file in `packages/db/migrations` that has not yet
 * been recorded in `_bower_migrations`, in filename order, each inside its
 * own transaction. Every migration file is itself written to be safe to
 * re-run (CREATE ... IF NOT EXISTS / CREATE OR REPLACE / guarded DO
 * blocks), so this is idempotent even against a database this runner has
 * never tracked before.
 */
export async function runMigrations(connectionString: string): Promise<{ applied: string[] }> {
  const client = new Client({ connectionString });
  await client.connect();
  const applied: string[] = [];

  try {
    await client.query(`
      create table if not exists public.${TRACKING_TABLE} (
        name text primary key,
        checksum text not null,
        applied_at timestamptz not null default now()
      )
    `);

    const files = await loadMigrationFiles();
    const { rows } = await client.query<{ name: string; checksum: string }>(
      `select name, checksum from public.${TRACKING_TABLE}`,
    );
    const appliedByName = new Map(rows.map((row) => [row.name, row.checksum]));

    for (const file of files) {
      const previousChecksum = appliedByName.get(file.name);
      if (previousChecksum) {
        if (previousChecksum !== file.checksum) {
          throw new Error(
            `Migration ${file.name} has already been applied but its contents changed since then. ` +
              "Add a new migration file instead of editing an applied one.",
          );
        }
        continue;
      }

      await client.query("begin");
      try {
        await client.query(file.sql);
        await client.query(`insert into public.${TRACKING_TABLE} (name, checksum) values ($1, $2)`, [
          file.name,
          file.checksum,
        ]);
        await client.query("commit");
        applied.push(file.name);
      } catch (err) {
        await client.query("rollback");
        throw new Error(`Migration ${file.name} failed: ${(err as Error).message}`, { cause: err });
      }
    }

    return { applied };
  } finally {
    await client.end();
  }
}

const isMain = process.argv[1] !== undefined && fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isMain) {
  const databaseUrl = loadDatabaseUrl();
  const { applied } = await runMigrations(databaseUrl);
  if (applied.length === 0) {
    console.log("db:migrate: already up to date, nothing to apply.");
  } else {
    console.log(`db:migrate: applied ${applied.length} migration(s): ${applied.join(", ")}`);
  }
}

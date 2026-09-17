import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";
import * as schema from "./schema/index";

export * as schema from "./schema/index";
export type Schema = typeof schema;
export type Db = NodePgDatabase<Schema> & { $client: Pool };

/**
 * Creates a Drizzle client (backed by a `pg` Pool) for the given Postgres
 * connection string. Callers own the returned pool's lifecycle: call
 * `.$client.end()` (or keep a reference to the pool yourself) when done,
 * e.g. in tests or short-lived scripts.
 */
export function createDb(connectionString: string, poolConfig: Omit<PoolConfig, "connectionString"> = {}): Db {
  const pool = new Pool({ connectionString, ...poolConfig });
  return drizzle(pool, { schema });
}

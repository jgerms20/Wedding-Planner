/**
 * RLS isolation suite.
 *
 * Connects to a real Postgres (see packages/db/README.md for how to start
 * one locally), applies the migration, creates two weddings each with one
 * owner, seeds one row per tenant table for each wedding, then asserts —
 * acting as an ordinary `authenticated` Postgres role with only
 * `request.jwt.claim.sub` set (no superuser, no table ownership) — that:
 *
 *   1. each owner's SELECT only ever returns their own wedding's rows;
 *   2. each owner CAN insert into their own wedding (positive control —
 *      without this, a suite that always denies everything would still
 *      pass, and no policy is actually protecting anything);
 *   3. each owner CANNOT insert into the other wedding;
 *   4. the run/event/cost-ledger tables are read-only for members (no
 *      owner-write policy at all — only the worker's service_role writes
 *      them, and that role bypasses RLS entirely).
 *
 * This does not skip: DATABASE_URL must point at a reachable Postgres.
 * See packages/db/scripts/local-pg.sh to start one without Docker.
 */
import { randomUUID } from "node:crypto";
import { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { runMigrations } from "../src/migrate";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Start a local Postgres first: " +
      "`packages/db/scripts/local-pg.sh start` and export the DATABASE_URL it prints.",
  );
}

const TEST_LOGIN_ROLE = "bower_rls_test_client";

/** One row per tenant table, keyed by wedding, built in dependency order. */
interface WeddingFixture {
  id: string;
  ownerId: string;
  destinationId: string;
  venueId: string;
  categoryId: string;
  householdId: string;
  runId: string;
}

// superuser/table-owner connection: bypasses RLS, used for setup + as the
// "ground truth" oracle for how many rows actually exist.
const admin = new Client({ connectionString: DATABASE_URL });

// Two ordinary sessions, each connecting as a dedicated login role (not
// the admin/table-owner role) that will `SET ROLE authenticated` below —
// this is what actually makes RLS apply to their queries.
// The login role gets a password so this works under SCRAM (CI's postgres
// service) as well as trust auth (the local helper script).
const TEST_LOGIN_PASSWORD = "bower-rls-test";
const testClientUrl = new URL(DATABASE_URL);
testClientUrl.username = TEST_LOGIN_ROLE;
testClientUrl.password = TEST_LOGIN_PASSWORD;
const asOwner1 = new Client({ connectionString: testClientUrl.toString() });
const asOwner2 = new Client({ connectionString: testClientUrl.toString() });

let wedding1: WeddingFixture;
let wedding2: WeddingFixture;

async function actAs(client: Client, userId: string) {
  await client.query("set role authenticated");
  await client.query("select set_config('request.jwt.claim.sub', $1, false)", [userId]);
}

async function createWeddingFixture(slug: string, ownerEmail: string): Promise<WeddingFixture> {
  const ownerId = randomUUID();
  // Inserting into auth.users fires the on_auth_user_created trigger,
  // which already creates the matching profiles row.
  await admin.query("insert into auth.users (id, email) values ($1, $2)", [ownerId, ownerEmail]);
  await admin.query("update public.profiles set display_name = $2 where id = $1", [ownerId, slug]);

  const {
    rows: [wedding],
  } = await admin.query<{ id: string }>(
    `insert into public.weddings (slug, partner_a, partner_b, created_by)
     values ($1, '{"name":"A"}', '{"name":"B"}', $2) returning id`,
    [slug, ownerId],
  );
  if (!wedding) throw new Error("fixture: failed to create wedding");
  const weddingId = wedding.id;

  await admin.query(
    `insert into public.wedding_members (wedding_id, user_id, role, accepted_at) values ($1, $2, 'owner', now())`,
    [weddingId, ownerId],
  );
  await admin.query(`insert into public.wedding_settings (wedding_id) values ($1)`, [weddingId]);
  await admin.query(
    `insert into public.wedding_invites (wedding_id, email, token, expires_at)
     values ($1, $2, $3, now() + interval '1 day')`,
    [weddingId, `invite-${slug}@example.com`, randomUUID()],
  );
  await admin.query(`insert into public.tasks (wedding_id, title, phase) values ($1, 'Fixture task', 'foundation')`, [
    weddingId,
  ]);
  await admin.query(
    `insert into public.events (wedding_id, title, starts_at, kind) values ($1, 'Fixture event', now(), 'other')`,
    [weddingId],
  );
  await admin.query(`insert into public.pending_approvals (wedding_id, action_type) values ($1, 'create_task')`, [
    weddingId,
  ]);
  await admin.query(`insert into public.decisions (wedding_id, title) values ($1, 'Fixture decision')`, [weddingId]);
  await admin.query(`insert into public.sub_events (wedding_id, kind, title) values ($1, 'other', 'Fixture sub event')`, [
    weddingId,
  ]);
  await admin.query(
    `insert into public.wedding_party_members (wedding_id, name, role) values ($1, 'Fixture Friend', 'best_man')`,
    [weddingId],
  );
  await admin.query(`insert into public.scenarios (wedding_id, name) values ($1, 'Fixture scenario')`, [weddingId]);
  await admin.query(`insert into public.guests (wedding_id, first_name) values ($1, 'Fixture Guest')`, [weddingId]);

  const {
    rows: [destination],
  } = await admin.query<{ id: string }>(
    `insert into public.destinations (wedding_id, name, country) values ($1, 'Fixtureland', 'USA') returning id`,
    [weddingId],
  );
  if (!destination) throw new Error("fixture: failed to create destination");

  const {
    rows: [venue],
  } = await admin.query<{ id: string }>(
    `insert into public.venues (wedding_id, destination_id, name) values ($1, $2, 'Fixture Venue') returning id`,
    [weddingId, destination.id],
  );
  if (!venue) throw new Error("fixture: failed to create venue");

  const {
    rows: [category],
  } = await admin.query<{ id: string }>(
    `insert into public.budget_categories (wedding_id, name) values ($1, 'Fixture Category') returning id`,
    [weddingId],
  );
  if (!category) throw new Error("fixture: failed to create budget category");
  await admin.query(`insert into public.budget_items (wedding_id, category_id, name) values ($1, $2, 'Fixture Item')`, [
    weddingId,
    category.id,
  ]);

  const {
    rows: [household],
  } = await admin.query<{ id: string }>(
    `insert into public.households (wedding_id, name) values ($1, 'Fixture Household') returning id`,
    [weddingId],
  );
  if (!household) throw new Error("fixture: failed to create household");

  const {
    rows: [run],
  } = await admin.query<{ id: string }>(
    `insert into public.agent_runs (wedding_id, agent, trigger) values ($1, 'hello', 'manual') returning id`,
    [weddingId],
  );
  if (!run) throw new Error("fixture: failed to create agent run");
  await admin.query(`insert into public.agent_events (run_id, wedding_id, seq, kind) values ($1, $2, 1, 'text')`, [
    run.id,
    weddingId,
  ]);
  await admin.query(`insert into public.cost_ledger (wedding_id, run_id, model) values ($1, $2, 'claude-opus-5')`, [
    weddingId,
    run.id,
  ]);

  return {
    id: weddingId,
    ownerId,
    destinationId: destination.id,
    venueId: venue.id,
    categoryId: category.id,
    householdId: household.id,
    runId: run.id,
  };
}

beforeAll(async () => {
  await runMigrations(DATABASE_URL);
  await admin.connect();

  await admin.query(`
    do $$
    begin
      if not exists (select 1 from pg_roles where rolname = '${TEST_LOGIN_ROLE}') then
        create role ${TEST_LOGIN_ROLE} login password '${TEST_LOGIN_PASSWORD}';
      end if;
    end
    $$;
  `);
  await admin.query(`alter role ${TEST_LOGIN_ROLE} with password '${TEST_LOGIN_PASSWORD}'`);
  await admin.query(`grant authenticated to ${TEST_LOGIN_ROLE}`);

  wedding1 = await createWeddingFixture(`rls-test-${randomUUID()}`, "owner1@example.com");
  wedding2 = await createWeddingFixture(`rls-test-${randomUUID()}`, "owner2@example.com");

  await asOwner1.connect();
  await actAs(asOwner1, wedding1.ownerId);

  await asOwner2.connect();
  await actAs(asOwner2, wedding2.ownerId);
}, 30_000);

afterAll(async () => {
  await asOwner1.end().catch(() => {});
  await asOwner2.end().catch(() => {});
  if (wedding1) await admin.query("delete from public.weddings where id = $1", [wedding1.id]);
  if (wedding2) await admin.query("delete from public.weddings where id = $1", [wedding2.id]);
  if (wedding1) await admin.query("delete from public.profiles where id = $1", [wedding1.ownerId]);
  if (wedding2) await admin.query("delete from public.profiles where id = $1", [wedding2.ownerId]);
  if (wedding1) await admin.query("delete from auth.users where id = $1", [wedding1.ownerId]);
  if (wedding2) await admin.query("delete from auth.users where id = $1", [wedding2.ownerId]);
  await admin.end();
});

/** Tables scoped by a plain `wedding_id` column, with an owner-write policy. */
const MEMBER_WRITE_TABLES = [
  "wedding_invites",
  "wedding_settings",
  "tasks",
  "events",
  "pending_approvals",
  "destinations",
  "venues",
  "scenarios",
  "households",
  "guests",
  "budget_categories",
  "budget_items",
  "sub_events",
  "wedding_party_members",
  "decisions",
] as const;

/** Read-only for members: only the worker (service_role) writes these. */
const MEMBER_READONLY_TABLES = ["agent_runs", "agent_events", "cost_ledger"] as const;

describe("RLS isolation", () => {
  it.each(MEMBER_WRITE_TABLES)("%s: each owner sees only their own wedding's rows", async (table) => {
    const { rows: ownRows } = await asOwner1.query<{ wedding_id: string }>(
      `select wedding_id from public.${table}`,
    );
    expect(ownRows.length).toBeGreaterThan(0);
    expect(ownRows.every((r) => r.wedding_id === wedding1.id)).toBe(true);

    const { rows: crossRows } = await asOwner1.query(`select 1 from public.${table} where wedding_id = $1`, [
      wedding2.id,
    ]);
    expect(crossRows).toHaveLength(0);

    // Sanity check against the admin connection: the other wedding's row
    // really does exist — it's hidden by RLS, not just absent.
    const { rows: adminRows } = await admin.query(`select 1 from public.${table} where wedding_id = $1`, [
      wedding2.id,
    ]);
    expect(adminRows.length).toBeGreaterThan(0);
  });

  it.each(MEMBER_READONLY_TABLES)("%s: members can select but never write (worker-only)", async (table) => {
    const { rows: ownRows } = await asOwner1.query<{ wedding_id: string }>(
      `select wedding_id from public.${table}`,
    );
    expect(ownRows.length).toBeGreaterThan(0);
    expect(ownRows.every((r) => r.wedding_id === wedding1.id)).toBe(true);

    const { rows: crossRows } = await asOwner1.query(`select 1 from public.${table} where wedding_id = $1`, [
      wedding2.id,
    ]);
    expect(crossRows).toHaveLength(0);
  });

  it("weddings: each owner sees only their own wedding row", async () => {
    const { rows } = await asOwner1.query<{ id: string }>("select id from public.weddings");
    expect(rows.map((r) => r.id)).toEqual([wedding1.id]);
  });

  it("weddings: an owner cannot update the other wedding", async () => {
    await expect(
      asOwner1.query("update public.weddings set style_notes = 'hijacked' where id = $1", [wedding2.id]),
    ).resolves.toMatchObject({ rowCount: 0 });

    const { rows } = await admin.query<{ style_notes: string | null }>(
      "select style_notes from public.weddings where id = $1",
      [wedding2.id],
    );
    expect(rows[0]?.style_notes).not.toBe("hijacked");
  });

  it("tasks: an owner can insert into their own wedding", async () => {
    const { rows } = await asOwner1.query<{ id: string }>(
      `insert into public.tasks (wedding_id, title, phase) values ($1, 'Owned insert', 'core_vendors') returning id`,
      [wedding1.id],
    );
    expect(rows).toHaveLength(1);
  });

  it("tasks: an owner cannot insert into the other wedding", async () => {
    await expect(
      asOwner1.query(`insert into public.tasks (wedding_id, title, phase) values ($1, 'Hostile insert', 'foundation')`, [
        wedding2.id,
      ]),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("destinations: an owner cannot insert into the other wedding", async () => {
    await expect(
      asOwner1.query(`insert into public.destinations (wedding_id, name, country) values ($1, 'Hostile', 'USA')`, [
        wedding2.id,
      ]),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("venues: an owner cannot insert into the other wedding (even reusing its own destination)", async () => {
    await expect(
      asOwner1.query(`insert into public.venues (wedding_id, destination_id, name) values ($1, $2, 'Hostile venue')`, [
        wedding2.id,
        wedding2.destinationId,
      ]),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("budget_items: an owner cannot insert into the other wedding", async () => {
    await expect(
      asOwner1.query(
        `insert into public.budget_items (wedding_id, category_id, name) values ($1, $2, 'Hostile item')`,
        [wedding2.id, wedding2.categoryId],
      ),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("wedding_members: an owner cannot add themselves to the other wedding", async () => {
    await expect(
      asOwner1.query(`insert into public.wedding_members (wedding_id, user_id, role) values ($1, $2, 'owner')`, [
        wedding2.id,
        wedding1.ownerId,
      ]),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("agent_runs: a member cannot write even into their own wedding", async () => {
    await expect(
      asOwner1.query(`insert into public.agent_runs (wedding_id, agent, trigger) values ($1, 'hello', 'manual')`, [
        wedding1.id,
      ]),
    ).rejects.toMatchObject({ code: "42501" });
  });

  it("owner 2's session independently sees only wedding 2", async () => {
    const { rows } = await asOwner2.query<{ id: string }>("select id from public.tasks where wedding_id = $1", [
      wedding1.id,
    ]);
    expect(rows).toHaveLength(0);

    const { rows: own } = await asOwner2.query<{ id: string }>("select id from public.tasks where wedding_id = $1", [
      wedding2.id,
    ]);
    expect(own.length).toBeGreaterThan(0);
  });
});

-- 0000_foundation.sql
--
-- Foundation schema for Bower: profiles, weddings, membership, tasks,
-- events, the agent-run/approval/cost-ledger tables, plus the Phase 0a
-- entity tables (destinations, venues, scenarios, households, guests,
-- budget, sub events, wedding party, decisions).
--
-- Written to run unchanged on both a bare local Postgres 16 (no Supabase
-- extensions) and a real Supabase project:
--   * `auth` schema / `auth.uid()` / roles (`anon`, `authenticated`,
--     `service_role`) are stubbed in only when they do not already exist.
--   * every statement is safe to re-run (CREATE ... IF NOT EXISTS,
--     CREATE OR REPLACE, DROP POLICY IF EXISTS + CREATE POLICY, guarded
--     DO blocks for constraints/publications), and `src/migrate.ts`
--     additionally tracks applied migrations so this file only executes
--     once per database in the normal case.
--
-- Column names are snake_case; JSON fields are jsonb; arrays are
-- text[]/uuid[]; timestamps are timestamptz default now(). Mirrors
-- docs/specs/entities.md and docs/specs/phase-0-foundation.md exactly;
-- see packages/db/src/schema for the matching Drizzle definitions.

-- ============================================================================
-- 0. Roles + auth stub (local Postgres only; guarded so this is a no-op on
--    Supabase, which already provides all of this).
-- ============================================================================

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin noinherit;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin noinherit;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then
    create role service_role nologin noinherit bypassrls;
  end if;
end
$$;

do $$
begin
  if not exists (select 1 from pg_namespace where nspname = 'auth') then
    create schema auth;

    create table auth.users (
      id uuid primary key default gen_random_uuid(),
      email text,
      raw_user_meta_data jsonb not null default '{}'::jsonb,
      created_at timestamptz not null default now()
    );

    -- Mirrors Supabase's auth.uid(): the JWT "sub" claim of the current
    -- request, made available locally via set_config('request.jwt.claim.sub', ...).
    create function auth.uid() returns uuid
      language sql stable
      as $fn$
        select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
      $fn$;

    grant usage on schema auth to anon, authenticated, service_role;
    grant select on auth.users to anon, authenticated, service_role;
  end if;
end
$$;

grant usage on schema public to anon, authenticated, service_role;

-- ============================================================================
-- 1. profiles
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  pronouns text,
  created_at timestamptz not null default now()
);

-- Creates a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 2. weddings
-- ============================================================================

create table if not exists public.weddings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  partner_a jsonb not null default '{}'::jsonb,
  partner_b jsonb not null default '{}'::jsonb,
  target_date date,
  date_flexibility text not null default 'open'
    check (date_flexibility in ('fixed', 'month', 'season', 'open')),
  target_season text,
  location_text text,
  style_notes text,
  guest_target int,
  is_destination boolean not null default false,
  active_scenario_id uuid,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- 3. wedding_members / wedding_invites / wedding_settings
-- ============================================================================

create table if not exists public.wedding_members (
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  -- only "owner" is issued today; viewer/editor/planner are reserved.
  role text not null default 'owner'
    check (role in ('owner', 'viewer', 'editor', 'planner')),
  invited_email text,
  accepted_at timestamptz,
  primary key (wedding_id, user_id)
);

create table if not exists public.wedding_invites (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  email text not null,
  token text not null unique,
  expires_at timestamptz not null,
  accepted_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table if not exists public.wedding_settings (
  wedding_id uuid primary key references public.weddings (id) on delete cascade,
  autonomy jsonb not null default '{}'::jsonb,
  notifications jsonb not null default '{}'::jsonb,
  monthly_cost_cap_cents int not null default 5000,
  plan_config jsonb not null default '{}'::jsonb
);

-- ============================================================================
-- 4. is_wedding_member / is_wedding_owner
-- ============================================================================

-- Security-definer so it can read wedding_members regardless of the
-- caller's own RLS visibility into that table (avoids recursive policies).
create or replace function public.is_wedding_member(w uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.wedding_members
    where wedding_id = w and user_id = auth.uid()
  );
$$;

create or replace function public.is_wedding_owner(w uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.wedding_members
    where wedding_id = w and user_id = auth.uid() and role = 'owner'
  );
$$;

grant execute on function public.is_wedding_member(uuid) to anon, authenticated, service_role;
grant execute on function public.is_wedding_owner(uuid) to anon, authenticated, service_role;

-- ============================================================================
-- 5. tasks / events
-- ============================================================================

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  template_id text,
  title text not null,
  description text,
  phase text not null check (phase in (
    'just_engaged', 'foundation', 'core_vendors', 'communications',
    'details', 'final_stretch', 'wedding_weekend', 'after'
  )),
  due_date date,
  status text not null default 'todo'
    check (status in ('todo', 'doing', 'done', 'skipped')),
  tags text[] not null default '{}',
  depends_on uuid[] not null default '{}',
  source_agent text,
  window_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  all_day boolean not null default false,
  kind text not null check (kind in (
    'anchor', 'deadline', 'tour', 'travel', 'sub_event', 'other'
  )),
  linked_type text,
  linked_id uuid
);

-- ============================================================================
-- 6. agent runtime: agent_runs / agent_events / pending_approvals / cost_ledger
-- ============================================================================

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  agent text not null,
  trigger text not null,
  status text not null default 'queued'
    check (status in ('queued', 'running', 'awaiting_approval', 'done', 'failed')),
  input jsonb,
  output jsonb,
  transcript jsonb,
  model text,
  input_tokens int,
  output_tokens int,
  cache_read_tokens int,
  cache_write_tokens int,
  cost_cents numeric,
  started_at timestamptz,
  finished_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists public.agent_events (
  id bigserial primary key,
  run_id uuid not null references public.agent_runs (id) on delete cascade,
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  seq int not null,
  kind text not null check (kind in (
    'thinking', 'text', 'tool_call', 'tool_result', 'approval_requested', 'done', 'error'
  )),
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.pending_approvals (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  run_id uuid references public.agent_runs (id) on delete cascade,
  action_type text not null,
  payload jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'executed', 'failed')),
  decided_by uuid references public.profiles (id),
  decided_at timestamptz,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.cost_ledger (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  run_id uuid references public.agent_runs (id) on delete cascade,
  model text not null,
  input_tokens int not null default 0,
  output_tokens int not null default 0,
  cache_read_tokens int not null default 0,
  cache_write_tokens int not null default 0,
  cost_cents numeric not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- 7. Destination-first planning entities (docs/specs/entities.md)
-- ============================================================================

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  name text not null,
  country text not null,
  region text,
  notes text,
  travel_cost_per_guest_estimate numeric,
  lodging_per_night_estimate numeric,
  attendance_rate_estimate numeric,
  weather_notes text,
  legal_notes text,
  season_notes text,
  source_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  destination_id uuid not null references public.destinations (id) on delete cascade,
  name text not null,
  website text,
  email text,
  phone text,
  capacity int,
  rental_fee numeric,
  fb_minimum numeric,
  per_guest_cost numeric,
  in_house_catering boolean,
  lodging_on_site boolean,
  style_notes text,
  availability_notes text,
  status text not null default 'idea' check (status in (
    'idea', 'contacted', 'awaiting', 'replied', 'quoted',
    'touring', 'negotiating', 'booked', 'declined'
  )),
  source_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scenarios (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  name text not null,
  destination_id uuid references public.destinations (id) on delete set null,
  venue_id uuid references public.venues (id) on delete set null,
  date_start date,
  date_end date,
  guest_assumption int not null default 0,
  attendance_rate numeric not null default 1,
  fixed_costs numeric not null default 0,
  per_guest_cost numeric not null default 0,
  travel_cost_per_guest numeric not null default 0,
  notes text,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- weddings.active_scenario_id can only be added now that scenarios exists.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'weddings_active_scenario_id_fkey'
  ) then
    alter table public.weddings
      add constraint weddings_active_scenario_id_fkey
      foreign key (active_scenario_id) references public.scenarios (id) on delete set null;
  end if;
end
$$;

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  name text not null,
  side text not null default 'both' check (side in ('a', 'b', 'both')),
  address_text text,
  home_city text,
  notes text
);

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  household_id uuid references public.households (id) on delete set null,
  first_name text not null,
  last_name text,
  email text,
  phone text,
  side text not null default 'both' check (side in ('a', 'b', 'both')),
  tier text not null default 'should' check (tier in ('must', 'should', 'nice')),
  relationship text,
  plus_one boolean not null default false,
  is_child boolean not null default false,
  dietary text,
  home_city text,
  tags text[] not null default '{}',
  -- keyed by sub-event id or the literal "wedding" -> "pending" | "yes" | "no"
  rsvp jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budget_categories (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  name text not null,
  target_percent numeric,
  sort_order int not null default 0
);

create table if not exists public.budget_items (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  category_id uuid not null references public.budget_categories (id) on delete cascade,
  name text not null,
  estimate numeric,
  quoted numeric,
  contracted numeric,
  paid numeric,
  venue_id uuid references public.venues (id) on delete set null,
  due_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sub_events (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  kind text not null check (kind in (
    'engagement_party', 'bridal_shower', 'couples_shower', 'groom_shower',
    'bachelor', 'bachelorette', 'rehearsal_dinner', 'welcome_party',
    'brunch', 'honeymoon', 'other'
  )),
  title text not null,
  date date,
  location text,
  host_name text,
  budget_estimate numeric,
  notes text,
  guest_rule text
);

create table if not exists public.wedding_party_members (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  name text not null,
  role text not null,
  side text not null default 'both' check (side in ('a', 'b', 'both')),
  asked boolean not null default false,
  asked_date date,
  contact text,
  notes text
);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  title text not null,
  detail text,
  decided_at timestamptz not null default now(),
  decided_by uuid references public.profiles (id),
  source text not null default 'manual' check (source in ('chat', 'approval', 'manual')),
  created_at timestamptz not null default now()
);

-- ============================================================================
-- 8. Indexes on the tenant key (every policy filters by it).
-- ============================================================================

do $$
declare
  t text;
  tenant_tables text[] := array[
    'wedding_members', 'wedding_invites', 'wedding_settings', 'tasks', 'events',
    'agent_runs', 'agent_events', 'pending_approvals', 'cost_ledger',
    'destinations', 'venues', 'scenarios', 'households', 'guests',
    'budget_categories', 'budget_items', 'sub_events', 'wedding_party_members',
    'decisions'
  ];
begin
  foreach t in array tenant_tables loop
    execute format(
      'create index if not exists %I on public.%I (wedding_id)',
      t || '_wedding_id_idx', t
    );
  end loop;
end
$$;

-- ============================================================================
-- 9. Row Level Security
-- ============================================================================

-- profiles: everyone can see/edit only their own row.
alter table public.profiles enable row level security;

drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles
  for select using (id = auth.uid());

drop policy if exists profiles_write_self on public.profiles;
create policy profiles_write_self on public.profiles
  for all using (id = auth.uid()) with check (id = auth.uid());

-- weddings: keyed by its own id rather than a wedding_id column.
alter table public.weddings enable row level security;

drop policy if exists weddings_select on public.weddings;
create policy weddings_select on public.weddings
  for select using (public.is_wedding_member(id));

drop policy if exists weddings_write on public.weddings;
create policy weddings_write on public.weddings
  for all using (public.is_wedding_owner(id)) with check (public.is_wedding_owner(id));

-- Every remaining tenant table: members can select; owners can write.
-- agent_runs / agent_events / cost_ledger are read-only for members (the
-- worker writes them with the service_role key, which bypasses RLS).
do $$
declare
  t text;
  member_write_tables text[] := array[
    'wedding_members', 'wedding_invites', 'wedding_settings', 'tasks', 'events',
    'pending_approvals', 'destinations', 'venues', 'scenarios', 'households',
    'guests', 'budget_categories', 'budget_items', 'sub_events',
    'wedding_party_members', 'decisions'
  ];
  member_readonly_tables text[] := array['agent_runs', 'agent_events', 'cost_ledger'];
begin
  foreach t in array member_write_tables loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t || '_select', t);
    execute format(
      'create policy %I on public.%I for select using (public.is_wedding_member(wedding_id))',
      t || '_select', t
    );
    execute format('drop policy if exists %I on public.%I', t || '_write', t);
    execute format(
      'create policy %I on public.%I for all using (public.is_wedding_owner(wedding_id)) with check (public.is_wedding_owner(wedding_id))',
      t || '_write', t
    );
  end loop;

  foreach t in array member_readonly_tables loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t || '_select', t);
    execute format(
      'create policy %I on public.%I for select using (public.is_wedding_member(wedding_id))',
      t || '_select', t
    );
  end loop;
end
$$;

grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on all tables in schema public to anon;
grant usage, select on all sequences in schema public to authenticated;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

-- ============================================================================
-- 10. Realtime (Supabase only; no-op locally where the publication doesn't exist)
-- ============================================================================

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'agent_events'
    ) then
      alter publication supabase_realtime add table public.agent_events;
    end if;
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'pending_approvals'
    ) then
      alter publication supabase_realtime add table public.pending_approvals;
    end if;
  end if;
end
$$;

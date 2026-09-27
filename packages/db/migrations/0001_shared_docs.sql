-- ============================================================================
-- 0001 — shared documents: one wedding, visible to both partners
-- ============================================================================
--
-- The app's entity shapes (packages/shared/src/entities) have moved faster
-- than the relational tables in 0000, so the shared store keeps each entity
-- as a JSON document keyed by (wedding_id, collection, id). Tenancy is the
-- same as every other table: RLS via is_wedding_member(wedding_id). Hot
-- collections can be promoted to real tables later behind the same
-- WeddingRepo interface without touching the UI.
--
-- Safe to re-run (IF NOT EXISTS / CREATE OR REPLACE / guarded DO blocks).

-- Anyone who signed in before this ran still needs a profile row.
insert into public.profiles (id)
select id from auth.users
on conflict (id) do nothing;

create table if not exists public.wedding_docs (
  wedding_id uuid not null references public.weddings (id) on delete cascade,
  collection text not null,
  id text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid(),
  primary key (wedding_id, collection, id)
);

create index if not exists wedding_docs_collection_idx on public.wedding_docs (wedding_id, collection);

create or replace function public.touch_wedding_doc()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists wedding_docs_touch on public.wedding_docs;
create trigger wedding_docs_touch
  before update on public.wedding_docs
  for each row execute function public.touch_wedding_doc();

-- Both partners are full members: any member reads and writes.
alter table public.wedding_docs enable row level security;

drop policy if exists wedding_docs_select on public.wedding_docs;
create policy wedding_docs_select on public.wedding_docs
  for select using (public.is_wedding_member(wedding_id));

drop policy if exists wedding_docs_insert on public.wedding_docs;
create policy wedding_docs_insert on public.wedding_docs
  for insert with check (public.is_wedding_member(wedding_id));

drop policy if exists wedding_docs_update on public.wedding_docs;
create policy wedding_docs_update on public.wedding_docs
  for update using (public.is_wedding_member(wedding_id)) with check (public.is_wedding_member(wedding_id));

drop policy if exists wedding_docs_delete on public.wedding_docs;
create policy wedding_docs_delete on public.wedding_docs
  for delete using (public.is_wedding_member(wedding_id));

grant select, insert, update, delete on public.wedding_docs to authenticated;
grant all on public.wedding_docs to service_role;

-- ----------------------------------------------------------------------------
-- create_wedding: the first partner to sign in creates the shared wedding and
-- becomes its owner. Security definer because a brand-new user is not a
-- member of anything yet, so no RLS policy would let them insert.
-- ----------------------------------------------------------------------------
create or replace function public.create_wedding(p_id uuid, p_slug text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'sign in first' using errcode = '42501';
  end if;
  insert into public.weddings (id, slug, created_by) values (p_id, p_slug, auth.uid());
  insert into public.wedding_members (wedding_id, user_id, role, accepted_at)
  values (p_id, auth.uid(), 'owner', now());
  insert into public.wedding_settings (wedding_id) values (p_id) on conflict do nothing;
  return p_id;
end;
$$;

-- ----------------------------------------------------------------------------
-- claim_invites: joins the signed-in user to every wedding that invited their
-- (verified, via magic link) email address. Returns the wedding ids joined.
-- ----------------------------------------------------------------------------
create or replace function public.claim_invites()
returns setof uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  if auth.uid() is null then
    return;
  end if;
  select lower(email) into v_email from auth.users where id = auth.uid();
  if v_email is null then
    return;
  end if;

  return query
  with claimed as (
    update public.wedding_invites i
       set accepted_by = auth.uid()
     where lower(i.email) = v_email
       and i.accepted_by is null
       and i.expires_at > now()
    returning i.wedding_id
  ),
  joined as (
    insert into public.wedding_members (wedding_id, user_id, role, invited_email, accepted_at)
    select distinct wedding_id, auth.uid(), 'owner', v_email, now() from claimed
    on conflict (wedding_id, user_id) do nothing
    returning wedding_id
  )
  select wedding_id from claimed;
end;
$$;

revoke all on function public.create_wedding(uuid, text) from public;
revoke all on function public.claim_invites() from public;
grant execute on function public.create_wedding(uuid, text) to authenticated;
grant execute on function public.claim_invites() to authenticated;

-- Members can see who else is in their wedding (the partner's email, for the
-- Settings page). 0000 already scopes wedding_members to members.

-- Realtime: both screens update as the other partner edits.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'wedding_docs'
    ) then
      alter publication supabase_realtime add table public.wedding_docs;
    end if;
  end if;
end
$$;

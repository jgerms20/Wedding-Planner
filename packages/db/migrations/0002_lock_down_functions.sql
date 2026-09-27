-- ============================================================================
-- 0002 — lock down functions (from Supabase's security advisor)
-- ============================================================================
--
-- * Signed-out visitors (anon) can't call the RPCs that create or join a
--   wedding. Each already refused without a user, but they shouldn't be
--   callable at all. Supabase grants EXECUTE to anon by default, so
--   "revoke ... from public" in 0001 wasn't enough.
-- * handle_new_user is a trigger, never an RPC: nobody needs EXECUTE on it.
-- * touch_wedding_doc gets a fixed search_path.
-- is_wedding_member / is_wedding_owner stay callable: every RLS policy calls
-- them as the querying role, and they only ever answer about auth.uid().
--
-- Safe to re-run.

revoke execute on function public.create_wedding(uuid, text) from public, anon;
revoke execute on function public.claim_invites() from public, anon;
grant execute on function public.create_wedding(uuid, text) to authenticated;
grant execute on function public.claim_invites() to authenticated;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

alter function public.touch_wedding_doc() set search_path = '';

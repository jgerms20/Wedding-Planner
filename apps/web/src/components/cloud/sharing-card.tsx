"use client";

import { Check, Clock, LogOut, UserPlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cloudClient } from "@/lib/cloud/client";
import { invitePartner, loadSharingState, type SharingState } from "@/lib/cloud/session";
import { useRepoContext } from "@/lib/repo-context";

/** Settings: who's in this wedding, and inviting the other partner. Shared mode only. */
export function SharingCard() {
  const { cloud, wedding } = useRepoContext();
  const [state, setState] = useState<SharingState | null>(null);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!cloud) return;
    try {
      setState(await loadSharingState(cloudClient(), cloud.weddingId));
    } catch (err) {
      setError((err as Error).message);
    }
  }, [cloud]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  if (!cloud) return null;
  const siteUrl = typeof window === "undefined" ? "" : window.location.origin + window.location.pathname.replace(/\/w\/.*$/, "/");
  const partnerName = wedding?.partnerB.name ?? "your partner";

  return (
    <section className="postcard rise p-6">
      <p className="eyebrow">Shared wedding</p>
      <h2 className="mt-1 text-2xl">You two, one list</h2>
      <p className="mt-2 text-[15px] text-ink-soft">
        Signed in as <strong className="text-foreground">{cloud.email}</strong>.{" "}
        {state && state.memberCount > 1
          ? "You're both in — every heart, guest, and edit shows up on both screens as it happens."
          : `Invite ${partnerName} and you'll both see the same favorites, guests, and plan.`}
      </p>

      <form
        className="mt-4 flex flex-wrap gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!email.trim()) return;
          setBusy(true);
          setError(null);
          try {
            await invitePartner(cloudClient(), cloud.weddingId, email);
            setEmail("");
            await refresh();
          } catch (err) {
            setError((err as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`${partnerName}'s email`}
          className="min-w-0 flex-1"
        />
        <Button type="submit" disabled={busy || !email.trim()}>
          <UserPlus className="size-4 stroke-[1.5]" /> Invite
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      {state && state.invites.length > 0 && (
        <ul className="mt-4 flex flex-col gap-1.5 text-sm">
          {state.invites.map((invite) => (
            <li key={invite.email} className="flex items-center gap-2">
              {invite.accepted ? <Check className="size-3.5 text-coral" /> : <Clock className="size-3.5 text-ink-mute" />}
              <span className="text-foreground">{invite.email}</span>
              <span className="text-ink-mute">{invite.accepted ? "joined" : "invited — hasn't signed in yet"}</span>
            </li>
          ))}
        </ul>
      )}
      {state?.invites.some((i) => !i.accepted) && (
        <p className="mt-3 text-xs text-ink-mute">
          Tell them to open {siteUrl || "the site"} and sign in with that exact email — they&apos;ll land in this wedding automatically.
        </p>
      )}

      <button
        type="button"
        onClick={() => void cloud.signOut()}
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-foreground"
      >
        <LogOut className="size-3.5 stroke-[1.5]" /> Sign out
      </button>
    </section>
  );
}

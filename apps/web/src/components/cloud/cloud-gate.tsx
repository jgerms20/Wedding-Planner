"use client";

import { Mail, RefreshCw } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cloudClient } from "@/lib/cloud/client";
import { createSharedWedding } from "@/lib/cloud/session";

export type CloudStatus = "checking" | "signed-out" | "no-wedding" | "ready" | "error";

function Frame({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="postcard rise w-full max-w-md p-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-4xl">{title}</h1>
        <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-soft">{children}</div>
      </div>
    </div>
  );
}

/** Everything a signed-out or not-yet-joined partner sees instead of the app. */
export function CloudGate({
  status,
  email,
  error,
  onRetry,
}: {
  status: Exclude<CloudStatus, "ready">;
  email?: string;
  error?: string;
  onRetry: () => void;
}) {
  if (status === "checking") {
    return (
      <Frame eyebrow="Atlas" title="One moment">
        <p>Opening your wedding…</p>
      </Frame>
    );
  }
  if (status === "signed-out") return <SignIn />;
  if (status === "no-wedding") return <NoWedding email={email} onCreated={onRetry} />;
  return (
    <Frame eyebrow="Something went wrong" title="Couldn't open the wedding">
      <p>{error ?? "The shared account didn't respond."}</p>
      <Button onClick={onRetry} className="self-start">
        <RefreshCw className="size-4 stroke-[1.5]" /> Try again
      </Button>
    </Frame>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    setBusy(true);
    setError(null);
    const { error: sendError } = await cloudClient().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.href.split("#")[0] },
    });
    setBusy(false);
    if (sendError) setError(sendError.message);
    else setSent(true);
  }

  if (sent) {
    return (
      <Frame eyebrow="Check your email" title="Link on its way">
        <p>
          I sent a sign-in link to <strong className="text-foreground">{email.trim()}</strong>. Open it on this device and you&apos;ll land
          right back here, signed in.
        </p>
        <button type="button" onClick={() => setSent(false)} className="self-start text-sm text-coral hover:underline">
          Use a different email
        </button>
      </Frame>
    );
  }

  return (
    <Frame eyebrow="Atlas" title="Sign in">
      <p>You two share one wedding now — sign in and you&apos;ll both see the same favorites, guests, and plan as they change.</p>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) void send();
        }}
      >
        <Input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <Button type="submit" disabled={busy || !email.trim()}>
          <Mail className="size-4 stroke-[1.5]" /> {busy ? "Sending…" : "Email me a sign-in link"}
        </Button>
      </form>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-xs text-ink-mute">No password. The link signs you in on whatever device you open it on.</p>
    </Frame>
  );
}

function NoWedding({ email, onCreated }: { email?: string; onCreated: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create() {
    setBusy(true);
    setError(null);
    try {
      await createSharedWedding(cloudClient());
      onCreated();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <Frame eyebrow="Signed in" title="Set up your shared wedding">
      <p>
        {email ? (
          <>
            You&apos;re signed in as <strong className="text-foreground">{email}</strong>.{" "}
          </>
        ) : null}
        If your partner already set this up, ask them to invite this email from Settings, then check again.
      </p>
      <p>
        Otherwise, start it here — everything already in this browser comes with it: your favorites, guests, and edits.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => void create()} disabled={busy}>
          {busy ? "Setting it up…" : "Start our shared wedding"}
        </Button>
        <Button variant="outline" onClick={onCreated} disabled={busy}>
          <RefreshCw className="size-4 stroke-[1.5]" /> Check for an invite
        </Button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button type="button" onClick={() => void cloudClient().auth.signOut()} className="self-start text-xs text-ink-mute hover:underline">
        Sign out
      </button>
    </Frame>
  );
}

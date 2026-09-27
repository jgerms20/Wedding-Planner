"use client";

import { ArrowDownToLine, X } from "lucide-react";
import { useState } from "react";
import { useRepoContext } from "@/lib/repo-context";

/**
 * Shown once per browser that had its own copy of the wedding before you two shared an account:
 * brings that copy's favorites, guests, and edits into the shared wedding.
 */
export function MergeBanner() {
  const { cloud } = useRepoContext();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!cloud || (!cloud.mergePending && !result)) return null;

  if (result) {
    return (
      <div className="rise mb-6 flex items-start justify-between gap-3 rounded-lg border border-line bg-card p-4 text-sm">
        <p className="text-ink-soft">{result}</p>
        <button type="button" onClick={() => setResult(null)} aria-label="Dismiss" className="rounded-full p-1 text-ink-mute hover:bg-muted">
          <X className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="rise mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-gold bg-gold-soft/40 p-4 text-sm">
      <p className="min-w-0 flex-1 text-foreground">
        This browser still has its own copy from before you shared an account — hearts and edits your partner can&apos;t see yet.
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          try {
            setResult(await cloud.mergeLocal());
          } catch (err) {
            setError((err as Error).message);
          } finally {
            setBusy(false);
          }
        }}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 font-medium text-primary-foreground transition-opacity disabled:opacity-60"
      >
        <ArrowDownToLine className="size-3.5 stroke-[1.5]" />
        {busy ? "Bringing it in…" : "Bring it into our shared wedding"}
      </button>
      {error && <p className="w-full text-destructive">{error}</p>}
    </div>
  );
}

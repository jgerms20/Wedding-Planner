"use client";

import type { BowerAction, Destination } from "@bower/shared";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProposalCards } from "@/components/ai/proposal-cards";
import { createBrowserPort, describeApiError, hasApiKey } from "@/lib/ai/client";
import { researchVenues } from "@/lib/ai/research";
import { logUsage } from "@/lib/ai/usage";
import { WEDDING_SLUG } from "@/lib/constants";
import { useRepoContext } from "@/lib/repo-context";
import { cn } from "@/lib/utils";

/**
 * "Find venues here" for one destination. Bower searches the open web, writes
 * up what it found with the URL behind every number, and proposes an
 * `add_venue` card per venue. Anything it could not source never appears.
 */
export function ResearchVenuesButton({ destination, className }: { destination: Destination; className?: string }) {
  const { repo, wedding } = useRepoContext();
  const [busy, setBusy] = useState(false);
  const [actions, setActions] = useState<BowerAction[] | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connected = hasApiKey();

  async function run() {
    if (!repo || !wedding || busy) return;
    setBusy(true);
    setError(null);
    setNotes(null);
    setActions(null);
    try {
      const result = await researchVenues({ destination, wedding, port: createBrowserPort() });
      await logUsage(repo, wedding.id, "research", result.model, result.usage);
      setActions(result.actions);
      if (result.actions.length === 0) {
        setNotes(`I could not find a sourced venue in ${destination.name} this time. Try again, or add one by hand.`);
      } else if (result.droppedForMissingSources > 0) {
        setNotes(
          `${result.droppedForMissingSources} more turned up without a source, so I left ${result.droppedForMissingSources === 1 ? "it" : "them"} out.`,
        );
      }
    } catch (err) {
      setError(describeApiError(err));
    } finally {
      setBusy(false);
    }
  }

  if (!connected) {
    return (
      <p className={cn("text-sm text-ink-soft", className)}>
        <Link href={`/w/${WEDDING_SLUG}/settings`} className="text-coral underline underline-offset-2">
          Connect Claude
        </Link>{" "}
        and I&rsquo;ll go find venues in {destination.name}.
      </p>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <button
        type="button"
        onClick={() => void run()}
        disabled={busy}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-coral hover:text-coral disabled:opacity-50"
      >
        {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Search className="size-3.5" />}
        {busy ? `Searching ${destination.name}…` : `Find venues in ${destination.name}`}
      </button>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {notes && <p className="text-sm text-ink-soft">{notes}</p>}
      {actions && actions.length > 0 && <ProposalCards actions={actions} source="chat" />}
    </div>
  );
}

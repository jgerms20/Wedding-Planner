"use client";

import type { BowerAction } from "@bower/shared";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProposalCards } from "@/components/ai/proposal-cards";
import { createBrowserPort, describeApiError, hasApiKey } from "@/lib/ai/client";
import { researchDestination } from "@/lib/ai/research";
import { logUsage } from "@/lib/ai/usage";
import { WEDDING_SLUG } from "@/lib/constants";
import { useRepoContext } from "@/lib/repo-context";

/**
 * The couple types a place, Atlas searches the open web for it, writes up
 * what it found with the URL behind every number, and proposes one
 * `add_destination` card for the couple to approve. Mirrors
 * `ResearchVenuesButton`'s two-step research-then-extract-then-approve shape.
 */
export function ResearchDestinationBox() {
  const { repo, wedding } = useRepoContext();
  const [name, setName] = useState("");
  const [searching, setSearching] = useState<string | null>(null);
  const [actions, setActions] = useState<BowerAction[] | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connected = hasApiKey();

  async function run(e: React.FormEvent) {
    e.preventDefault();
    const target = name.trim();
    if (!repo || !wedding || !target || searching) return;
    setSearching(target);
    setError(null);
    setNotes(null);
    setActions(null);
    try {
      const result = await researchDestination({ name: target, wedding, port: createBrowserPort() });
      await logUsage(repo, wedding.id, "research", result.model, result.usage);
      setActions(result.actions);
      if (result.actions.length === 0) {
        setNotes(`I couldn't find sourced information on "${target}." Try a more specific name, or add it by hand.`);
      }
      setName("");
    } catch (err) {
      setError(describeApiError(err));
    } finally {
      setSearching(null);
    }
  }

  if (!connected) {
    return (
      <p className="text-sm text-ink-soft">
        <Link href={`/w/${WEDDING_SLUG}/settings`} className="text-coral underline underline-offset-2">
          Connect Claude
        </Link>{" "}
        and you can type in a place and I&rsquo;ll go find real info on it.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={(e) => void run(e)} className="flex items-center gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type a place — a city, an island, anywhere…"
          disabled={searching !== null}
          className="h-9 w-full max-w-xs rounded-full border border-line-strong bg-background px-3.5 text-sm outline-none focus:border-coral disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={searching !== null || !name.trim()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-coral hover:text-coral disabled:opacity-50"
        >
          {searching ? <Loader2 className="size-3.5 animate-spin" /> : <Search className="size-3.5" />}
          Search
        </button>
      </form>
      {searching && (
        <div className="postcard flex max-w-xs items-center gap-2 p-4 text-sm text-ink-soft">
          <Loader2 className="size-3.5 shrink-0 animate-spin" /> Searching for {searching}…
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {notes && <p className="text-sm text-ink-soft">{notes}</p>}
      {actions && actions.length > 0 && <ProposalCards actions={actions} source="chat" />}
    </div>
  );
}

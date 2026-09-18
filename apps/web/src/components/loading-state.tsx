"use client";

import { RefreshCw } from "lucide-react";
import { useRepoContext } from "@/lib/repo-context";

/**
 * The fallback every page shows while `ready` is false. If it stays false
 * past `SLOW_THRESHOLD_MS` (see repo-context.tsx), offers a reload instead of
 * leaving the couple staring at a message with nothing to do about it.
 */
export function LoadingState({ label = "Loading…" }: { label?: string }) {
  const { slow } = useRepoContext();
  return (
    <div className="flex flex-col items-start gap-3">
      <p className="font-display text-xl text-ink-soft">{label}</p>
      {slow && (
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-muted"
        >
          <RefreshCw className="size-3.5" /> This is taking a while — reload
        </button>
      )}
    </div>
  );
}

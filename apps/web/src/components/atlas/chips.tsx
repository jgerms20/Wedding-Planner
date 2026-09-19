import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The one coral accent chip: "Front-runner", "Our plan". Never more than one per view. */
export function AccentChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-coral-soft px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-coral uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A quiet informational chip: "Lodging on site", "In-house catering", a pipeline status. */
export function NeutralChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-full border border-line px-2 py-0.5 text-[0.7rem] text-ink-soft", className)}>
      {children}
    </span>
  );
}

/** Marks a number as derived rather than sourced. Gold, never text-on-ivory. */
export function EstimateChip({ className }: { className?: string }) {
  return (
    <span className={cn("rounded-full bg-gold-soft px-2 py-0.5 text-[0.7rem] font-medium text-ink-700", className)}>
      estimate
    </span>
  );
}

/** Hostname pills linking out to where a number or note came from. */
export function SourceChips({ urls, className }: { urls: string[]; className?: string }) {
  if (urls.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {urls.map((url) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-2 py-0.5 text-[0.7rem] text-ink-soft transition-colors hover:border-coral hover:text-coral"
        >
          {hostnameOf(url)}
        </a>
      ))}
    </div>
  );
}

/**
 * A "how we got these" list — linked rows (domain + external-link icon), not bare pills. Used
 * for a destination's own top-level Sources section, where a wrapped row of tiny chips read as
 * unfinished; `SourceChips` stays as-is for tighter contexts like a single venue row.
 */
export function SourceList({ urls, className }: { urls: string[]; className?: string }) {
  if (urls.length === 0) return null;
  return (
    <ul className={cn("flex flex-col gap-1.5", className)}>
      {urls.map((url) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-ink-soft transition-colors hover:border-coral hover:text-coral"
          >
            <ExternalLink className="size-3.5 shrink-0 text-ink-mute" />
            <span className="min-w-0 flex-1 truncate">{hostnameOf(url)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

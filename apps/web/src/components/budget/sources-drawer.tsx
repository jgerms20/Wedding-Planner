"use client";

import { Drawer } from "@/components/ui/drawer";

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

/** Renders free text with any http(s) URLs turned into links, everything else as plain text.
 * `split` with a single capturing group interleaves [text, url, text, url, ...], so the odd
 * indices are always the matched URLs — no need to re-test each part (which would be unsafe
 * with a stateful `g`-flagged regex anyway). */
function linkify(text: string) {
  const parts = text.split(URL_PATTERN);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} target="_blank" rel="noreferrer" className="text-coral underline underline-offset-2 break-all">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function SourcesDrawer({
  open,
  onOpenChange,
  itemName,
  notes,
  sourceUrls,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  notes: string | undefined;
  /** Extra source links to list below the notes, separate from any URLs embedded in the notes text. */
  sourceUrls?: string[];
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} title="How we estimated this">
      <p className="eyebrow">{itemName}</p>
      {notes ? (
        <p className="mt-3 text-[15px] leading-relaxed whitespace-pre-wrap text-ink-soft">{linkify(notes)}</p>
      ) : (
        <p className="mt-3 text-sm text-ink-soft">No notes on this line yet — add some, or edit it to explain where the number came from.</p>
      )}
      {sourceUrls && sourceUrls.length > 0 && (
        <div className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4">
          <p className="eyebrow">Sources</p>
          {sourceUrls.map((url) => (
            <a key={url} href={url} target="_blank" rel="noreferrer" className="text-xs text-coral underline underline-offset-2 break-all">
              {url}
            </a>
          ))}
        </div>
      )}
    </Drawer>
  );
}

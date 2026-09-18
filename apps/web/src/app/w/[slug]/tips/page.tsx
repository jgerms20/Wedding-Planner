"use client";

import { newId, nowIso, SEED_BENCHMARKS, watchItemKindSchema, type WatchItem, type WatchItemKind } from "@bower/shared";
import { Plus, X } from "lucide-react";
import { useCallback, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { LoadingState } from "@/components/loading-state";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";
import { cn } from "@/lib/utils";

const KIND_LABELS: Record<WatchItemKind, string> = { movie: "Movie", show: "Show", podcast: "Podcast" };

export default function TipsPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const loadWatchItems = useCallback(async () => (repo && weddingId ? repo.watchItems.list(weddingId) : undefined), [repo, weddingId]);
  const { items: watchItems, reload } = useEntityList(loadWatchItems);

  const [draftTitle, setDraftTitle] = useState("");
  const [draftKind, setDraftKind] = useState<WatchItemKind>("movie");

  if (!repo || !weddingId) return <LoadingState />;

  async function addWatchItem() {
    const title = draftTitle.trim();
    if (!title) return;
    await repo!.watchItems.upsert({ id: newId(), weddingId: weddingId!, kind: draftKind, title, done: false, createdAt: nowIso() });
    setDraftTitle("");
    await reload();
  }

  async function toggleWatchItem(item: WatchItem) {
    await repo!.watchItems.upsert({ ...item, done: !item.done });
    await reload();
  }

  async function removeWatchItem(item: WatchItem) {
    await repo!.watchItems.remove(item.id);
    await reload();
  }

  const tips = SEED_BENCHMARKS?.tips ?? [];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Along the way"
        title="Helpful things to know"
        description="Advice from planners and real couples, each with where it came from. Plus something to watch when you need a break from spreadsheets."
      />

      {tips.length === 0 ? (
        <p className="text-sm text-ink-soft">No tips registered yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tips.map((tip, i) => (
            <div key={i} className={`postcard rise rise-${Math.min(i + 1, 8)} flex flex-col gap-2 p-5`}>
              <p className="text-[15px] leading-relaxed text-ink-soft">{tip.text}</p>
              <a href={tip.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-coral underline underline-offset-2 break-all">
                {tip.sourceUrl}
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="hairline my-2" />

      <div>
        <p className="eyebrow">The fun part</p>
        <h2 className="mt-1 text-3xl">Wedding movies, shows & podcasts</h2>
        <p className="mt-2 text-sm text-ink-soft">A short starter list — check them off, or add your own.</p>

        <div className="postcard mt-5 p-5">
          {watchItems.length === 0 ? (
            <p className="text-sm text-ink-mute">Nothing on the list yet.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {watchItems.map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-sm">
                  <Checkbox checked={item.done} onChange={() => void toggleWatchItem(item)} />
                  <span className="rounded-full border border-line px-2 py-0.5 text-[0.65rem] text-ink-soft uppercase">{KIND_LABELS[item.kind]}</span>
                  <span className={cn("min-w-0 flex-1 truncate", item.done && "text-ink-mute line-through")}>{item.title}</span>
                  <button
                    type="button"
                    onClick={() => void removeWatchItem(item)}
                    aria-label={`Remove ${item.title}`}
                    className="shrink-0 rounded-full p-1 text-ink-mute transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void addWatchItem();
            }}
            className="mt-3 flex gap-2"
          >
            <Select value={draftKind} onChange={(e) => setDraftKind(e.target.value as WatchItemKind)} className="w-32 shrink-0">
              {watchItemKindSchema.options.map((k) => (
                <option key={k} value={k}>
                  {KIND_LABELS[k]}
                </option>
              ))}
            </Select>
            <Input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} placeholder="Title…" className="flex-1" />
            <Button type="submit" size="sm" variant="outline" disabled={!draftTitle.trim()}>
              <Plus className="size-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

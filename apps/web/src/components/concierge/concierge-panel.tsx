"use client";

import type { ChatMessage } from "@bower/shared";
import { newId, nowIso } from "@bower/shared";
import { ArrowUp, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { WEDDING_SLUG } from "@/lib/constants";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";
import { cn } from "@/lib/utils";

/**
 * The Concierge: a right-side conversation with Bower about the whole wedding.
 * This shell renders history from the local `chatMessages` table and a
 * composer; the model call lives in apps/web/src/lib/ai and replaces `respond`.
 */
export function ConciergePanel({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    const all = await repo.chatMessages.list(weddingId);
    return all.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  }, [repo, weddingId]);
  const { items: messages, reload } = useEntityList(load);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  async function respond(userText: string): Promise<string> {
    void userText;
    return "I can read your whole plan once Claude is connected in Settings. Until then, the tabs on the left are all live.";
  }

  async function send() {
    const value = draft.trim();
    if (!value || !repo || !weddingId || busy) return;
    setBusy(true);
    setDraft("");
    try {
      const userMessage: ChatMessage = { id: newId(), weddingId, role: "user", content: value, createdAt: nowIso() };
      await repo.chatMessages.upsert(userMessage);
      await reload();
      const reply = await respond(value);
      await repo.chatMessages.upsert({ id: newId(), weddingId, role: "assistant", content: reply, createdAt: nowIso() });
      await reload();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn("fixed inset-0 z-50 transition-opacity", open ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!open}>
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={() => onOpenChange(false)} />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-background shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Concierge"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="eyebrow">Concierge</p>
            <h2 className="font-display text-2xl">Ask Bower anything</h2>
          </div>
          <button type="button" onClick={() => onOpenChange(false)} aria-label="Close" className="rounded-full p-2 text-ink-soft hover:bg-muted">
            <X className="size-4" />
          </button>
        </header>
        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.length === 0 && (
            <div className="rounded-lg border border-dashed border-line-strong p-4 text-sm text-ink-soft">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Sparkles className="size-4 text-coral" /> Try: “What should we do before the East Coast trip?”
              </p>
              <p className="mt-2">
                I answer from your atlas, plan, budget, and guest list, and I can add things as we talk.{" "}
                <Link href={`/w/${WEDDING_SLUG}/settings`} className="text-coral underline underline-offset-2">
                  Connect Claude
                </Link>{" "}
                to turn me on.
              </p>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed",
                  m.role === "user" ? "bg-ink text-rail-foreground" : "bg-card border border-line",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
          className="flex items-center gap-2 border-t border-line p-3"
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about the plan, budget, guests…"
            className="min-w-0 flex-1 rounded-full border border-line-strong bg-card px-4 py-2.5 text-[15px] outline-none focus:border-coral"
          />
          <button
            type="submit"
            disabled={!draft.trim() || busy}
            aria-label="Send"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-coral text-primary-foreground disabled:opacity-30"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </aside>
    </div>
  );
}

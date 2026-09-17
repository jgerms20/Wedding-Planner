"use client";

import { newId, type ApplyResult, type BowerAction } from "@bower/shared";
import { ArrowUp, Loader2, Mic, Square, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProposalCards } from "@/components/ai/proposal-cards";
import { autonomyFor, interpret, runProposal, type ActionSource } from "@/lib/ai/interpret";
import { useRepoContext } from "@/lib/repo-context";
import { useDictation } from "@/lib/use-dictation";
import { cn } from "@/lib/utils";

/**
 * The always-present "Tell Bower" bar: type or dictate, and Bower turns it
 * into changes. Whatever they say goes through `interpret` — Claude when a
 * key is connected, the deterministic fallback parser when it is not — and
 * comes back as cards above the bar. Nothing is written until Apply, unless
 * autonomy is set to auto-apply additions, which still offers Undo.
 */

interface Proposal {
  /** New per submission, so the cards remount instead of inheriting state. */
  id: string;
  reply: string;
  actions: BowerAction[];
  applied: ApplyResult[];
  source: ActionSource;
}

export function TellBowerBar() {
  const { repo, wedding, settings, touch } = useRepoContext();
  const dictation = useDictation();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mirror the live transcript into the input while listening.
  useEffect(() => {
    if (dictation.listening || dictation.transcript) setText(dictation.transcript);
  }, [dictation.transcript, dictation.listening]);

  async function submit() {
    const value = text.trim();
    if (!value || !repo || !wedding || busy) return;
    const source: ActionSource = dictation.transcript ? "voice" : "manual";
    setBusy(true);
    setProposal(null);
    try {
      const result = await interpret({ text: value, repo, weddingId: wedding.id, source });
      const outcome = await runProposal({
        repo,
        weddingId: wedding.id,
        actions: result.response.actions,
        autonomy: autonomyFor(settings?.autonomy),
        source,
      });
      if (outcome.results.length > 0) touch();
      setProposal({
        id: newId(),
        reply: result.response.reply,
        actions: outcome.pending,
        applied: outcome.results,
        source,
      });
      setText("");
      dictation.reset();
    } finally {
      setBusy(false);
    }
  }

  function toggleMic() {
    if (dictation.listening) {
      dictation.stop();
    } else {
      dictation.reset();
      setText("");
      dictation.start();
      inputRef.current?.focus();
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[4.25rem] z-40 flex justify-center px-3 md:bottom-6 md:left-[var(--rail-w)]">
      <div className="pointer-events-auto w-full max-w-2xl">
        {proposal && (
          <div className="rise mb-2 max-h-[55vh] overflow-y-auto rounded-lg border border-line bg-card/95 p-3 shadow-[0_20px_50px_-20px_rgba(20,40,32,0.5)] backdrop-blur">
            <div className="flex items-start gap-3">
              <p className="min-w-0 flex-1 text-[15px] leading-relaxed text-ink-soft">{proposal.reply}</p>
              <button
                type="button"
                onClick={() => setProposal(null)}
                aria-label="Dismiss"
                className="shrink-0 rounded-full p-1.5 text-ink-soft hover:bg-muted"
              >
                <X className="size-3.5" />
              </button>
            </div>
            {(proposal.actions.length > 0 || proposal.applied.length > 0) && (
              <ProposalCards
                key={proposal.id}
                actions={proposal.actions}
                applied={proposal.applied}
                source={proposal.source}
                className="mt-3"
              />
            )}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="flex items-center gap-2 rounded-full border border-line-strong bg-card/95 p-1.5 pl-2 shadow-[0_14px_40px_-16px_rgba(20,40,32,0.45)] backdrop-blur"
        >
          <button
            type="button"
            onClick={toggleMic}
            disabled={!dictation.supported}
            aria-label={dictation.listening ? "Stop listening" : "Dictate"}
            title={dictation.supported ? (dictation.listening ? "Stop" : "Talk to Bower") : "Dictation needs Chrome, Safari, or Edge"}
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-colors",
              dictation.listening ? "listening bg-coral-deep" : "bg-coral hover:bg-coral-deep",
              !dictation.supported && "opacity-40",
            )}
          >
            {dictation.listening ? <Square className="size-4" /> : <Mic className="size-4" />}
          </button>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={dictation.listening ? "Listening…" : "Tell Bower anything: “add my cousin Marcus from Atlanta, must-invite”"}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-ink-mute"
            data-testid="tell-bower-input"
          />
          <button
            type="submit"
            disabled={!text.trim() || busy}
            aria-label="Send"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-rail-foreground transition-opacity disabled:opacity-30"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
          </button>
        </form>
        {dictation.error && <p className="mt-1 text-center text-xs text-destructive">{dictation.error}</p>}
      </div>
    </div>
  );
}

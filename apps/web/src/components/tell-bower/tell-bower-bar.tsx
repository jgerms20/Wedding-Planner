"use client";

import { applyActions } from "@bower/shared";
import { ArrowUp, Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRepoContext } from "@/lib/repo-context";
import { useDictation } from "@/lib/use-dictation";
import { cn } from "@/lib/utils";

/**
 * The always-present "Tell Bower" bar: type or dictate, and Bower turns it
 * into changes. This shell handles dictation and a plain fallback (save as a
 * note); the AI pipeline (parse → proposed action cards → apply/undo) plugs
 * into `submit` in apps/web/src/lib/ai.
 */
export function TellBowerBar() {
  const { repo, wedding, touch } = useRepoContext();
  const dictation = useDictation();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mirror the live transcript into the input while listening.
  useEffect(() => {
    if (dictation.listening || dictation.transcript) setText(dictation.transcript);
  }, [dictation.transcript, dictation.listening]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  async function submit() {
    const value = text.trim();
    if (!value || !repo || !wedding || busy) return;
    setBusy(true);
    try {
      await applyActions(repo, wedding.id, [{ type: "add_note", text: value }], { source: dictation.transcript ? "voice" : "manual" });
      touch();
      setToast("Saved as a note. Connect Claude in Settings and I'll turn what you say into guests, tasks, and dates.");
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
        {toast && (
          <div className="rise mb-2 rounded-md border border-line bg-card px-4 py-2 text-sm text-ink-soft shadow-lg">{toast}</div>
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
            <ArrowUp className="size-4" />
          </button>
        </form>
        {dictation.error && <p className="mt-1 text-center text-xs text-destructive">{dictation.error}</p>}
      </div>
    </div>
  );
}

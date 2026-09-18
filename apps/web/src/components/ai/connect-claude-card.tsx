"use client";

import { Check, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getApiKey, setApiKey, verifyApiKey } from "@/lib/ai/client";
import { useRepoContext } from "@/lib/repo-context";

/**
 * Settings: the one place the couple hands Atlas a Claude API key.
 *
 * The key never leaves this browser — there is no server in this build — so
 * the copy says exactly that, and Verify is a single cheap call to the models
 * endpoint rather than a real generation.
 */

const AUTONOMY_OPTIONS: Array<{ value: 0 | 1 | 2; label: string; hint: string }> = [
  { value: 0, label: "Suggest", hint: "Atlas answers and explains, but proposes nothing." },
  { value: 1, label: "Draft and approve", hint: "Atlas proposes changes as cards. You press Apply." },
  { value: 2, label: "Auto-apply additions", hint: "New guests, tasks and notes are added right away, with Undo." },
];

export function ConnectClaudeCard() {
  const { repo, wedding, settings, reloadSettings } = useRepoContext();
  const [draft, setDraft] = useState("");
  const [stored, setStored] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "checking" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  // localStorage only exists in the browser; read it after mount.
  useEffect(() => {
    setStored(getApiKey());
  }, []);

  const autonomy = (settings?.autonomy.tell_bower ?? 1) as 0 | 1 | 2 | 3;

  async function saveAutonomy(level: 0 | 1 | 2) {
    if (!repo || !settings || !wedding) return;
    await repo.saveSettings({ ...settings, autonomy: { ...settings.autonomy, tell_bower: level } });
    await reloadSettings();
  }

  async function connect() {
    const key = draft.trim();
    if (!key) return;
    setStatus("checking");
    setMessage(null);
    const result = await verifyApiKey(key);
    if (!result.ok) {
      setStatus("error");
      setMessage(result.error);
      return;
    }
    setApiKey(key);
    setStored(getApiKey());
    setDraft("");
    setStatus("ok");
    setMessage("Connected. Atlas can read your plan and propose changes now.");
  }

  function disconnect() {
    setApiKey(null);
    setStored(null);
    setStatus("idle");
    setMessage("Disconnected. The key is gone from this browser.");
  }

  return (
    <section className="postcard p-5">
      <p className="eyebrow">Atlas&rsquo; brain</p>
      <h2 className="mt-1 font-display text-2xl">Connect Claude</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
        Paste an Anthropic API key and Atlas can read your whole plan, answer questions, and turn what you say into guests, tasks and
        dates. The key is stored only in this browser, never sent anywhere but Anthropic, and it is separate from a Claude.ai
        subscription &mdash; API usage is billed per call.
      </p>
      <a
        href="https://console.anthropic.com/settings/keys"
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-sm text-coral"
      >
        Get a key at console.anthropic.com <ExternalLink className="size-3.5" />
      </a>

      {stored ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1.5 text-sm">
            <Check className="size-4 text-coral" />
            Connected as <span className="tabular">{maskKey(stored)}</span>
          </span>
          <button type="button" onClick={disconnect} className="text-sm font-medium text-ink-soft underline underline-offset-2">
            Disconnect
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void connect();
          }}
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          <input
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="sk-ant-..."
            autoComplete="off"
            spellCheck={false}
            aria-label="Anthropic API key"
            className="h-10 min-w-0 flex-1 rounded-md border border-line-strong bg-background px-3 text-sm outline-none focus:border-coral"
          />
          <button
            type="submit"
            disabled={!draft.trim() || status === "checking"}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-coral px-4 text-sm font-medium text-primary-foreground disabled:opacity-40"
          >
            {status === "checking" && <Loader2 className="size-4 animate-spin" />}
            Verify and connect
          </button>
        </form>
      )}

      {message && <p className={`mt-2 text-sm ${status === "error" ? "text-destructive" : "text-ink-soft"}`}>{message}</p>}

      <div className="hairline my-6" />

      <p className="eyebrow">How much rope</p>
      <div className="mt-3 flex flex-col gap-2">
        {AUTONOMY_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
              autonomy === option.value ? "border-coral bg-coral-soft" : "border-line hover:border-line-strong"
            }`}
          >
            <input
              type="radio"
              name="tell-bower-autonomy"
              value={option.value}
              checked={autonomy === option.value}
              onChange={() => void saveAutonomy(option.value)}
              className="mt-1 accent-coral"
            />
            <span className="min-w-0">
              <span className="block text-[15px] font-medium">{option.label}</span>
              <span className="block text-sm text-ink-soft">{option.hint}</span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

/** Shows enough of the key to tell two apart, never enough to use one. */
function maskKey(key: string): string {
  if (key.length <= 12) return "•".repeat(key.length);
  return `${key.slice(0, 7)}…${key.slice(-4)}`;
}

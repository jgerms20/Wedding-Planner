"use client";

import { nowIso } from "@bower/shared";
import { AlertTriangle, Download, Upload } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { restoreSeed } from "@/lib/bootstrap";
import { WEDDING_SLUG } from "@/lib/constants";
import { downloadFile } from "@/lib/ics";
import { useRepoContext } from "@/lib/repo-context";

type ThemeChoice = "system" | "light" | "dark";

export default function SettingsPage() {
  const { repo, wedding, reloadWedding, touch } = useRepoContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [confirmingRestore, setConfirmingRestore] = useState(false);
  const [restoring, setRestoring] = useState(false);

  if (!repo || !wedding) return <p className="font-display text-xl text-ink-soft">Loading…</p>;

  async function saveField(patch: Partial<typeof wedding>) {
    await repo!.upsertWedding({ ...wedding!, ...patch, updatedAt: nowIso() });
    await reloadWedding();
  }

  async function exportJson() {
    const json = await repo!.exportJson(wedding!.id);
    downloadFile(`${WEDDING_SLUG}-export.json`, json, "application/json");
  }

  async function handleImportFile(file: File) {
    setImportError(null);
    const text = await file.text();
    if (!confirm("Importing will replace all data currently stored in this browser. Continue?")) return;
    try {
      await repo!.importJson(text);
      touch();
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Could not import that file.");
    }
  }

  async function restoreTheSeed() {
    setRestoring(true);
    await restoreSeed(repo!);
    touch();
    setRestoring(false);
    setConfirmingRestore(false);
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <PageHeader title="Settings" description="Names, date, and the basics — plus your data." action={<Badge variant="secondary">Local: this device only</Badge>} />

      <section className="postcard rise flex flex-col gap-4 p-6">
        <p className="eyebrow">You two</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Your name">
            <Input defaultValue={wedding.partnerA.name} onBlur={(e) => saveField({ partnerA: { ...wedding.partnerA, name: e.target.value } })} />
          </Field>
          <Field label="Their name">
            <Input defaultValue={wedding.partnerB.name} onBlur={(e) => saveField({ partnerB: { ...wedding.partnerB, name: e.target.value } })} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Your pronouns (optional)">
            <Input
              defaultValue={wedding.partnerA.pronouns ?? ""}
              placeholder="she/her"
              onBlur={(e) => saveField({ partnerA: { ...wedding.partnerA, pronouns: e.target.value || undefined } })}
            />
          </Field>
          <Field label="Their pronouns (optional)">
            <Input
              defaultValue={wedding.partnerB.pronouns ?? ""}
              placeholder="they/them"
              onBlur={(e) => saveField({ partnerB: { ...wedding.partnerB, pronouns: e.target.value || undefined } })}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date flexibility">
            <Select defaultValue={wedding.dateFlexibility} onChange={(e) => saveField({ dateFlexibility: e.target.value as typeof wedding.dateFlexibility })}>
              <option value="fixed">Fixed</option>
              <option value="month">Month</option>
              <option value="season">Season</option>
              <option value="open">Open</option>
            </Select>
          </Field>
          <Field label="Guest target">
            <Input
              type="number"
              defaultValue={wedding.guestTarget ?? ""}
              onBlur={(e) => saveField({ guestTarget: e.target.value ? Number(e.target.value) : undefined })}
            />
          </Field>
        </div>
        {wedding.dateFlexibility === "fixed" ? (
          <Field label="Wedding date">
            <Input type="date" defaultValue={wedding.targetDate ?? ""} onBlur={(e) => saveField({ targetDate: e.target.value || undefined })} />
          </Field>
        ) : (
          <Field label="Target season">
            <Input defaultValue={wedding.targetSeason ?? ""} onBlur={(e) => saveField({ targetSeason: e.target.value || undefined })} placeholder="Spring 2028" />
          </Field>
        )}
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={wedding.isDestination} onChange={(e) => saveField({ isDestination: e.target.checked })} />
          Destination wedding
        </label>
        <Link href={`/w/${WEDDING_SLUG}/intake`} className="text-sm text-coral underline underline-offset-2">
          Open the full profile questionnaire →
        </Link>
      </section>

      {/* ai-settings slot: ConnectClaudeCard + AiUsageCard */}

      <section className="postcard rise rise-2 flex flex-col gap-4 p-6">
        <p className="eyebrow">Your data</p>
        <p className="text-sm text-ink-soft">
          Everything lives in this browser only. Export a backup before clearing site data or switching devices — import it wherever you want to
          keep working.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportJson}>
            <Download className="size-4" /> Export JSON
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="size-4" /> Import JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
              e.target.value = "";
            }}
          />
        </div>
        {importError && <p className="text-sm text-destructive">{importError}</p>}

        <div className="hairline" />

        <div className="flex flex-col gap-2">
          <p className="text-sm text-ink-soft">Undo any experimenting and go back to Joshua &amp; Janel&apos;s researched starting point — destinations, plan, and budget included.</p>
          {confirmingRestore ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="destructive" onClick={restoreTheSeed} disabled={restoring}>
                {restoring ? "Restoring…" : "Yes, restore the seed"}
              </Button>
              <Button variant="outline" onClick={() => setConfirmingRestore(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="w-fit" onClick={() => setConfirmingRestore(true)}>
              <AlertTriangle className="size-4" /> Restore the Joshua &amp; Janel seed
            </Button>
          )}
        </div>
      </section>

      <section className="postcard rise rise-3 flex flex-col gap-4 p-6">
        <p className="eyebrow">Appearance</p>
        <ThemeSelect />
      </section>
    </div>
  );
}

function ThemeSelect() {
  const [theme, setThemeState] = useState<ThemeChoice>("system");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("bower:theme");
      if (saved === "light" || saved === "dark") setThemeState(saved);
    } catch {
      // private mode: falls back to "system"
    }
  }, []);

  function setTheme(next: ThemeChoice) {
    setThemeState(next);
    try {
      if (next === "system") window.localStorage.removeItem("bower:theme");
      else window.localStorage.setItem("bower:theme", next);
    } catch {
      // private mode: the choice just won't persist across reloads
    }
    window.dispatchEvent(new Event("bower:theme"));
  }

  return (
    <Field label="Theme">
      <Select value={theme} onChange={(e) => setTheme(e.target.value as ThemeChoice)} className="max-w-48">
        <option value="system">Match system</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </Select>
    </Field>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

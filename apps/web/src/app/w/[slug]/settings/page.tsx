"use client";

import { nowIso } from "@bower/shared";
import { AlertTriangle, Download, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { WEDDING_SLUG } from "@/lib/constants";
import { downloadFile } from "@/lib/ics";
import { useRepoContext } from "@/lib/repo-context";

export default function SettingsPage() {
  const { repo, wedding, reloadWedding } = useRepoContext();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  if (!repo || !wedding) return <p className="text-sm text-muted-foreground">Loading…</p>;

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
      await reloadWedding();
      router.replace(`/w/${WEDDING_SLUG}`);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Could not import that file.");
    }
  }

  async function resetAllData() {
    const json = await repo!.exportJson(wedding!.id);
    const blank = JSON.parse(json);
    blank.wedding = { ...blank.wedding, targetDate: undefined, targetSeason: undefined, guestTarget: undefined, styleNotes: undefined };
    for (const key of ["tasks", "events", "destinations", "venues", "scenarios", "households", "guests", "budgetCategories", "budgetItems", "subEvents", "partyMembers", "decisions"]) {
      blank[key] = [];
    }
    await repo!.importJson(JSON.stringify(blank));
    router.replace(`/w/${WEDDING_SLUG}/intake`);
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Names, date, and the basics — plus your data."
        action={<Badge variant="secondary">Local: this device only</Badge>}
      />

      <Card>
        <CardHeader>
          <CardTitle>The basics</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Your name">
              <Input
                defaultValue={wedding.partnerA.name}
                onBlur={(e) => saveField({ partnerA: { ...wedding.partnerA, name: e.target.value } })}
              />
            </Field>
            <Field label="Their name">
              <Input
                defaultValue={wedding.partnerB.name}
                onBlur={(e) => saveField({ partnerB: { ...wedding.partnerB, name: e.target.value } })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date flexibility">
              <Select
                defaultValue={wedding.dateFlexibility}
                onChange={(e) => saveField({ dateFlexibility: e.target.value as typeof wedding.dateFlexibility })}
              >
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
            <input type="checkbox" defaultChecked={wedding.isDestination} onChange={(e) => saveField({ isDestination: e.target.checked })} />
            Destination wedding
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your data</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Everything lives in this browser only. Export a backup before clearing site data or switching devices —
            import it wherever you want to keep working.
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
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-4" /> Reset all data
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Wipes every task, guest, destination, and setting on this device and sends you back to intake. This can&apos;t
            be undone — export a backup first if you might want it back.
          </p>
          {confirmingReset ? (
            <div className="flex gap-2">
              <Button variant="destructive" onClick={resetAllData}>
                Yes, erase everything
              </Button>
              <Button variant="outline" onClick={() => setConfirmingReset(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="destructive" className="w-fit" onClick={() => setConfirmingReset(true)}>
              Reset all data
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
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

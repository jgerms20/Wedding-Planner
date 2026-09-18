"use client";

import { newId, planPaceSchema, type Anchor, type AnchorKind, type PlanConfig, type PlanPace, type TravelWindow } from "@bower/shared";
import { Trash2 } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ANCHOR_KINDS: AnchorKind[] = ["engagement_party", "save_the_dates", "invitations", "custom"];
const REVEAL_OPTIONS = ["date", "destination", "wedding_party"] as const;
const PACE_DESCRIPTIONS: Record<PlanPace, string> = {
  relaxed: "Stretches every default lead time (×1.25) — more breathing room, later deadlines.",
  balanced: "The default lead times, as researched.",
  aggressive: "Compresses every default lead time (×0.75) — for a shorter runway to the wedding.",
};

export function PlanSettingsDialog({
  open,
  onOpenChange,
  planConfig,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planConfig: PlanConfig;
  onSave: (next: PlanConfig) => Promise<void>;
}) {
  const [anchors, setAnchors] = useState<Anchor[]>(planConfig.anchors);
  const [windows, setWindows] = useState<TravelWindow[]>(planConfig.travelWindows);
  const [saveTheDatesMonthsBefore, setSaveTheDatesMonthsBefore] = useState(planConfig.saveTheDatesMonthsBefore);
  const [invitationsMonthsBefore, setInvitationsMonthsBefore] = useState(planConfig.invitationsMonthsBefore);
  const [rsvpDeadlineMonthsBefore, setRsvpDeadlineMonthsBefore] = useState(planConfig.rsvpDeadlineMonthsBefore);
  const [pace, setPace] = useState<PlanPace>(planConfig.pace ?? "balanced");
  const [saving, setSaving] = useState(false);

  // Re-sync local state whenever the dialog opens with fresh data.
  useEffect(() => {
    if (!open) return;
    setAnchors(planConfig.anchors);
    setWindows(planConfig.travelWindows);
    setSaveTheDatesMonthsBefore(planConfig.saveTheDatesMonthsBefore);
    setInvitationsMonthsBefore(planConfig.invitationsMonthsBefore);
    setRsvpDeadlineMonthsBefore(planConfig.rsvpDeadlineMonthsBefore);
    setPace(planConfig.pace ?? "balanced");
    // Intentionally re-syncs only when the dialog opens, not on every planConfig change.
  }, [open]);

  async function handleSave() {
    setSaving(true);
    await onSave({
      ...planConfig,
      anchors,
      travelWindows: windows,
      saveTheDatesMonthsBefore,
      invitationsMonthsBefore,
      rsvpDeadlineMonthsBefore,
      pace,
    });
    setSaving(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Plan settings</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <p className="eyebrow">Pace</p>
          <div className="inline-flex w-fit rounded-full border border-line p-0.5 text-xs">
            {planPaceSchema.options.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPace(p)}
                aria-pressed={pace === p}
                className={cn("rounded-full px-3 py-1 capitalize transition-colors", pace === p ? "bg-ink text-rail-foreground" : "text-ink-soft hover:text-foreground")}
              >
                {p}
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-soft">{PACE_DESCRIPTIONS[pace]} Never changes a date you've already edited yourself, an anchor date, or a task you overrode individually.</p>
        </section>

        <section className="flex flex-col gap-3">
          <p className="eyebrow">Communications offsets</p>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Save-the-dates (months before)">
              <Input type="number" step="0.5" value={saveTheDatesMonthsBefore} onChange={(e) => setSaveTheDatesMonthsBefore(Number(e.target.value))} />
            </Field>
            <Field label="Invitations (months before)">
              <Input type="number" step="0.5" value={invitationsMonthsBefore} onChange={(e) => setInvitationsMonthsBefore(Number(e.target.value))} />
            </Field>
            <Field label="RSVP deadline (months before)">
              <Input type="number" step="0.5" value={rsvpDeadlineMonthsBefore} onChange={(e) => setRsvpDeadlineMonthsBefore(Number(e.target.value))} />
            </Field>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Anchors</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setAnchors((prev) => [...prev, { id: newId(), kind: "custom", title: "", reveals: [] }])}
            >
              Add anchor
            </Button>
          </div>
          {anchors.map((anchor, i) => (
            <div key={anchor.id} className="flex flex-col gap-2 rounded-md border border-line p-3">
              <div className="flex gap-2">
                <Select
                  value={anchor.kind}
                  onChange={(e) => setAnchors((prev) => prev.map((a, ai) => (ai === i ? { ...a, kind: e.target.value as AnchorKind } : a)))}
                  className="max-w-40"
                >
                  {ANCHOR_KINDS.map((k) => (
                    <option key={k} value={k}>
                      {k.replace(/_/g, " ")}
                    </option>
                  ))}
                </Select>
                <Input
                  value={anchor.title}
                  onChange={(e) => setAnchors((prev) => prev.map((a, ai) => (ai === i ? { ...a, title: e.target.value } : a)))}
                  placeholder="Title"
                />
                <Input
                  type="date"
                  value={anchor.date ?? ""}
                  onChange={(e) => setAnchors((prev) => prev.map((a, ai) => (ai === i ? { ...a, date: e.target.value || undefined } : a)))}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => setAnchors((prev) => prev.filter((_, ai) => ai !== i))}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
              {anchor.kind === "engagement_party" && (
                <div className="flex flex-wrap gap-4 pl-1 text-xs text-ink-soft">
                  Reveals:
                  {REVEAL_OPTIONS.map((r) => (
                    <label key={r} className="flex items-center gap-1.5">
                      <Checkbox
                        checked={anchor.reveals.includes(r)}
                        onChange={() =>
                          setAnchors((prev) =>
                            prev.map((a, ai) =>
                              ai === i ? { ...a, reveals: a.reveals.includes(r) ? a.reveals.filter((x) => x !== r) : [...a.reveals, r] } : a,
                            ),
                          )
                        }
                      />
                      {r.replace(/_/g, " ")}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Travel windows</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setWindows((prev) => [...prev, { id: newId(), label: "", start: "", end: "", location: "" }])}
            >
              Add window
            </Button>
          </div>
          {windows.map((w, i) => (
            <div key={w.id} className="flex flex-wrap gap-2 rounded-md border border-line p-3">
              <Input
                value={w.label}
                onChange={(e) => setWindows((prev) => prev.map((x, xi) => (xi === i ? { ...x, label: e.target.value } : x)))}
                placeholder="Label"
                className="max-w-32"
              />
              <Input
                value={w.location}
                onChange={(e) => setWindows((prev) => prev.map((x, xi) => (xi === i ? { ...x, location: e.target.value } : x)))}
                placeholder="Location"
                className="max-w-32"
              />
              <Input type="date" value={w.start} onChange={(e) => setWindows((prev) => prev.map((x, xi) => (xi === i ? { ...x, start: e.target.value } : x)))} />
              <Input type="date" value={w.end} onChange={(e) => setWindows((prev) => prev.map((x, xi) => (xi === i ? { ...x, end: e.target.value } : x)))} />
              <Button type="button" variant="ghost" size="icon" onClick={() => setWindows((prev) => prev.filter((_, xi) => xi !== i))}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </section>
      </DialogBody>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </DialogFooter>
    </Dialog>
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

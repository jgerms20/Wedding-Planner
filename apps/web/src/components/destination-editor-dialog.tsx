"use client";

import { newId, nowIso, type Destination } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function DestinationEditorDialog({
  open,
  onOpenChange,
  weddingId,
  destination,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  destination?: Destination;
  onSave: (destination: Destination) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(destination ? toForm(destination) : emptyForm());
  }, [open, destination]);

  async function handleSave() {
    const now = nowIso();
    const entity: Destination = {
      id: destination?.id ?? newId(),
      weddingId,
      name: form.name,
      country: form.country,
      region: form.region || undefined,
      notes: form.notes || undefined,
      travelCostPerGuestEstimate: numberOrUndefined(form.travelCostPerGuestEstimate),
      lodgingPerNightEstimate: numberOrUndefined(form.lodgingPerNightEstimate),
      attendanceRateEstimate: numberOrUndefined(form.attendanceRateEstimate),
      weatherNotes: form.weatherNotes || undefined,
      legalNotes: form.legalNotes || undefined,
      seasonNotes: form.seasonNotes || undefined,
      sourceUrls: destination?.sourceUrls ?? [],
      favoritedBy: destination?.favoritedBy,
      sortOrder: destination?.sortOrder,
      createdAt: destination?.createdAt ?? now,
      updatedAt: now,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{destination ? "Edit destination" : "Add destination"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3.5">
        <Row>
          <Field label="Name">
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              data-testid="destination-name"
            />
          </Field>
          <Field label="Country">
            <Input
              value={form.country}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
              data-testid="destination-country"
            />
          </Field>
        </Row>
        <Field label="Region (optional)">
          <Input value={form.region} onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))} />
        </Field>
        <Row>
          <Field label="Travel cost / guest ($)">
            <Input type="number" value={form.travelCostPerGuestEstimate} onChange={(e) => setForm((f) => ({ ...f, travelCostPerGuestEstimate: e.target.value }))} />
          </Field>
          <Field label="Lodging / night ($)">
            <Input type="number" value={form.lodgingPerNightEstimate} onChange={(e) => setForm((f) => ({ ...f, lodgingPerNightEstimate: e.target.value }))} />
          </Field>
          <Field label="Attendance rate (0-1)">
            <Input type="number" step="0.05" min={0} max={1} value={form.attendanceRateEstimate} onChange={(e) => setForm((f) => ({ ...f, attendanceRateEstimate: e.target.value }))} />
          </Field>
        </Row>
        <Field label="Weather notes">
          <Textarea value={form.weatherNotes} onChange={(e) => setForm((f) => ({ ...f, weatherNotes: e.target.value }))} />
        </Field>
        <Field label="Legal notes">
          <Textarea value={form.legalNotes} onChange={(e) => setForm((f) => ({ ...f, legalNotes: e.target.value }))} placeholder="Residency days, apostilles… always confirm with an attorney." />
        </Field>
        <Field label="Season notes">
          <Textarea value={form.seasonNotes} onChange={(e) => setForm((f) => ({ ...f, seasonNotes: e.target.value }))} />
        </Field>
        <Field label="Notes">
          <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
        </Field>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!form.name || !form.country}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function emptyForm() {
  return {
    name: "",
    country: "",
    region: "",
    notes: "",
    travelCostPerGuestEstimate: "",
    lodgingPerNightEstimate: "",
    attendanceRateEstimate: "",
    weatherNotes: "",
    legalNotes: "",
    seasonNotes: "",
  };
}

function toForm(d: Destination) {
  return {
    name: d.name,
    country: d.country,
    region: d.region ?? "",
    notes: d.notes ?? "",
    travelCostPerGuestEstimate: d.travelCostPerGuestEstimate?.toString() ?? "",
    lodgingPerNightEstimate: d.lodgingPerNightEstimate?.toString() ?? "",
    attendanceRateEstimate: d.attendanceRateEstimate?.toString() ?? "",
    weatherNotes: d.weatherNotes ?? "",
    legalNotes: d.legalNotes ?? "",
    seasonNotes: d.seasonNotes ?? "",
  };
}

function numberOrUndefined(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">{children}</div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="eyebrow">{label}</Label>
      {children}
    </div>
  );
}

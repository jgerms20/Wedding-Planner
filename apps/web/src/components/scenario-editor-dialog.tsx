"use client";

import { newId, nowIso, type Destination, type Scenario, type Venue } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ScenarioEditorDialog({
  open,
  onOpenChange,
  weddingId,
  destinations,
  venues,
  scenario,
  initialDestinationId,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  destinations: Destination[];
  venues: Venue[];
  scenario?: Scenario;
  /** Preselects the destination when the dialog is launched from a destination card, not the matrix. */
  initialDestinationId?: string;
  onSave: (scenario: Scenario) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(scenario ? toForm(scenario) : emptyForm(initialDestinationId));
  }, [open, scenario, initialDestinationId]);

  const availableVenues = venues.filter((v) => v.destinationId === form.destinationId);

  async function handleSave() {
    const now = nowIso();
    const entity: Scenario = {
      id: scenario?.id ?? newId(),
      weddingId,
      name: form.name,
      destinationId: form.destinationId || undefined,
      venueId: form.venueId || undefined,
      dateStart: form.dateStart || undefined,
      dateEnd: form.dateEnd || undefined,
      guestAssumption: Number(form.guestAssumption) || 0,
      attendanceRate: Number(form.attendanceRate) || 0,
      fixedCosts: Number(form.fixedCosts) || 0,
      perGuestCost: Number(form.perGuestCost) || 0,
      travelCostPerGuest: Number(form.travelCostPerGuest) || 0,
      notes: form.notes || undefined,
      pinned: scenario?.pinned ?? false,
      createdAt: scenario?.createdAt ?? now,
      updatedAt: now,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{scenario ? "Edit scenario" : "New scenario"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3.5">
        <Field label="Name">
          <Input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Plan A — Tulum, October"
            data-testid="scenario-name"
          />
        </Field>
        <Row>
          <Field label="Destination">
            <Select value={form.destinationId} onChange={(e) => setForm((f) => ({ ...f, destinationId: e.target.value, venueId: "" }))}>
              <option value="">—</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Venue">
            <Select value={form.venueId} onChange={(e) => setForm((f) => ({ ...f, venueId: e.target.value }))} disabled={!form.destinationId}>
              <option value="">—</option>
              {availableVenues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </Select>
          </Field>
        </Row>
        <Row>
          <Field label="Start date">
            <Input type="date" value={form.dateStart} onChange={(e) => setForm((f) => ({ ...f, dateStart: e.target.value }))} />
          </Field>
          <Field label="End date">
            <Input type="date" value={form.dateEnd} onChange={(e) => setForm((f) => ({ ...f, dateEnd: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Guest assumption">
            <Input type="number" value={form.guestAssumption} onChange={(e) => setForm((f) => ({ ...f, guestAssumption: e.target.value }))} />
          </Field>
          <Field label="Attendance rate (0-1)">
            <Input type="number" step="0.05" min={0} max={1} value={form.attendanceRate} onChange={(e) => setForm((f) => ({ ...f, attendanceRate: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Fixed costs ($)">
            <Input type="number" value={form.fixedCosts} onChange={(e) => setForm((f) => ({ ...f, fixedCosts: e.target.value }))} />
          </Field>
          <Field label="Per-guest cost ($)">
            <Input type="number" value={form.perGuestCost} onChange={(e) => setForm((f) => ({ ...f, perGuestCost: e.target.value }))} />
          </Field>
          <Field label="Travel cost / guest ($)">
            <Input type="number" value={form.travelCostPerGuest} onChange={(e) => setForm((f) => ({ ...f, travelCostPerGuest: e.target.value }))} />
          </Field>
        </Row>
        <Field label="Unknowns / notes">
          <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Top three unknowns the Scout still needs to resolve…" />
        </Field>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!form.name}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function emptyForm(initialDestinationId?: string) {
  return {
    name: "",
    destinationId: initialDestinationId ?? "",
    venueId: "",
    dateStart: "",
    dateEnd: "",
    guestAssumption: "150",
    attendanceRate: "0.6",
    fixedCosts: "",
    perGuestCost: "",
    travelCostPerGuest: "",
    notes: "",
  };
}

function toForm(s: Scenario) {
  return {
    name: s.name,
    destinationId: s.destinationId ?? "",
    venueId: s.venueId ?? "",
    dateStart: s.dateStart ?? "",
    dateEnd: s.dateEnd ?? "",
    guestAssumption: String(s.guestAssumption),
    attendanceRate: String(s.attendanceRate),
    fixedCosts: String(s.fixedCosts),
    perGuestCost: String(s.perGuestCost),
    travelCostPerGuest: String(s.travelCostPerGuest),
    notes: s.notes ?? "",
  };
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

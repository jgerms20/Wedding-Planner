"use client";

import { newId, nowIso, venueStatusSchema, type Venue, type VenueStatus } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function VenueEditorDialog({
  open,
  onOpenChange,
  weddingId,
  destinationId,
  venue,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  destinationId: string;
  venue?: Venue;
  onSave: (venue: Venue) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(venue ? toForm(venue) : emptyForm());
  }, [open, venue]);

  async function handleSave() {
    const now = nowIso();
    const entity: Venue = {
      id: venue?.id ?? newId(),
      weddingId,
      destinationId,
      name: form.name,
      website: form.website || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      capacity: numberOrUndefined(form.capacity),
      rentalFee: numberOrUndefined(form.rentalFee),
      fbMinimum: numberOrUndefined(form.fbMinimum),
      perGuestCost: numberOrUndefined(form.perGuestCost),
      inHouseCatering: form.inHouseCatering,
      lodgingOnSite: form.lodgingOnSite,
      styleNotes: form.styleNotes || undefined,
      availabilityNotes: form.availabilityNotes || undefined,
      status: form.status,
      sourceUrls: venue?.sourceUrls ?? [],
      createdAt: venue?.createdAt ?? now,
      updatedAt: now,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{venue ? "Edit venue" : "Add venue"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <Row>
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as VenueStatus }))}>
              {venueStatusSchema.options.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
        </Row>
        <Row>
          <Field label="Website">
            <Input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
          </Field>
          <Field label="Email">
            <Input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </Field>
          <Field label="Phone">
            <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Capacity">
            <Input type="number" value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))} />
          </Field>
          <Field label="Rental fee ($)">
            <Input type="number" value={form.rentalFee} onChange={(e) => setForm((f) => ({ ...f, rentalFee: e.target.value }))} />
          </Field>
          <Field label="F&B minimum ($)">
            <Input type="number" value={form.fbMinimum} onChange={(e) => setForm((f) => ({ ...f, fbMinimum: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Per-guest cost ($)">
            <Input type="number" value={form.perGuestCost} onChange={(e) => setForm((f) => ({ ...f, perGuestCost: e.target.value }))} />
          </Field>
          <Field label="In-house catering">
            <label className="flex h-9 items-center gap-2 text-sm">
              <Checkbox checked={form.inHouseCatering} onChange={(e) => setForm((f) => ({ ...f, inHouseCatering: e.target.checked }))} />
              Yes
            </label>
          </Field>
          <Field label="Lodging on site">
            <label className="flex h-9 items-center gap-2 text-sm">
              <Checkbox checked={form.lodgingOnSite} onChange={(e) => setForm((f) => ({ ...f, lodgingOnSite: e.target.checked }))} />
              Yes
            </label>
          </Field>
        </Row>
        <Field label="Style notes">
          <Textarea value={form.styleNotes} onChange={(e) => setForm((f) => ({ ...f, styleNotes: e.target.value }))} />
        </Field>
        <Field label="Availability notes">
          <Textarea value={form.availabilityNotes} onChange={(e) => setForm((f) => ({ ...f, availabilityNotes: e.target.value }))} />
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

function emptyForm() {
  return {
    name: "",
    website: "",
    email: "",
    phone: "",
    capacity: "",
    rentalFee: "",
    fbMinimum: "",
    perGuestCost: "",
    inHouseCatering: false,
    lodgingOnSite: false,
    styleNotes: "",
    availabilityNotes: "",
    status: "idea" as VenueStatus,
  };
}

function toForm(v: Venue) {
  return {
    name: v.name,
    website: v.website ?? "",
    email: v.email ?? "",
    phone: v.phone ?? "",
    capacity: v.capacity?.toString() ?? "",
    rentalFee: v.rentalFee?.toString() ?? "",
    fbMinimum: v.fbMinimum?.toString() ?? "",
    perGuestCost: v.perGuestCost?.toString() ?? "",
    inHouseCatering: v.inHouseCatering ?? false,
    lodgingOnSite: v.lodgingOnSite ?? false,
    styleNotes: v.styleNotes ?? "",
    availabilityNotes: v.availabilityNotes ?? "",
    status: v.status,
  };
}

function numberOrUndefined(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

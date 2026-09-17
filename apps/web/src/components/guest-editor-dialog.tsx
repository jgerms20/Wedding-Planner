"use client";

import { newId, nowIso, sideSchema, tierSchema, type Guest, type Household, type Side, type Tier } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function GuestEditorDialog({
  open,
  onOpenChange,
  weddingId,
  households,
  guest,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  households: Household[];
  guest?: Guest;
  onSave: (guest: Guest) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(guest ? toForm(guest) : emptyForm());
  }, [open, guest]);

  async function handleSave() {
    const now = nowIso();
    const entity: Guest = {
      id: guest?.id ?? newId(),
      weddingId,
      householdId: form.householdId || undefined,
      firstName: form.firstName,
      lastName: form.lastName || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      side: form.side,
      tier: form.tier,
      relationship: form.relationship || undefined,
      plusOne: form.plusOne,
      isChild: form.isChild,
      dietary: form.dietary || undefined,
      homeCity: form.homeCity || undefined,
      tags: guest?.tags ?? [],
      rsvp: guest?.rsvp ?? {},
      createdAt: guest?.createdAt ?? now,
      updatedAt: now,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{guest ? "Edit guest" : "Add guest"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <Row>
          <Field label="First name">
            <Input value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
          </Field>
          <Field label="Last name">
            <Input value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
          </Field>
        </Row>
        <Field label="Household (optional)">
          <Select value={form.householdId} onChange={(e) => setForm((f) => ({ ...f, householdId: e.target.value }))}>
            <option value="">—</option>
            {households.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </Select>
        </Field>
        <Row>
          <Field label="Side">
            <Select value={form.side} onChange={(e) => setForm((f) => ({ ...f, side: e.target.value as Side }))}>
              {sideSchema.options.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Tier">
            <Select value={form.tier} onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value as Tier }))}>
              {tierSchema.options.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
        </Row>
        <Row>
          <Field label="Email">
            <Input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </Field>
          <Field label="Home city">
            <Input value={form.homeCity} onChange={(e) => setForm((f) => ({ ...f, homeCity: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Relationship">
            <Input value={form.relationship} onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value }))} placeholder="College friend" />
          </Field>
          <Field label="Dietary">
            <Input value={form.dietary} onChange={(e) => setForm((f) => ({ ...f, dietary: e.target.value }))} />
          </Field>
        </Row>
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2">
            <Checkbox checked={form.plusOne} onChange={(e) => setForm((f) => ({ ...f, plusOne: e.target.checked }))} />
            Plus-one
          </label>
          <label className="flex items-center gap-2">
            <Checkbox checked={form.isChild} onChange={(e) => setForm((f) => ({ ...f, isChild: e.target.checked }))} />
            Child
          </label>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!form.firstName}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function emptyForm() {
  return {
    firstName: "",
    lastName: "",
    householdId: "",
    email: "",
    phone: "",
    side: "both" as Side,
    tier: "should" as Tier,
    relationship: "",
    plusOne: false,
    isChild: false,
    dietary: "",
    homeCity: "",
  };
}

function toForm(g: Guest) {
  return {
    firstName: g.firstName,
    lastName: g.lastName ?? "",
    householdId: g.householdId ?? "",
    email: g.email ?? "",
    phone: g.phone ?? "",
    side: g.side,
    tier: g.tier,
    relationship: g.relationship ?? "",
    plusOne: g.plusOne,
    isChild: g.isChild,
    dietary: g.dietary ?? "",
    homeCity: g.homeCity ?? "",
  };
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

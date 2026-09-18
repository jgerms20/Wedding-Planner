"use client";

import { newId, sideSchema, type Side, type WeddingPartyMember } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PartyMemberEditorDialog({
  open,
  onOpenChange,
  weddingId,
  member,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  member?: WeddingPartyMember;
  onSave: (member: WeddingPartyMember) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(member ? toForm(member) : emptyForm());
  }, [open, member]);

  async function handleSave() {
    const entity: WeddingPartyMember = {
      id: member?.id ?? newId(),
      weddingId,
      name: form.name,
      role: form.role,
      side: form.side,
      asked: form.asked,
      askedDate: form.askedDate || undefined,
      contact: form.contact || undefined,
      notes: form.notes || undefined,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{member ? "Edit party member" : "Add party member"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <Row>
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </Field>
          <Field label="Role">
            <Input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="Honor attendant" />
          </Field>
        </Row>
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
          <Field label="Contact">
            <Input value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} />
          </Field>
        </Row>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={form.asked} onChange={(e) => setForm((f) => ({ ...f, asked: e.target.checked }))} />
            Asked
          </label>
          {form.asked && (
            <Input type="date" value={form.askedDate} onChange={(e) => setForm((f) => ({ ...f, askedDate: e.target.value }))} className="max-w-40" />
          )}
        </div>
        <Field label="Notes">
          <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Duties, attire, dates they must hold, costs they bear…" />
        </Field>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!form.name || !form.role}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function emptyForm() {
  return { name: "", role: "", side: "both" as Side, asked: false, askedDate: "", contact: "", notes: "" };
}

function toForm(m: WeddingPartyMember) {
  return {
    name: m.name,
    role: m.role,
    side: m.side,
    asked: m.asked,
    askedDate: m.askedDate ?? "",
    contact: m.contact ?? "",
    notes: m.notes ?? "",
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

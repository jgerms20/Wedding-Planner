"use client";

import { newId, subEventKindSchema, type SubEvent, type SubEventKind } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function SubEventEditorDialog({
  open,
  onOpenChange,
  weddingId,
  subEvent,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  subEvent?: SubEvent;
  onSave: (subEvent: SubEvent) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(subEvent ? toForm(subEvent) : emptyForm());
  }, [open, subEvent]);

  async function handleSave() {
    const entity: SubEvent = {
      id: subEvent?.id ?? newId(),
      weddingId,
      kind: form.kind,
      title: form.title,
      date: form.date || undefined,
      location: form.location || undefined,
      hostName: form.hostName || undefined,
      budgetEstimate: form.budgetEstimate ? Number(form.budgetEstimate) : undefined,
      notes: form.notes || undefined,
      guestRule: form.guestRule || undefined,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{subEvent ? "Edit event" : "Add event"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <Row>
          <Field label="Kind">
            <Select value={form.kind} onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value as SubEventKind }))}>
              {subEventKindSchema.options.map((k) => (
                <option key={k} value={k}>
                  {k.replace(/_/g, " ")}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Title">
            <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Date">
            <Input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
          </Field>
          <Field label="Host">
            <Input value={form.hostName} onChange={(e) => setForm((f) => ({ ...f, hostName: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Location">
            <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
          </Field>
          <Field label="Budget estimate ($)">
            <Input type="number" value={form.budgetEstimate} onChange={(e) => setForm((f) => ({ ...f, budgetEstimate: e.target.value }))} />
          </Field>
        </Row>
        <Field label="Guest rule">
          <Input value={form.guestRule} onChange={(e) => setForm((f) => ({ ...f, guestRule: e.target.value }))} placeholder="Wedding party + partners only" />
        </Field>
        <Field label="Notes">
          <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
        </Field>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!form.title}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function emptyForm() {
  return {
    kind: "other" as SubEventKind,
    title: "",
    date: "",
    location: "",
    hostName: "",
    budgetEstimate: "",
    notes: "",
    guestRule: "",
  };
}

function toForm(s: SubEvent) {
  return {
    kind: s.kind,
    title: s.title,
    date: s.date ?? "",
    location: s.location ?? "",
    hostName: s.hostName ?? "",
    budgetEstimate: s.budgetEstimate?.toString() ?? "",
    notes: s.notes ?? "",
    guestRule: s.guestRule ?? "",
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

"use client";

import { eventKindSchema, newId, type Event, type EventKind } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

/** A plain dated entry for the calendar — for a one-off thing to remember (a tour, a deadline, a
 * call) that doesn't warrant a full task or satellite event. */
export function EventEditorDialog({
  open,
  onOpenChange,
  weddingId,
  event,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  event?: Event;
  onSave: (event: Event) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());

  useEffect(() => {
    if (!open) return;
    setForm(event ? toForm(event) : emptyForm());
  }, [open, event]);

  async function handleSave() {
    if (!form.title || !form.date) return;
    const entity: Event = {
      id: event?.id ?? newId(),
      weddingId,
      title: form.title,
      startsAt: form.date,
      allDay: form.allDay,
      kind: form.kind,
      linkedType: event?.linkedType,
      linkedId: event?.linkedId,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{event ? "Edit event" : "Add event"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <Field label="Title">
          <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Venue tour, vendor call, deadline…" />
        </Field>
        <Row>
          <Field label="Date">
            <Input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
          </Field>
          <Field label="Kind">
            <Select value={form.kind} onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value as EventKind }))}>
              {eventKindSchema.options.map((k) => (
                <option key={k} value={k}>
                  {k.replace(/_/g, " ")}
                </option>
              ))}
            </Select>
          </Field>
        </Row>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={form.allDay} onChange={(e) => setForm((f) => ({ ...f, allDay: e.target.checked }))} />
          All day
        </label>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!form.title || !form.date}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function emptyForm() {
  return { title: "", date: "", allDay: true, kind: "other" as EventKind };
}

function toForm(e: Event) {
  return { title: e.title, date: e.startsAt.slice(0, 10), allDay: e.allDay, kind: e.kind };
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

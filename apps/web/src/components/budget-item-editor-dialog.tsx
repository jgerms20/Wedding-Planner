"use client";

import { newId, nowIso, type BudgetCategory, type BudgetItem } from "@bower/shared";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function BudgetItemEditorDialog({
  open,
  onOpenChange,
  weddingId,
  categories,
  defaultCategoryId,
  item,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  categories: BudgetCategory[];
  defaultCategoryId?: string;
  item?: BudgetItem;
  onSave: (item: BudgetItem) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm(defaultCategoryId));

  useEffect(() => {
    if (!open) return;
    setForm(item ? toForm(item) : emptyForm(defaultCategoryId));
  }, [open, item, defaultCategoryId]);

  async function handleSave() {
    const now = nowIso();
    const entity: BudgetItem = {
      id: item?.id ?? newId(),
      weddingId,
      categoryId: form.categoryId,
      name: form.name,
      estimate: numberOrUndefined(form.estimate),
      quoted: numberOrUndefined(form.quoted),
      contracted: numberOrUndefined(form.contracted),
      paid: numberOrUndefined(form.paid),
      dueDate: form.dueDate || undefined,
      notes: form.notes || undefined,
      createdAt: item?.createdAt ?? now,
      updatedAt: now,
    };
    await onSave(entity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>{item ? "Edit budget item" : "Add budget item"}</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <Row>
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </Field>
          <Field label="Category">
            <Select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
        </Row>
        <Row>
          <Field label="Estimate ($)">
            <Input type="number" value={form.estimate} onChange={(e) => setForm((f) => ({ ...f, estimate: e.target.value }))} />
          </Field>
          <Field label="Quoted ($)">
            <Input type="number" value={form.quoted} onChange={(e) => setForm((f) => ({ ...f, quoted: e.target.value }))} />
          </Field>
        </Row>
        <Row>
          <Field label="Contracted ($)">
            <Input type="number" value={form.contracted} onChange={(e) => setForm((f) => ({ ...f, contracted: e.target.value }))} />
          </Field>
          <Field label="Paid ($)">
            <Input type="number" value={form.paid} onChange={(e) => setForm((f) => ({ ...f, paid: e.target.value }))} />
          </Field>
        </Row>
        <Field label="Due date">
          <Input type="date" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
        </Field>
        <Field label="Notes">
          <Textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
        </Field>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!form.name || !form.categoryId}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function emptyForm(defaultCategoryId?: string) {
  return {
    name: "",
    categoryId: defaultCategoryId ?? "",
    estimate: "",
    quoted: "",
    contracted: "",
    paid: "",
    dueDate: "",
    notes: "",
  };
}

function toForm(item: BudgetItem) {
  return {
    name: item.name,
    categoryId: item.categoryId,
    estimate: item.estimate?.toString() ?? "",
    quoted: item.quoted?.toString() ?? "",
    contracted: item.contracted?.toString() ?? "",
    paid: item.paid?.toString() ?? "",
    dueDate: item.dueDate ?? "",
    notes: item.notes ?? "",
  };
}

function numberOrUndefined(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
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

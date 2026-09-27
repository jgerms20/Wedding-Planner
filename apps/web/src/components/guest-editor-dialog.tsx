"use client";

import { DEFAULT_TIER, guestDisplayName, newId, nowIso, sideSchema, TIER_LABELS, TIERS, WEDDING_ROLES, type Guest, type Household, type Side, type Tier } from "@bower/shared";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { sideLabel } from "@/lib/side-label";

/** Any detail beyond the default first-name + tier flow — presence of one of these means an
 * edited guest should open with details already expanded, so nothing looks lost. */
function hasDetails(g: Guest): boolean {
  return Boolean(
    g.lastName || g.householdId || g.email || g.relationship || g.notes || g.dietary || g.homeCity || g.plusOne || g.isChild || g.side !== "both" || g.role || g.withGuestIds?.length,
  );
}

export function GuestEditorDialog({
  open,
  onOpenChange,
  weddingId,
  households,
  guests = [],
  guest,
  partnerAName,
  partnerBName,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  households: Household[];
  /** Everyone else on the list, for "goes with". */
  guests?: Guest[];
  guest?: Guest;
  partnerAName: string;
  partnerBName: string;
  onSave: (guest: Guest) => Promise<void>;
}) {
  const [form, setForm] = useState(() => emptyForm());
  const [showDetails, setShowDetails] = useState(false);
  const [withQuery, setWithQuery] = useState("");
  const others = useMemo(() => guests.filter((g) => g.id !== guest?.id), [guests, guest?.id]);
  const withMatches = useMemo(() => {
    const q = withQuery.trim().toLowerCase();
    if (!q) return [];
    return others
      .filter((g) => !form.withGuestIds.includes(g.id) && [g.firstName, g.lastName, g.relationship].some((f) => f?.toLowerCase().includes(q)))
      .slice(0, 6);
  }, [withQuery, others, form.withGuestIds]);

  useEffect(() => {
    if (!open) return;
    setForm(guest ? toForm(guest) : emptyForm());
    setShowDetails(guest ? hasDetails(guest) : false);
    setWithQuery("");
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
      plusOneCount: form.plusOne && form.plusOneCount > 1 ? form.plusOneCount : undefined,
      isChild: form.isChild,
      dietary: form.dietary || undefined,
      homeCity: form.homeCity || undefined,
      notes: form.notes || undefined,
      role: form.role.trim() || undefined,
      withGuestIds: form.withGuestIds.length ? form.withGuestIds : undefined,
      sortOrder: guest && guest.tier === form.tier ? guest.sortOrder : undefined,
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
            <Input
              value={form.firstName}
              onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
              placeholder="Marcus"
              autoFocus
            />
          </Field>
          <Field label="Tier">
            <Select value={form.tier} onChange={(e) => setForm((f) => ({ ...f, tier: Number(e.target.value) as Tier }))}>
              {TIERS.map((t) => (
                <option key={t} value={t}>
                  Tier {t} — {TIER_LABELS[t]}
                </option>
              ))}
            </Select>
          </Field>
        </Row>

        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          className="inline-flex w-fit items-center gap-1 text-xs text-ink-soft transition-colors hover:text-coral"
        >
          {showDetails ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          {showDetails ? "Hide details" : "Add details"}
        </button>

        {showDetails && (
          <div className="flex flex-col gap-3">
            <Row>
              <Field label="Last name">
                <Input value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
              </Field>
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
            </Row>
            <Row>
              <Field label="Side">
                <Select value={form.side} onChange={(e) => setForm((f) => ({ ...f, side: e.target.value as Side }))}>
                  {sideSchema.options.map((s) => (
                    <option key={s} value={s}>
                      {sideLabel(s, partnerAName, partnerBName)}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Email">
                <Input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              </Field>
            </Row>
            <Row>
              <Field label="Home city">
                <Input value={form.homeCity} onChange={(e) => setForm((f) => ({ ...f, homeCity: e.target.value }))} />
              </Field>
              <Field label="Relationship">
                <Input value={form.relationship} onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value }))} placeholder="College friend" />
              </Field>
            </Row>
            <Row>
              <Field label="Dietary">
                <Input value={form.dietary} onChange={(e) => setForm((f) => ({ ...f, dietary: e.target.value }))} />
              </Field>
              <Field label="Notes">
                <Input value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="maybe +1, girl from CLT" />
              </Field>
            </Row>
            <Row>
              <Field label="Wedding party role">
                <Input
                  list="wedding-roles"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder="Groomsman, flower girl…"
                />
                <datalist id="wedding-roles">
                  {WEDDING_ROLES.map((r) => (
                    <option key={r} value={r} />
                  ))}
                </datalist>
              </Field>
              <Field label="Goes with">
                <div className="relative">
                  <Input value={withQuery} onChange={(e) => setWithQuery(e.target.value)} placeholder="Type a name, e.g. Dion" />
                  {withMatches.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-line bg-card text-sm shadow-lg">
                      {withMatches.map((g) => (
                        <li key={g.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, withGuestIds: [...f.withGuestIds, g.id] }));
                              setWithQuery("");
                            }}
                            className="w-full px-3 py-1.5 text-left hover:bg-paper-deep"
                          >
                            {guestDisplayName(g)}
                            {g.relationship && <span className="ml-1.5 text-xs text-ink-mute">{g.relationship}</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Field>
            </Row>
            {form.withGuestIds.length > 0 && (
              <div className="-mt-1 flex flex-wrap gap-1.5">
                {form.withGuestIds.map((id) => {
                  const other = others.find((g) => g.id === id);
                  if (!other) return null;
                  return (
                    <span key={id} className="inline-flex items-center gap-1 rounded-full border border-line bg-paper-deep/60 px-2 py-0.5 text-xs">
                      with {guestDisplayName(other)}
                      <button
                        type="button"
                        aria-label={`Unlink ${guestDisplayName(other)}`}
                        onClick={() => setForm((f) => ({ ...f, withGuestIds: f.withGuestIds.filter((x) => x !== id) }))}
                        className="rounded-full text-ink-mute hover:text-foreground"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <label className="flex items-center gap-2">
                <Checkbox checked={form.plusOne} onChange={(e) => setForm((f) => ({ ...f, plusOne: e.target.checked }))} />
                Plus-one
              </label>
              {form.plusOne && (
                <label className="flex items-center gap-2 text-ink-soft">
                  bringing
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={form.plusOneCount}
                    onChange={(e) => setForm((f) => ({ ...f, plusOneCount: Math.max(1, Math.min(10, Number(e.target.value) || 1)) }))}
                    className="h-8 w-16"
                  />
                </label>
              )}
              <label className="flex items-center gap-2">
                <Checkbox checked={form.isChild} onChange={(e) => setForm((f) => ({ ...f, isChild: e.target.checked }))} />
                Child
              </label>
            </div>
          </div>
        )}
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
    tier: DEFAULT_TIER as Tier,
    relationship: "",
    notes: "",
    plusOne: false,
    plusOneCount: 1,
    isChild: false,
    dietary: "",
    homeCity: "",
    role: "",
    withGuestIds: [] as string[],
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
    notes: g.notes ?? "",
    plusOne: g.plusOne,
    plusOneCount: g.plusOneCount ?? 1,
    isChild: g.isChild,
    dietary: g.dietary ?? "",
    homeCity: g.homeCity ?? "",
    role: g.role ?? "",
    withGuestIds: g.withGuestIds ?? [],
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

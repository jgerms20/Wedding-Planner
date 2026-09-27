"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
  CHECK_SPELLING_TAG,
  findPossibleDuplicates,
  guestDisplayName,
  guestHeadcount,
  mergeGuests,
  newId,
  nowIso,
  orderGuests,
  sideSchema,
  TIER_LABELS,
  TIERS,
  type Guest,
  type Household,
  type Side,
  type Tier,
} from "@bower/shared";
import { ListPlus, Plus, Search, X } from "lucide-react";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { GuestEditorDialog } from "@/components/guest-editor-dialog";
import { BulkAddDialog } from "@/components/guests/bulk-add-dialog";
import { DuplicatesPanel } from "@/components/guests/duplicates-panel";
import { GuestRow } from "@/components/guests/guest-row";
import { HeadcountCard } from "@/components/guests/headcount-card";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { LoadingState } from "@/components/loading-state";
import { useRepoContext } from "@/lib/repo-context";
import { sideLabel } from "@/lib/side-label";
import { cn } from "@/lib/utils";
import { useEntityList } from "@/lib/use-entity-list";

const SIDE_FILTER_ALL = "__all__";
const CHECK_FILTER = "__check__";
const PARTY_FILTER = "__party__";

type TierOrder = Record<Tier, string[]>;
const tierDropId = (tier: Tier) => `tier-${tier}`;

export default function GuestsPage() {
  const { repo, wedding, settings, reloadSettings } = useRepoContext();
  const weddingId = wedding?.id;
  const partnerAName = wedding?.partnerA.name ?? "Partner A";
  const partnerBName = wedding?.partnerB.name ?? "Partner B";
  const [sideFilter, setSideFilter] = useState<string>(SIDE_FILTER_ALL);
  const [query, setQuery] = useState("");
  const [throughTier, setThroughTier] = useState<Tier>(5);

  const loadGuests = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.guests.list(weddingId);
  }, [repo, weddingId]);
  const { items: guests, reload: reloadGuests } = useEntityList(loadGuests);

  const loadHouseholds = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.households.list(weddingId);
  }, [repo, weddingId]);
  const { items: households, reload: reloadHouseholds } = useEntityList(loadHouseholds);

  const [guestDialog, setGuestDialog] = useState<{ open: boolean; guest?: Guest }>({ open: false });
  const [bulkOpen, setBulkOpen] = useState(false);
  const [householdDialog, setHouseholdDialog] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const lastSelected = useRef<string | null>(null);
  const [removed, setRemoved] = useState<Guest[] | null>(null);
  const [busy, setBusy] = useState(false);

  const byId = useMemo(() => new Map(guests.map((g) => [g.id, g])), [guests]);
  const filtering = query.trim() !== "" || sideFilter !== SIDE_FILTER_ALL;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guests.filter((g) => {
      if (sideFilter === CHECK_FILTER && !g.tags.includes(CHECK_SPELLING_TAG)) return false;
      if (sideFilter === PARTY_FILTER && !g.role) return false;
      if (sideFilter !== SIDE_FILTER_ALL && sideFilter !== CHECK_FILTER && sideFilter !== PARTY_FILTER && g.side !== sideFilter) return false;
      if (!q) return true;
      return [g.firstName, g.lastName, g.relationship, g.notes, g.role].some((field) => field?.toLowerCase().includes(q));
    });
  }, [guests, sideFilter, query]);

  // Family first by default; anything dragged keeps the couple's own order.
  const baseOrder = useMemo(
    () => Object.fromEntries(TIERS.map((t) => [t, orderGuests(visible.filter((g) => g.tier === t), guests).map((g) => g.id)])) as TierOrder,
    [visible, guests],
  );
  const [dragOrder, setDragOrder] = useState<TierOrder | null>(null);
  const order = dragOrder ?? baseOrder;

  // One running number down the whole list, grouped by tier, so the count is always visible.
  const tierGroups = useMemo(() => {
    let number = 0;
    return TIERS.map((tier) => {
      const rows = order[tier].map((id) => byId.get(id)).filter((g): g is Guest => Boolean(g)).map((guest) => ({ guest, number: ++number }));
      return { tier, rows, people: rows.reduce((sum, r) => sum + guestHeadcount(r.guest), 0) };
    }).filter((group) => group.rows.length > 0 || !filtering);
  }, [order, byId, filtering]);
  const flatIds = useMemo(() => tierGroups.flatMap((g) => g.rows.map((r) => r.guest.id)), [tierGroups]);

  const duplicates = useMemo(() => findPossibleDuplicates(guests, settings?.notDuplicates), [guests, settings?.notDuplicates]);
  const checkCount = guests.filter((g) => g.tags.includes(CHECK_SPELLING_TAG)).length;
  const unsureCount = guests.filter((g) => g.side === "unsure").length;
  const partyCount = guests.filter((g) => g.role).length;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  if (!repo || !weddingId) return <LoadingState />;

  const tierOf = (id: string, o: TierOrder): Tier | undefined => {
    if (id.startsWith("tier-")) return Number(id.slice(5)) as Tier;
    return TIERS.find((t) => o[t].includes(id));
  };

  function onDragOver({ active, over }: DragOverEvent) {
    if (!over) return;
    setDragOrder((current) => {
      const o = current ?? baseOrder;
      const from = tierOf(String(active.id), o);
      const to = tierOf(String(over.id), o);
      if (!from || !to || from === to) return o;
      const target = o[to].filter((id) => id !== active.id);
      const at = String(over.id).startsWith("tier-") ? target.length : Math.max(0, target.indexOf(String(over.id)));
      target.splice(at, 0, String(active.id));
      return { ...o, [from]: o[from].filter((id) => id !== active.id), [to]: target };
    });
  }

  async function onDragEnd({ active, over }: DragEndEvent) {
    const o = dragOrder ?? baseOrder;
    const activeId = String(active.id);
    const tier = tierOf(activeId, o);
    if (!over || !tier) {
      setDragOrder(null);
      return;
    }
    let ids = o[tier];
    const overIndex = ids.indexOf(String(over.id));
    if (overIndex >= 0) ids = arrayMove(ids, ids.indexOf(activeId), overIndex);
    setDragOrder({ ...o, [tier]: ids });
    const now = nowIso();
    const writes = ids
      .map((id, index) => ({ guest: byId.get(id), index }))
      .filter(({ guest, index }) => guest && (guest.sortOrder !== index || guest.tier !== tier))
      .map(({ guest, index }) => repo!.guests.upsert({ ...guest!, tier, sortOrder: index, updatedAt: now }));
    await Promise.all(writes);
    await reloadGuests();
    setDragOrder(null);
  }

  function select(id: string, on: boolean, shiftKey: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      const anchor = lastSelected.current;
      if (shiftKey && anchor && flatIds.includes(anchor)) {
        const [a, b] = [flatIds.indexOf(anchor), flatIds.indexOf(id)].sort((x, y) => x - y);
        for (const rangeId of flatIds.slice(a!, b! + 1)) {
          if (on) next.add(rangeId);
          else next.delete(rangeId);
        }
      } else if (on) next.add(id);
      else next.delete(id);
      return next;
    });
    lastSelected.current = id;
  }

  async function bulkPatch(patch: Partial<Guest>) {
    setBusy(true);
    const now = nowIso();
    // A guest moved to another tier goes to the bottom of it, unless the couple drags it.
    const moving = patch.tier !== undefined;
    await Promise.all(
      [...selected].map((id) => byId.get(id)).filter((g): g is Guest => Boolean(g)).map((g) =>
        repo!.guests.upsert({ ...g, ...patch, ...(moving && g.tier !== patch.tier ? { sortOrder: undefined } : {}), updatedAt: now }),
      ),
    );
    await reloadGuests();
    setBusy(false);
  }

  async function removeGuests(ids: string[]) {
    const gone = ids.map((id) => byId.get(id)).filter((g): g is Guest => Boolean(g));
    await Promise.all(gone.map((g) => repo!.guests.remove(g.id)));
    setSelected((current) => new Set([...current].filter((id) => !ids.includes(id))));
    setRemoved(gone);
    await reloadGuests();
  }

  async function undoRemove() {
    if (!removed) return;
    await Promise.all(removed.map((g) => repo!.guests.upsert(g)));
    setRemoved(null);
    await reloadGuests();
  }

  /** Saves a guest and keeps "goes with" links two-way: if Tabria goes with Dion, Dion goes with Tabria. */
  async function saveGuest(guest: Guest) {
    const before = new Set(byId.get(guest.id)?.withGuestIds ?? []);
    const after = new Set(guest.withGuestIds ?? []);
    await repo!.guests.upsert(guest);
    const now = nowIso();
    const touched = [...new Set([...before, ...after])].map((id) => byId.get(id)).filter((g): g is Guest => Boolean(g));
    await Promise.all(
      touched.map((other) => {
        const links = new Set(other.withGuestIds ?? []);
        if (after.has(other.id)) links.add(guest.id);
        else links.delete(guest.id);
        const next = [...links];
        const same = next.length === (other.withGuestIds ?? []).length && next.every((id) => other.withGuestIds?.includes(id));
        return same ? Promise.resolve() : repo!.guests.upsert({ ...other, withGuestIds: next.length ? next : undefined, updatedAt: now });
      }),
    );
    await reloadGuests();
  }

  async function patchGuest(guest: Guest, patch: Partial<Guest>) {
    await repo!.guests.upsert({ ...guest, ...patch, updatedAt: nowIso() });
    await reloadGuests();
  }

  async function mergePair(a: Guest, b: Guest) {
    await repo!.guests.upsert(mergeGuests(a, b));
    await repo!.guests.remove(b.id);
    await reloadGuests();
  }

  async function markDifferent(key: string) {
    if (!settings) return;
    await repo!.saveSettings({ ...settings, notDuplicates: [...new Set([...(settings.notDuplicates ?? []), key])] });
    await reloadSettings();
  }

  const withNames = (g: Guest) => (g.withGuestIds ?? []).map((id) => byId.get(id)).filter((o): o is Guest => Boolean(o)).map((o) => guestDisplayName(o));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Guests"
        description={`${guests.length} on the list so far — rank them in tiers and watch the headcount.`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setBulkOpen(true)}>
              <ListPlus className="size-4 stroke-[1.5]" /> Add a list
            </Button>
            <Button size="sm" onClick={() => setGuestDialog({ open: true })}>
              <Plus className="size-4 stroke-[1.5]" /> Add guest
            </Button>
          </div>
        }
      />

      <HeadcountCard
        guests={guests}
        throughTier={throughTier}
        onThroughTierChange={setThroughTier}
        target={wedding?.guestTarget}
        partnerAName={partnerAName}
        partnerBName={partnerBName}
      />

      <DuplicatesPanel
        duplicates={duplicates}
        partnerAName={partnerAName}
        partnerBName={partnerBName}
        onMerge={(a, b) => void mergePair(a, b)}
        onDifferent={(pair) => void markDifferent(pair.key)}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[12rem] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ink-mute" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find someone" className="pl-8" />
        </div>
        <Select value={sideFilter} onChange={(e) => setSideFilter(e.target.value)} className="w-auto" aria-label="Filter by side">
          <option value={SIDE_FILTER_ALL}>Everyone</option>
          <option value="a">{partnerAName}&apos;s side</option>
          <option value="b">{partnerBName}&apos;s side</option>
          <option value="both">Both</option>
          {unsureCount > 0 && <option value="unsure">Not sure yet ({unsureCount})</option>}
          {partyCount > 0 && <option value={PARTY_FILTER}>Wedding party ({partyCount})</option>}
          {checkCount > 0 && <option value={CHECK_FILTER}>Check spelling ({checkCount})</option>}
        </Select>
        <button type="button" onClick={() => setHouseholdDialog(true)} className="text-sm text-ink-soft hover:text-coral">
          + Household
        </button>
      </div>

      {removed && (
        <div className="rise flex flex-wrap items-center gap-3 rounded-lg border border-line bg-card px-4 py-2.5 text-sm">
          <span className="text-ink-soft">
            Took {removed.length === 1 ? guestDisplayName(removed[0]!) : `${removed.length} people`} off the list.
          </span>
          <button type="button" onClick={() => void undoRemove()} className="font-medium text-coral hover:underline">
            Undo
          </button>
          <button type="button" onClick={() => setRemoved(null)} aria-label="Dismiss" className="ml-auto rounded-full p-1 text-ink-mute hover:bg-muted">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {guests.length === 0 ? (
        <div className="postcard rise flex flex-col items-start gap-3 p-8">
          <p className="text-[15px] text-ink-soft">No guests yet. Paste a list and I&apos;ll sort it out — you check it before anything&apos;s added.</p>
          <Button size="sm" onClick={() => setBulkOpen(true)}>
            <ListPlus className="size-4 stroke-[1.5]" /> Add a list
          </Button>
        </div>
      ) : visible.length === 0 ? (
        <p className="text-sm text-ink-soft">Nobody matches that.</p>
      ) : (
        <>
          <p className="-mt-3 text-xs text-ink-mute">
            {filtering
              ? "Clear the search and filter to drag people around."
              : "Drag the handle to reorder, or onto another tier. Tick boxes to move or change several at once (shift-click for a range)."}
          </p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={onDragOver} onDragEnd={(e) => void onDragEnd(e)} onDragCancel={() => setDragOrder(null)}>
            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-[0.65rem] font-semibold tracking-[0.14em] text-ink-mute uppercase">
                    <th className="w-16 py-3 pl-2">
                      <input
                        type="checkbox"
                        aria-label="Select everyone shown"
                        checked={flatIds.length > 0 && flatIds.every((id) => selected.has(id))}
                        onChange={(e) => setSelected(e.target.checked ? new Set(flatIds) : new Set())}
                        className="ml-5 accent-[var(--coral)]"
                      />
                    </th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Side</th>
                    <th className="p-3">Tier</th>
                    <th className="p-3 text-center">+1</th>
                    <th className="w-20 p-3" />
                  </tr>
                </thead>
                <tbody>
                  {tierGroups.map((group) => (
                    <TierSection key={group.tier} tier={group.tier} people={group.people} count={group.rows.length}>
                      <SortableContext items={group.rows.map((r) => r.guest.id)} strategy={verticalListSortingStrategy}>
                        {group.rows.map(({ guest, number }) => (
                          <GuestRow
                            key={guest.id}
                            guest={guest}
                            number={number}
                            partnerAName={partnerAName}
                            partnerBName={partnerBName}
                            withNames={withNames(guest)}
                            selected={selected.has(guest.id)}
                            onSelect={(on, shiftKey) => select(guest.id, on, shiftKey)}
                            dragEnabled={!filtering}
                            onOpen={() => setGuestDialog({ open: true, guest })}
                            onPatch={(patch) => void patchGuest(guest, patch)}
                            onRemove={() => void removeGuests([guest.id])}
                          />
                        ))}
                      </SortableContext>
                    </TierSection>
                  ))}
                </tbody>
              </table>
            </div>
          </DndContext>
        </>
      )}

      {selected.size > 0 && (
        <div
          className="sticky bottom-24 z-20 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-line bg-card px-4 py-3 text-sm shadow-lg md:bottom-4"
          data-testid="guests-bulk-bar"
        >
          <span className="font-medium">{selected.size} selected</span>
          <button type="button" onClick={() => setSelected(new Set())} className="text-ink-soft hover:text-foreground">
            Clear
          </button>
          <span className="flex items-center gap-1">
            <span className="text-ink-soft">Tier</span>
            {TIERS.map((t) => (
              <button
                key={t}
                type="button"
                disabled={busy}
                onClick={() => void bulkPatch({ tier: t })}
                title={TIER_LABELS[t]}
                className="tabular size-7 rounded-full border border-line-strong hover:border-coral hover:text-coral disabled:opacity-50"
              >
                {t}
              </button>
            ))}
          </span>
          <label className="flex items-center gap-1.5">
            <span className="text-ink-soft">Side</span>
            <Select
              value=""
              disabled={busy}
              onChange={(e) => e.target.value && void bulkPatch({ side: e.target.value as Side })}
              className="h-8 w-auto py-0 text-sm"
              aria-label="Set side for selected"
            >
              <option value="">Choose…</option>
              {sideSchema.options.map((s) => (
                <option key={s} value={s}>
                  {sideLabel(s, partnerAName, partnerBName)}
                </option>
              ))}
            </Select>
          </label>
          <button type="button" disabled={busy} onClick={() => void removeGuests([...selected])} className="text-destructive hover:underline disabled:opacity-50">
            Remove
          </button>
        </div>
      )}

      <GuestEditorDialog
        open={guestDialog.open}
        onOpenChange={(open) => setGuestDialog((g) => ({ ...g, open }))}
        weddingId={weddingId}
        households={households}
        guests={guests}
        guest={guestDialog.guest}
        partnerAName={partnerAName}
        partnerBName={partnerBName}
        onSave={saveGuest}
      />
      <BulkAddDialog
        open={bulkOpen}
        onOpenChange={setBulkOpen}
        weddingId={weddingId}
        guests={guests}
        partnerAName={partnerAName}
        partnerBName={partnerBName}
        onAdd={async (added) => {
          for (const guest of added) await repo.guests.upsert(guest);
          await reloadGuests();
        }}
      />
      <HouseholdDialog
        open={householdDialog}
        onOpenChange={setHouseholdDialog}
        weddingId={weddingId}
        partnerAName={partnerAName}
        partnerBName={partnerBName}
        onSave={async (h) => {
          await repo.households.upsert(h);
          await reloadHouseholds();
        }}
      />
    </div>
  );
}

function TierSection({ tier, people, count, children }: { tier: Tier; people: number; count: number; children: ReactNode }) {
  // The header is a drop target too, so an empty tier can still receive someone.
  const { setNodeRef, isOver } = useDroppable({ id: tierDropId(tier) });
  return (
    <>
      <tr ref={setNodeRef}>
        <td
          colSpan={6}
          className={cn(
            "bg-paper-deep/60 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.14em] text-ink-soft uppercase transition-colors",
            isOver && "bg-coral-soft",
          )}
        >
          Tier {tier} · {TIER_LABELS[tier]}
          <span className="tabular ml-2 font-normal tracking-normal normal-case text-ink-mute">
            {count === 0 ? "nobody yet — drag someone here" : <>{count} {count === 1 ? "guest" : "guests"} · {people} {people === 1 ? "person" : "people"} with plus-ones</>}
          </span>
        </td>
      </tr>
      {children}
    </>
  );
}

function HouseholdDialog({
  open,
  onOpenChange,
  weddingId,
  partnerAName,
  partnerBName,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
  partnerAName: string;
  partnerBName: string;
  onSave: (household: Household) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [side, setSide] = useState<Side>("both");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Add household</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="The Alvarez family" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Side</Label>
          <Select value={side} onChange={(e) => setSide(e.target.value as Side)}>
            {sideSchema.options.map((s) => (
              <option key={s} value={s}>
                {sideLabel(s, partnerAName, partnerBName)}
              </option>
            ))}
          </Select>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          disabled={!name}
          onClick={async () => {
            await onSave({ id: newId(), weddingId, name, side });
            setName("");
            onOpenChange(false);
          }}
        >
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

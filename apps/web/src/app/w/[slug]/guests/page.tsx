"use client";

import {
  CHECK_SPELLING_TAG,
  coreName,
  findPossibleDuplicates,
  guestHeadcount,
  mergeGuests,
  newId,
  TIER_LABELS,
  TIERS,
  type Guest,
  type Household,
  type Side,
  type Tier,
} from "@bower/shared";
import { ListPlus, Plus, Search } from "lucide-react";
import { useCallback, useMemo, useState, type ReactNode } from "react";
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
import { useEntityList } from "@/lib/use-entity-list";

const SIDE_FILTER_ALL = "__all__";
const CHECK_FILTER = "__check__";

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

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guests.filter((g) => {
      if (sideFilter === CHECK_FILTER && !g.tags.includes(CHECK_SPELLING_TAG)) return false;
      if (sideFilter !== SIDE_FILTER_ALL && sideFilter !== CHECK_FILTER && g.side !== sideFilter) return false;
      if (!q) return true;
      return [g.firstName, g.lastName, g.relationship, g.notes].some((field) => field?.toLowerCase().includes(q));
    });
  }, [guests, sideFilter, query]);

  // One running number down the whole list, grouped by tier, so the count is always visible.
  const tierGroups = useMemo(() => {
    let number = 0;
    return TIERS.map((tier) => {
      const inTier = visible
        .filter((g) => g.tier === tier)
        .sort((a, b) => coreName(a).localeCompare(coreName(b)) || (a.relationship ?? "").localeCompare(b.relationship ?? ""))
        .map((guest) => ({ guest, number: ++number }));
      return { tier, rows: inTier, people: inTier.reduce((sum, r) => sum + guestHeadcount(r.guest), 0) };
    }).filter((group) => group.rows.length > 0);
  }, [visible]);

  const duplicates = useMemo(() => findPossibleDuplicates(guests, settings?.notDuplicates), [guests, settings?.notDuplicates]);
  const checkCount = guests.filter((g) => g.tags.includes(CHECK_SPELLING_TAG)).length;

  if (!repo || !weddingId) return <LoadingState />;

  async function saveGuest(guest: Guest) {
    await repo!.guests.upsert(guest);
    await reloadGuests();
  }

  async function patchGuest(guest: Guest, patch: Partial<Guest>) {
    await repo!.guests.upsert({ ...guest, ...patch, updatedAt: new Date().toISOString() });
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
          {checkCount > 0 && <option value={CHECK_FILTER}>Check spelling ({checkCount})</option>}
        </Select>
        <button type="button" onClick={() => setHouseholdDialog(true)} className="text-sm text-ink-soft hover:text-coral">
          + Household
        </button>
      </div>

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
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[0.65rem] font-semibold tracking-[0.14em] text-ink-mute uppercase">
                <th className="w-10 py-3 pr-1 pl-3 text-right">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Side</th>
                <th className="p-3">Tier</th>
                <th className="p-3 text-center">+1</th>
                <th className="w-10 p-3" />
              </tr>
            </thead>
            <tbody>
              {tierGroups.map((group) => (
                <TierSection key={group.tier} tier={group.tier} people={group.people} count={group.rows.length}>
                  {group.rows.map(({ guest, number }) => (
                    <GuestRow
                      key={guest.id}
                      guest={guest}
                      number={number}
                      partnerAName={partnerAName}
                      partnerBName={partnerBName}
                      onOpen={() => setGuestDialog({ open: true, guest })}
                      onPatch={(patch) => void patchGuest(guest, patch)}
                    />
                  ))}
                </TierSection>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <GuestEditorDialog
        open={guestDialog.open}
        onOpenChange={(open) => setGuestDialog((g) => ({ ...g, open }))}
        weddingId={weddingId}
        households={households}
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
  return (
    <>
      <tr>
        <td colSpan={6} className="bg-paper-deep/60 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
          Tier {tier} · {TIER_LABELS[tier]}
          <span className="tabular ml-2 font-normal tracking-normal normal-case text-ink-mute">
            {count} {count === 1 ? "guest" : "guests"} · {people} {people === 1 ? "person" : "people"} with plus-ones
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
            <option value="a">{partnerAName}</option>
            <option value="b">{partnerBName}</option>
            <option value="both">Both</option>
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

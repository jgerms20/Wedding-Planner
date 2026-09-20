"use client";

import { newId, type Guest, type Household, type Side, type Tier } from "@bower/shared";
import { Plus, Scissors } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { GuestEditorDialog } from "@/components/guest-editor-dialog";
import { GuestRow } from "@/components/guests/guest-row";
import { TierTile } from "@/components/guests/tier-tile";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { LoadingState } from "@/components/loading-state";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

const TIER_ORDER: Tier[] = ["must", "should", "nice"];
const TIER_RANK: Record<Tier, number> = { must: 0, should: 1, nice: 2 };
const NO_HOUSEHOLD = "__none__";
const SIDE_FILTER_ALL = "__all__";

export default function GuestsPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;
  const partnerAName = wedding?.partnerA.name ?? "Partner A";
  const partnerBName = wedding?.partnerB.name ?? "Partner B";
  const [sideFilter, setSideFilter] = useState<string>(SIDE_FILTER_ALL);

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
  const [householdDialog, setHouseholdDialog] = useState(false);
  const [cut, setCut] = useState(0);

  const filteredGuests = useMemo(
    () => (sideFilter === SIDE_FILTER_ALL ? guests : guests.filter((g) => g.side === sideFilter)),
    [guests, sideFilter],
  );

  const groups = useMemo(() => {
    const byHousehold = new Map<string, Guest[]>();
    for (const guest of filteredGuests) {
      const key = guest.householdId ?? NO_HOUSEHOLD;
      const list = byHousehold.get(key);
      if (list) list.push(guest);
      else byHousehold.set(key, [guest]);
    }
    const named = households
      .filter((h) => byHousehold.has(h.id))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((h) => ({ id: h.id, name: h.name, guests: sortByName(byHousehold.get(h.id)!) }));
    const unassigned = byHousehold.get(NO_HOUSEHOLD);
    return unassigned ? [...named, { id: NO_HOUSEHOLD, name: "No household on file", guests: sortByName(unassigned) }] : named;
  }, [filteredGuests, households]);

  const sortedByTier = useMemo(
    () => [...guests].sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || a.firstName.localeCompare(b.firstName)),
    [guests],
  );

  const cutValue = Math.min(cut, guests.length);
  const included = sortedByTier.slice(0, cutValue);
  const includedByTier = TIER_ORDER.map((tier) => ({
    tier,
    included: included.filter((g) => g.tier === tier).length,
    total: guests.filter((g) => g.tier === tier).length,
  }));

  if (!repo || !weddingId) return <LoadingState />;

  async function saveGuest(guest: Guest) {
    await repo!.guests.upsert(guest);
    await reloadGuests();
  }

  async function patchGuest(guest: Guest, patch: Partial<Guest>) {
    await repo!.guests.upsert({ ...guest, ...patch, updatedAt: new Date().toISOString() });
    await reloadGuests();
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Guests"
        description="Households, tiers, and how many fit if you have to cut."
        action={
          <div className="flex items-center gap-2">
            <Select value={sideFilter} onChange={(e) => setSideFilter(e.target.value)} className="w-auto">
              <option value={SIDE_FILTER_ALL}>Everyone</option>
              <option value="a">{partnerAName}</option>
              <option value="b">{partnerBName}</option>
              <option value="both">Both</option>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setHouseholdDialog(true)}>
              <Plus className="size-4" /> Household
            </Button>
            <Button size="sm" onClick={() => setGuestDialog({ open: true })}>
              <Plus className="size-4" /> Add guest
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {TIER_ORDER.map((tier) => (
          <TierTile key={tier} tier={tier} guests={guests} partnerAName={partnerAName} partnerBName={partnerBName} />
        ))}
      </div>

      <div className="postcard rise p-5">
        <p className="eyebrow flex items-center gap-1.5">
          <Scissors className="size-3.5 text-coral" /> Cut at N
        </p>
        <Slider className="mt-4" min={0} max={guests.length} value={cutValue} onChange={(e) => setCut(Number(e.target.value))} data-testid="guests-cut-slider" />
        <p className="mt-3 text-sm">
          Inviting the top <strong className="tabular">{cutValue}</strong> of {guests.length}
          {guests.length > 0 && <span className="tabular text-ink-soft"> ({Math.round((cutValue / guests.length) * 100)}%)</span>} (ranked
          must → should → nice) includes:
        </p>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
          {includedByTier.map(({ tier, included: inc, total }) => (
            <span key={tier} className="tabular">
              <span className="text-foreground capitalize">{tier}</span>: {inc}/{total}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm text-ink-soft">Fastest way in: talk to the bar below. &ldquo;Add the Robinsons from DC, four of them, must-invite.&rdquo;</p>

      {guests.length === 0 ? (
        <div className="postcard rise flex flex-col items-start gap-2 p-8">
          <p className="text-[15px] text-ink-soft">No guests yet. Tell Atlas who belongs on the list and it lands here, sorted by household.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-[0.65rem] font-semibold tracking-[0.14em] text-ink-mute uppercase">
                <th className="p-3">Name</th>
                <th className="p-3">Side</th>
                <th className="p-3">Tier</th>
                <th className="p-3">Home city</th>
                <th className="p-3 text-center">+1</th>
                <th className="p-3 text-center">Child</th>
                <th className="p-3">Dietary</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <GuestGroup
                  key={group.id}
                  name={group.name}
                  guests={group.guests}
                  partnerAName={partnerAName}
                  partnerBName={partnerBName}
                  onOpen={(g) => setGuestDialog({ open: true, guest: g })}
                  onPatch={patchGuest}
                />
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

function sortByName(list: Guest[]): Guest[] {
  return [...list].sort((a, b) => a.firstName.localeCompare(b.firstName) || (a.lastName ?? "").localeCompare(b.lastName ?? ""));
}

function GuestGroup({
  name,
  guests,
  partnerAName,
  partnerBName,
  onOpen,
  onPatch,
}: {
  name: string;
  guests: Guest[];
  partnerAName: string;
  partnerBName: string;
  onOpen: (g: Guest) => void;
  onPatch: (g: Guest, patch: Partial<Guest>) => void;
}) {
  return (
    <>
      <tr>
        <td colSpan={7} className="bg-paper-deep/60 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
          {name}
        </td>
      </tr>
      {guests.map((guest) => (
        <GuestRow
          key={guest.id}
          guest={guest}
          partnerAName={partnerAName}
          partnerBName={partnerBName}
          onOpen={() => onOpen(guest)}
          onPatch={(patch) => onPatch(guest, patch)}
        />
      ))}
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

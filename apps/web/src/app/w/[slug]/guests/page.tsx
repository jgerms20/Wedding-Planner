"use client";

import { newId, type Guest, type Household, type Side, type Tier } from "@bower/shared";
import { Plus, Scissors } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { GuestEditorDialog } from "@/components/guest-editor-dialog";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

const TIER_ORDER: Tier[] = ["must", "should", "nice"];
const TIER_RANK: Record<Tier, number> = { must: 0, should: 1, nice: 2 };

export default function GuestsPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

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

  const householdName = useMemo(() => Object.fromEntries(households.map((h) => [h.id, h.name])), [households]);

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

  if (!repo || !weddingId) return <p className="text-sm text-muted-foreground">Loading…</p>;

  async function saveGuest(guest: Guest) {
    await repo!.guests.upsert(guest);
    await reloadGuests();
  }

  const countsBySide = (["a", "b", "both"] as Side[]).map((side) => ({ side, count: guests.filter((g) => g.side === side).length }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Guests"
        description="Households, tiers, and how many fit if you have to cut."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setHouseholdDialog(true)}>
              <Plus className="size-4" /> Household
            </Button>
            <Button size="sm" onClick={() => setGuestDialog({ open: true })}>
              <Plus className="size-4" /> Add guest
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TIER_ORDER.map((tier) => (
          <Card key={tier}>
            <CardContent className="flex items-baseline justify-between pt-6">
              <span className="text-sm text-muted-foreground capitalize">{tier}</span>
              <span className="font-display text-2xl">{guests.filter((g) => g.tier === tier).length}</span>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent className="flex items-baseline justify-between pt-6">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-display text-2xl">{guests.length}</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        {countsBySide.map(({ side, count }) => (
          <span key={side}>
            Side {side}: {count}
          </span>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="size-4 text-rose" /> Cut at N
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Slider min={0} max={guests.length} value={cutValue} onChange={(e) => setCut(Number(e.target.value))} />
          <p className="text-sm">
            Inviting the top <strong>{cutValue}</strong> of {guests.length} (ranked must → should → nice) includes:
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {includedByTier.map(({ tier, included: inc, total }) => (
              <span key={tier}>
                <span className="capitalize">{tier}</span>: {inc}/{total}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-xs text-muted-foreground uppercase">
              <th className="p-3">Name</th>
              <th className="p-3">Household</th>
              <th className="p-3">Side</th>
              <th className="p-3">Tier</th>
              <th className="p-3">+1</th>
              <th className="p-3">Child</th>
              <th className="p-3">Home city</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr
                key={guest.id}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-accent"
                onClick={() => setGuestDialog({ open: true, guest })}
              >
                <td className="p-3">
                  {guest.firstName} {guest.lastName}
                </td>
                <td className="p-3 text-muted-foreground">{guest.householdId ? householdName[guest.householdId] : "—"}</td>
                <td className="p-3">{guest.side}</td>
                <td className="p-3">
                  <Badge variant={guest.tier === "must" ? "default" : guest.tier === "should" ? "secondary" : "outline"}>{guest.tier}</Badge>
                </td>
                <td className="p-3">{guest.plusOne ? "Yes" : ""}</td>
                <td className="p-3">{guest.isChild ? "Yes" : ""}</td>
                <td className="p-3 text-muted-foreground">{guest.homeCity}</td>
              </tr>
            ))}
            {guests.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  No guests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <GuestEditorDialog
        open={guestDialog.open}
        onOpenChange={(open) => setGuestDialog((g) => ({ ...g, open }))}
        weddingId={weddingId}
        households={households}
        guest={guestDialog.guest}
        onSave={saveGuest}
      />
      <HouseholdDialog
        open={householdDialog}
        onOpenChange={setHouseholdDialog}
        weddingId={weddingId}
        onSave={async (h) => {
          await repo.households.upsert(h);
          await reloadHouseholds();
        }}
      />
    </div>
  );
}

function HouseholdDialog({
  open,
  onOpenChange,
  weddingId,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  weddingId: string;
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
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="both">both</option>
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

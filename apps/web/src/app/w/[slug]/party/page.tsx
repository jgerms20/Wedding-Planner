"use client";

import { newId, type Side, type WeddingPartyMember } from "@bower/shared";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { PartyMemberEditorDialog } from "@/components/party-member-editor-dialog";
import { MemberCard } from "@/components/party/member-card";
import { RoleScaffold } from "@/components/party/role-scaffold";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/loading-state";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

interface RoleSlot {
  key: string;
  label: string;
  duties: string[];
  match: RegExp;
}

// Neutral by design: no fixed "her side / his side" buckets. Either partner
// assigns anyone to any role; the regexes still catch traditional names
// (maid of honor, best man, bridesmaid, groomsman, ...) so existing data and
// old habits of speech land in the right neutral slot automatically.
const ROLE_SLOTS: RoleSlot[] = [
  {
    key: "honor",
    label: "Honor attendant",
    duties: ["Leads the wedding party", "Helps plan a shower or celebration", "Speech"],
    match: /maid of honor|matron of honor|best (man|woman|person)|honor attendant/i,
  },
  {
    key: "party",
    label: "Wedding party",
    duties: ["Attire and fittings", "Helps plan showers & parties"],
    match: /bridesmaid|groomsmen?|wedding party/i,
  },
  { key: "officiant", label: "Officiant", duties: ["Leads the ceremony", "Files the paperwork"], match: /officiant/i },
  { key: "flower", label: "Flower kid", duties: ["Petals down the aisle"], match: /flower/i },
  { key: "ring-bearer", label: "Ring bearer", duties: ["Carries the rings (or stand-ins)"], match: /ring bearer/i },
  { key: "readers", label: "Readers", duties: ["A reading during the ceremony"], match: /reader/i },
];

export default function PartyPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const loadMembers = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.partyMembers.list(weddingId);
  }, [repo, weddingId]);
  const { items: members, reload } = useEntityList(loadMembers);

  const [dialog, setDialog] = useState<{ open: boolean; member?: WeddingPartyMember }>({ open: false });

  const { slots, unmatched } = useMemo(() => {
    const claimed = new Set<string>();
    const slotted = ROLE_SLOTS.map((slot) => {
      const matched = members.filter((m) => slot.match.test(m.role));
      for (const m of matched) claimed.add(m.id);
      return { slot, matched };
    });
    const rest = members.filter((m) => !claimed.has(m.id));
    return { slots: slotted, unmatched: rest };
  }, [members]);

  if (!repo || !weddingId) return <LoadingState />;

  async function addMember(role: string, name: string) {
    const member: WeddingPartyMember = { id: newId(), weddingId: weddingId!, name, role, side: "both" as Side, asked: false };
    await repo!.partyMembers.upsert(member);
    await reload();
  }

  async function toggleAsked(member: WeddingPartyMember) {
    const asked = !member.asked;
    await repo!.partyMembers.upsert({ ...member, asked, askedDate: asked ? new Date().toISOString().slice(0, 10) : undefined });
    await reload();
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Wedding party"
        description="The people standing up with the two of you — anyone in any role. How they were asked, and what they're on the hook for."
        action={
          <Button size="sm" variant="outline" onClick={() => setDialog({ open: true })}>
            <Plus className="size-4" /> Add someone else
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map(({ slot, matched }) =>
          matched.length > 0 ? (
            matched.map((member) => (
              <MemberCard key={member.id} member={member} onOpen={() => setDialog({ open: true, member })} onToggleAsked={() => toggleAsked(member)} />
            ))
          ) : (
            <RoleScaffold key={slot.key} label={slot.label} duties={slot.duties} onAdd={(name) => addMember(slot.label, name)} />
          ),
        )}
      </div>

      {unmatched.length > 0 && (
        <div>
          <p className="eyebrow mb-3">Also standing up with you</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unmatched.map((member) => (
              <MemberCard key={member.id} member={member} onOpen={() => setDialog({ open: true, member })} onToggleAsked={() => toggleAsked(member)} />
            ))}
          </div>
        </div>
      )}

      <PartyMemberEditorDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
        weddingId={weddingId}
        member={dialog.member}
        onSave={async (member) => {
          await repo.partyMembers.upsert(member);
          await reload();
        }}
      />
    </div>
  );
}

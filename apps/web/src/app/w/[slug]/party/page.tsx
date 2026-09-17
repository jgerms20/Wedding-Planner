"use client";

import type { WeddingPartyMember } from "@bower/shared";
import { Check, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { PartyMemberEditorDialog } from "@/components/party-member-editor-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

export default function PartyPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const loadMembers = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.partyMembers.list(weddingId);
  }, [repo, weddingId]);
  const { items: members, reload } = useEntityList(loadMembers);

  const [dialog, setDialog] = useState<{ open: boolean; member?: WeddingPartyMember }>({ open: false });

  if (!repo || !weddingId) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Wedding party"
        description="Who's standing up with you, how they were asked, and what they're on the hook for."
        action={
          <Button size="sm" onClick={() => setDialog({ open: true })}>
            <Plus className="size-4" /> Add member
          </Button>
        }
      />

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-xs text-muted-foreground uppercase">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Side</th>
              <th className="p-3">Asked</th>
              <th className="p-3">Contact</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-accent"
                onClick={() => setDialog({ open: true, member })}
              >
                <td className="p-3">{member.name}</td>
                <td className="p-3">{member.role}</td>
                <td className="p-3">{member.side}</td>
                <td className="p-3">
                  {member.asked ? (
                    <Badge variant="default">
                      <Check className="size-3" /> {formatDate(member.askedDate)}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not yet</Badge>
                  )}
                </td>
                <td className="p-3 text-muted-foreground">{member.contact}</td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground">
                  No wedding party members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

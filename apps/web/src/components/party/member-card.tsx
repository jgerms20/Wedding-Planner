"use client";

import type { WeddingPartyMember } from "@bower/shared";
import { Check } from "lucide-react";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MemberCard({ member, onOpen, onToggleAsked }: { member: WeddingPartyMember; onOpen: () => void; onToggleAsked: () => void }) {
  return (
    <div className="postcard flex flex-col gap-3 p-5">
      <button type="button" onClick={onOpen} className="text-left">
        <p className="font-display text-lg leading-tight">{member.name}</p>
        <p className="mt-0.5 text-xs tracking-wide text-ink-mute uppercase">
          {member.role} · Side {member.side}
        </p>
      </button>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleAsked();
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
            member.asked ? "border-transparent bg-coral-soft text-coral" : "border-line-strong text-ink-soft hover:border-coral hover:text-coral",
          )}
        >
          {member.asked ? (
            <>
              <Check className="size-3" /> Asked{member.askedDate ? ` · ${formatDate(member.askedDate)}` : ""}
            </>
          ) : (
            "Not asked yet"
          )}
        </button>
        {member.contact && <span className="truncate text-xs text-ink-soft">{member.contact}</span>}
      </div>
    </div>
  );
}

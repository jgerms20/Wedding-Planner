"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

/** A right-anchored slide-over panel, used for the concierge preview. */
function Drawer({ open, onOpenChange, title, children }: DrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onOpenChange]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink-900/45 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div
        className={cn(
          "absolute top-0 right-0 flex h-full w-full max-w-sm flex-col border-l border-line/80 bg-card sm:top-3 sm:right-3 sm:h-[calc(100%-1.5rem)] sm:rounded-[1.5rem] sm:border text-card-foreground shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-[105%]",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl leading-tight">{title}</h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

export { Drawer };

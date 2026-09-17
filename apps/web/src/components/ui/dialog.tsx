"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-[10vh] sm:pt-[14vh]" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 w-full max-w-lg animate-in rounded-lg border border-border bg-card text-card-foreground shadow-xl">
        {children}
      </div>
    </div>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-start justify-between gap-4 border-b border-border px-5 py-4", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("font-display text-lg font-semibold", className)} {...props} />;
}

function DialogCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label="Close"
    >
      <X className="size-4" />
    </button>
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("max-h-[70vh] overflow-y-auto px-5 py-4", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-end gap-2 border-t border-border px-5 py-4", className)} {...props} />;
}

export { Dialog, DialogHeader, DialogTitle, DialogCloseButton, DialogBody, DialogFooter };

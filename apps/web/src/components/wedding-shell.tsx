"use client";

import {
  CalendarDays,
  FolderOpen,
  Home,
  ListChecks,
  MapPinned,
  Settings as SettingsIcon,
  Sparkles,
  Users,
  Users2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";
import { Drawer } from "@/components/ui/drawer";
import { WEDDING_SLUG } from "@/lib/constants";
import { RepoProvider, useRepoContext } from "@/lib/repo-context";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "", label: "Home", icon: Home },
  { href: "/plan", label: "Plan", icon: ListChecks },
  { href: "/destinations", label: "Destinations", icon: MapPinned },
  { href: "/guests", label: "Guests", icon: Users },
  { href: "/budget", label: "Budget", icon: Wallet },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/party", label: "Party", icon: Users2 },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/files", label: "Files", icon: FolderOpen },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function WeddingShell({ children }: { children: ReactNode }) {
  return (
    <RepoProvider>
      <ShellChrome>{children}</ShellChrome>
    </RepoProvider>
  );
}

function ShellChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { wedding, viewingAs, setViewingAs } = useRepoContext();
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const base = `/w/${WEDDING_SLUG}`;
  const isIntake = pathname?.endsWith("/intake");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Link href={base} className="font-display text-xl italic tracking-tight text-rose">
            Bower
          </Link>
          {wedding && !isIntake && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {wedding.partnerA.name} &amp; {wedding.partnerB.name}
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <ViewingAsToggle viewingAs={viewingAs} onChange={setViewingAs} />
            <button
              type="button"
              onClick={() => setConciergeOpen(true)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-accent"
            >
              <Sparkles className="size-3.5 text-gold" />
              Concierge
            </button>
          </div>
        </div>
        {!isIntake && (
          <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 text-sm sm:px-6">
            {NAV_ITEMS.map((item) => {
              const href = `${base}${item.href}`;
              const active = item.href === "" ? pathname === base || pathname === `${base}/` : pathname?.startsWith(href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors",
                    active
                      ? "bg-rose-soft text-rose font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      <Drawer open={conciergeOpen} onOpenChange={setConciergeOpen} title="Concierge">
        <div className="flex flex-col gap-3 text-sm text-foreground">
          <p className="flex items-center gap-2 font-display text-base">
            <Sparkles className="size-4 text-gold" /> Your agent team is almost here.
          </p>
          <p className="text-muted-foreground">
            In Phase 0b, this drawer becomes a live chat with the concierge — the agent that routes your questions to
            the Scout, the Timeline keeper, the Budget guardian, and everyone else on the team. They&apos;ll research
            venues, draft messages, and watch deadlines, and hand you an approval whenever something is about to leave
            the app.
          </p>
          <p className="text-muted-foreground">
            For now, everything here lives only in this browser — use the tools in each tab, and{" "}
            <Link href={`${base}/settings`} className="text-rose underline underline-offset-2">
              export a backup
            </Link>{" "}
            from Settings whenever you want a copy.
          </p>
        </div>
      </Drawer>
    </div>
  );
}

function ViewingAsToggle({
  viewingAs,
  onChange,
}: {
  viewingAs: "a" | "b";
  onChange: (v: "a" | "b") => void;
}) {
  const { wedding } = useRepoContext();
  const nameFor = (v: "a" | "b") => (wedding ? (v === "a" ? wedding.partnerA.name : wedding.partnerB.name) : v === "a" ? "Partner A" : "Partner B");

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs">
      {(["a", "b"] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            "rounded-full px-2.5 py-1 font-medium transition-colors",
            viewingAs === v ? "bg-rose text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {nameFor(v)}
        </button>
      ))}
    </div>
  );
}

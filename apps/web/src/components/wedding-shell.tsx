"use client";

import {
  CalendarDays,
  FolderOpen,
  Home,
  Lightbulb,
  ListChecks,
  MapPinned,
  Moon,
  PartyPopper,
  Settings as SettingsIcon,
  Sparkles,
  Sun,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { ConciergePanel } from "@/components/concierge/concierge-panel";
import { TellBowerBar } from "@/components/tell-bower/tell-bower-bar";
import { WEDDING_SLUG } from "@/lib/constants";
import { seasonLabel } from "@/lib/format";
import { RepoProvider, useRepoContext } from "@/lib/repo-context";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "", label: "Home", icon: Home },
  { href: "/plan", label: "Plan", icon: ListChecks },
  { href: "/destinations", label: "Destinations", icon: MapPinned },
  { href: "/guests", label: "Guests", icon: Users },
  { href: "/budget", label: "Budget", icon: Wallet },
  { href: "/events", label: "Events", icon: PartyPopper },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/files", label: "Files", icon: FolderOpen },
  { href: "/tips", label: "Tips", icon: Lightbulb },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function WeddingShell({ children }: { children: ReactNode }) {
  return (
    <RepoProvider>
      <ShellChrome>{children}</ShellChrome>
    </RepoProvider>
  );
}

function useActive(base: string) {
  const pathname = usePathname() ?? "";
  return (href: string) => (href === "" ? pathname === base || pathname === `${base}/` : pathname.startsWith(`${base}${href}`));
}

function ShellChrome({ children }: { children: ReactNode }) {
  const { wedding, ready } = useRepoContext();
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const base = `/w/${WEDDING_SLUG}`;
  const isActive = useActive(base);
  const dateLine = wedding?.targetDate
    ? new Date(`${wedding.targetDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : (seasonLabel(wedding?.targetSeason) ?? "Date to come");

  return (
    <div className="flex min-h-screen flex-col md:grid md:grid-cols-[var(--rail-w)_1fr]">
      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-screen flex-col bg-rail text-rail-foreground md:flex">
        <div className="px-6 pt-7 pb-5">
          <Link href={base} className="font-display text-3xl italic tracking-tight">
            Atlas
          </Link>
          <p className="mt-0.5 text-[0.65rem] font-semibold tracking-[0.22em] text-rail-muted uppercase">Wedding atlas</p>
        </div>
        <div className="mx-6 border-t border-rail-line" />
        <div className="px-6 py-5">
          <p className="font-display text-lg leading-tight">{wedding ? `${wedding.partnerA.name} & ${wedding.partnerB.name}` : " "}</p>
          <p className="mt-1 text-sm text-rail-muted">{ready ? dateLine : " "}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={`${base}${item.href}`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-[15px] transition-colors",
                  active ? "bg-rail-active text-rail-foreground" : "text-rail-muted hover:bg-rail-active/60 hover:text-rail-foreground",
                )}
              >
                <Icon className="size-4 stroke-[1.5]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 px-4 py-5">
          <button
            type="button"
            onClick={() => setConciergeOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-rail-line px-3 py-2 text-sm text-rail-foreground transition-colors hover:bg-rail-active"
          >
            <Sparkles className="size-4 text-gold" /> Concierge
          </button>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-rail px-4 py-3 text-rail-foreground md:hidden">
        <Link href={base} className="font-display text-2xl italic">
          Atlas
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConciergeOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-rail-line px-3 py-1.5 text-xs"
          >
            <Sparkles className="size-3.5 text-gold" /> Concierge
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="paper-content mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-24 sm:px-8 sm:pt-10 md:pb-10">{children}</main>
      </div>

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex gap-1 overflow-x-auto bg-rail px-2 pt-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] text-rail-muted md:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={`${base}${item.href}`}
              className={cn(
                "flex min-w-[3.6rem] shrink-0 flex-col items-center gap-0.5 rounded-md px-2 py-1 text-[0.65rem]",
                active ? "bg-rail-active text-rail-foreground" : "",
              )}
            >
              <Icon className="size-4 stroke-[1.5]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <TellBowerBar />
      <ConciergePanel open={conciergeOpen} onOpenChange={setConciergeOpen} />
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    try {
      window.localStorage.setItem("bower:theme", next ? "dark" : "light");
    } catch {
      // private mode: the toggle just will not persist
    }
    document.documentElement.classList.toggle("dark", next);
    window.dispatchEvent(new Event("bower:theme"));
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light" : "Switch to dark"}
      className="flex size-9 items-center justify-center rounded-full border border-rail-line text-rail-muted transition-colors hover:bg-rail-active hover:text-rail-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

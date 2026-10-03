"use client";

import { SEED_BENCHMARKS } from "@bower/shared";
import {
  CalendarDays,
  FolderOpen,
  Home,
  Lightbulb,
  ListChecks,
  MapPinned,
  Moon,
  PartyPopper,
  Quote,
  Settings as SettingsIcon,
  Sparkles,
  Sun,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { ConciergePanel } from "@/components/concierge/concierge-panel";
import { TellBowerBar } from "@/components/tell-bower/tell-bower-bar";
import { WEDDING_SLUG } from "@/lib/constants";
import { seasonLabel } from "@/lib/format";
import { MergeBanner } from "@/components/cloud/merge-banner";
import { assetPath, COUPLE_PHOTO } from "@/lib/asset-path";
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
  return (href: string) =>
    href === ""
      ? pathname === base || pathname === `${base}/`
      : pathname.startsWith(`${base}${href}`);
}

function ShellChrome({ children }: { children: ReactNode }) {
  const { wedding, ready } = useRepoContext();
  const [conciergeOpen, setConciergeOpen] = useState(false);
  // Picked after mount: a random pick during the static prerender wouldn't match the browser's.
  const [tip, setTip] = useState<NonNullable<typeof SEED_BENCHMARKS>["tips"][number] | undefined>(
    undefined,
  );
  useEffect(() => {
    const tips = SEED_BENCHMARKS?.tips ?? [];
    if (tips.length > 0) setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);
  const [tipDismissed, setTipDismissed] = useState(false);
  const base = `/w/${WEDDING_SLUG}`;
  const isActive = useActive(base);
  const dateLine = wedding?.targetDate
    ? new Date(`${wedding.targetDate}T12:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : (seasonLabel(wedding?.targetSeason) ?? "Date to come");

  return (
    <div className="flex min-h-screen flex-col md:grid md:grid-cols-[calc(var(--rail-w)+0.75rem)_1fr]">
      {/* Desktop rail: a floating palm-green panel. */}
      <aside className="rail-surface sticky top-3 m-3 mr-0 hidden h-[calc(100vh-1.5rem)] flex-col overflow-y-auto rounded-[1.75rem] text-rail-foreground shadow-[0_30px_60px_-30px_color-mix(in_oklch,var(--ink-900)_70%,transparent)] md:flex">
        <div className="flex items-baseline justify-between px-6 pt-6 pb-4">
          <Link
            href={base}
            className="font-display text-[2.1rem] leading-none italic tracking-tight"
          >
            Atlas<span className="text-gold">.</span>
          </Link>
          <span className="text-[0.6rem] font-semibold tracking-[0.24em] text-rail-muted uppercase">
            Wedding atlas
          </span>
        </div>
        {isActive("") ? (
          // Home already leads with the big photo, so the rail just carries the names.
          <div className="mx-4 border-y border-rail-foreground/10 py-3">
            <p className="font-display text-xl leading-tight">
              {wedding ? (
                <>
                  {wedding.partnerA.name} <span className="italic text-gold">&amp;</span>{" "}
                  {wedding.partnerB.name}
                </>
              ) : (
                " "
              )}
            </p>
            <p className="text-xs text-rail-muted">{ready ? dateLine : " "}</p>
          </div>
        ) : (
          <div className="px-4">
            <div className="relative overflow-hidden rounded-[1.25rem] ring-1 ring-white/10">
              <img
                src={assetPath(COUPLE_PHOTO.small)}
                alt={COUPLE_PHOTO.alt}
                width={480}
                height={384}
                className="h-28 w-full object-cover object-[center_18%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
                <p className="font-display text-xl leading-tight text-white">
                  {wedding ? (
                    <>
                      {wedding.partnerA.name} <span className="italic text-gold">&amp;</span>{" "}
                      {wedding.partnerB.name}
                    </>
                  ) : (
                    " "
                  )}
                </p>
                <p className="text-xs text-white/75">{ready ? dateLine : " "}</p>
              </div>
            </div>
          </div>
        )}
        <nav className="mt-4 flex flex-1 flex-col gap-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={`${base}${item.href}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-full px-3.5 py-[0.45rem] text-[15px] transition-all",
                  active
                    ? "bg-rail-foreground/12 text-rail-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--rail-foreground)_14%,transparent)]"
                    : "text-rail-muted hover:bg-rail-foreground/6 hover:text-rail-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-4 stroke-[1.6] transition-colors",
                    active ? "text-gold" : "group-hover:text-gold/80",
                  )}
                />
                {item.label}
                {active && <span className="ml-auto size-1.5 rounded-full bg-gold" />}
              </Link>
            );
          })}
        </nav>
        {tip && !tipDismissed && (
          <div className="mx-3 mt-4 mb-3 rounded-[1.1rem] [@media(max-height:840px)]:hidden bg-rail-foreground/6 p-3.5 ring-1 ring-rail-foreground/10">
            <div className="flex items-start justify-between gap-2">
              <Quote className="size-3.5 shrink-0 text-gold" />
              <button
                type="button"
                onClick={() => setTipDismissed(true)}
                aria-label="Dismiss"
                className="rounded-full p-0.5 text-rail-muted transition-colors hover:bg-rail-active"
              >
                <X className="size-3 stroke-[1.5]" />
              </button>
            </div>
            <p
              className="mt-1 line-clamp-4 text-xs leading-relaxed text-rail-muted"
              title={tip.text}
            >
              {tip.text}
            </p>
          </div>
        )}
        <div className="flex items-center gap-2 px-4 pt-1 pb-5">
          <button
            type="button"
            onClick={() => setConciergeOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-3 py-2 text-sm font-medium text-ink-900 shadow-[0_10px_24px_-12px_var(--gold)] transition-transform hover:-translate-y-px"
          >
            <Sparkles className="size-4" /> Concierge
          </button>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="rail-surface sticky top-0 z-40 flex items-center justify-between rounded-b-[1.25rem] px-4 py-3 text-rail-foreground shadow-[0_12px_30px_-18px_color-mix(in_oklch,var(--ink-900)_70%,transparent)] md:hidden">
        <Link href={base} className="flex items-center gap-2.5">
          <img
            src={assetPath(COUPLE_PHOTO.small)}
            alt=""
            width={480}
            height={384}
            className="size-8 rounded-full object-cover object-[center_18%] ring-2 ring-gold/60"
          />
          <span className="font-display text-2xl leading-none italic">
            Atlas<span className="text-gold">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setConciergeOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-medium text-ink-900"
          >
            <Sparkles className="size-3.5" /> Concierge
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="paper-content mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-28 sm:px-8 sm:pt-10 md:pb-10">
          <MergeBanner />
          {children}
        </main>
      </div>

      {/* Mobile tab bar: a floating pill dock. */}
      <nav className="rail-surface fixed inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-40 flex gap-0.5 overflow-x-auto rounded-[1.4rem] px-1.5 py-1.5 text-rail-muted shadow-[0_18px_40px_-16px_color-mix(in_oklch,var(--ink-900)_80%,transparent)] md:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={`${base}${item.href}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-[3.6rem] shrink-0 flex-col items-center gap-0.5 rounded-[1rem] px-2 py-1 text-[0.65rem] transition-colors",
                active ? "bg-rail-foreground/12 text-rail-foreground" : "",
              )}
            >
              <Icon className={cn("size-4 stroke-[1.6]", active && "text-gold")} />
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
      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-rail-foreground/15 text-rail-muted transition-colors hover:bg-rail-active hover:text-rail-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

"use client";

import { parseSeasonStart, scenarioMath, SEED_BENCHMARKS, type Decision, type Destination, type Scenario, type Task } from "@bower/shared";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { ArrowRight, Check, Mic, Quote, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { restoreSeed } from "@/lib/bootstrap";
import { WEDDING_SLUG } from "@/lib/constants";
import { countryCode } from "@/lib/country-code";
import { daysUntil, formatMoney, seasonLabel } from "@/lib/format";
import { LoadingState } from "@/components/loading-state";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";
import { cn } from "@/lib/utils";

const base = `/w/${WEDDING_SLUG}`;

export default function HomePage() {
  const { repo, wedding, settings, ready, touch } = useRepoContext();
  const weddingId = wedding?.id;
  const [restoring, setRestoring] = useState(false);

  const loadTasks = useCallback(async () => (repo && weddingId ? repo.tasks.list(weddingId) : undefined), [repo, weddingId]);
  const loadScenarios = useCallback(async () => (repo && weddingId ? repo.scenarios.list(weddingId) : undefined), [repo, weddingId]);
  const loadDestinations = useCallback(async () => (repo && weddingId ? repo.destinations.list(weddingId) : undefined), [repo, weddingId]);
  const loadBudget = useCallback(async () => (repo && weddingId ? repo.budgetItems.list(weddingId) : undefined), [repo, weddingId]);
  const loadDecisions = useCallback(async () => (repo && weddingId ? repo.decisions.list(weddingId) : undefined), [repo, weddingId]);

  const { items: tasks, reload: reloadTasks } = useEntityList(loadTasks);
  const { items: scenarios } = useEntityList(loadScenarios);
  const { items: destinations } = useEntityList(loadDestinations);
  const { items: budgetItems } = useEntityList(loadBudget);
  const { items: decisions } = useEntityList(loadDecisions);

  const pinned = useMemo(
    () => scenarios.find((s) => s.id === wedding?.activeScenarioId) ?? scenarios.find((s) => s.pinned),
    [scenarios, wedding?.activeScenarioId],
  );
  const scenarioByDestination = useMemo(() => {
    const map = new Map<string, Scenario>();
    for (const s of scenarios) if (s.destinationId) map.set(s.destinationId, s);
    return map;
  }, [scenarios]);
  // Same ranking the Atlas page's Favorites tab uses (the couple's own sortOrder among
  // destinations either partner has hearted, not cost or whatever's pinned) so "Front-runner"
  // means the same thing everywhere it's shown.
  const orderedDestinations = useMemo(
    () =>
      [...destinations]
        .filter((d) => (d.favoritedBy ?? []).length > 0)
        .sort((a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER)),
    [destinations],
  );
  const frontRunnerId = orderedDestinations[0]?.id;
  const thisWeek = useMemo(() => weekTasks(tasks), [tasks]);
  const nextAnchor = useMemo(() => upcomingAnchor(settings?.planConfig.anchors ?? []), [settings]);
  const estimateTotal = budgetItems.reduce((sum, item) => sum + (item.estimate ?? 0), 0);
  const committedTotal = budgetItems.reduce((sum, item) => sum + (item.contracted ?? item.quoted ?? 0), 0);
  const [tip] = useState(() => {
    const tips = SEED_BENCHMARKS?.tips ?? [];
    return tips.length > 0 ? tips[Math.floor(Math.random() * tips.length)] : undefined;
  });
  const [tipDismissed, setTipDismissed] = useState(false);

  if (!ready || !wedding) {
    return <LoadingState label="Opening your atlas…" />;
  }

  const countdown = countdownFor(wedding.targetDate, wedding.targetSeason);

  async function completeTask(task: Task) {
    if (!repo) return;
    await repo.tasks.upsert({ ...task, status: "done", updatedAt: new Date().toISOString() });
    await reloadTasks();
  }

  async function restoreTheSeed() {
    if (!repo || restoring) return;
    setRestoring(true);
    try {
      await restoreSeed(repo);
      touch();
    } finally {
      setRestoring(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow rise">
            {wedding.partnerA.name} &amp; {wedding.partnerB.name} · engaged in Brazil · Sept 2026
          </p>
          <h1 className="settle mt-3 text-6xl leading-[0.95] text-balance sm:text-7xl lg:text-8xl" data-testid="home-headline">
            {countdown.headline}
          </h1>
          <div className="rise rise-2 mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="numeral text-5xl text-coral sm:text-6xl" data-testid="home-countdown">
              {countdown.days}
            </span>
            <span className="text-lg text-ink-soft">{countdown.caption}</span>
          </div>
        </div>

        <div className="rise rise-3 postcard p-5">
          <p className="eyebrow">Next anchor</p>
          {nextAnchor ? (
            <>
              <p className="mt-2 font-display text-2xl">{nextAnchor.title}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {format(parseISO(nextAnchor.date), "EEEE, MMM d, yyyy")} ·{" "}
                <span className="tabular font-medium text-foreground">{daysUntil(nextAnchor.date)} days</span>
              </p>
              {nextAnchor.reveals.length > 0 && (
                <p className="mt-3 text-sm text-ink-soft">
                  The reveal: {nextAnchor.reveals.map((r) => r.replace("_", " ")).join(", ")}. Save-the-dates go out right after.
                </p>
              )}
              <Link href={`${base}/plan`} className="mt-4 inline-flex items-center gap-1 text-sm text-coral">
                Everything before it <ArrowRight className="size-3.5" />
              </Link>
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">Add an anchor in Plan settings to organize around it.</p>
          )}
        </div>
      </section>

      <div className="hairline my-10" />

      {/* Atlas strip */}
      <section>
        <div className="rise flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The atlas</p>
            <h2 className="mt-1 text-3xl">Where it could be</h2>
          </div>
          <Link href={`${base}/destinations`} className="inline-flex items-center gap-1 text-sm text-coral">
            Compare all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {destinations.length === 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-line-strong p-4 text-sm">
            <p className="flex-1 text-ink-soft">
              This looks like it&apos;s from before we added the destination research. One click brings in Brazil, Jamaica, and the
              rest with real costs and sources.
            </p>
            <button
              type="button"
              onClick={() => void restoreTheSeed()}
              disabled={restoring}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-60"
            >
              <RefreshCw className={cn("size-3.5", restoring && "animate-spin")} />
              {restoring ? "Bringing it in…" : "Bring in the atlas"}
            </button>
          </div>
        ) : (
          <div className="-mx-4 mt-5 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:-mx-8 sm:px-8">
            {orderedDestinations.map((d, i) => (
              <DestinationPostcard
                key={d.id}
                destination={d}
                scenario={scenarioByDestination.get(d.id)}
                pinned={d.id === frontRunnerId}
                guestTarget={wedding.guestTarget ?? 150}
                className={`rise rise-${Math.min(i + 1, 8)}`}
              />
            ))}
          </div>
        )}
      </section>

      <div className="hairline my-10" />

      {/* This week + money */}
      <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="rise">
          <p className="eyebrow">This week</p>
          <h2 className="mt-1 text-3xl">{thisWeek.length === 0 ? "Nothing due. Enjoy it." : `${thisWeek.length} thing${thisWeek.length === 1 ? "" : "s"} to move`}</h2>
          <ul className="mt-5 divide-y divide-line">
            {thisWeek.map((task) => {
              const days = daysUntil(task.dueDate);
              const overdue = days !== undefined && days < 0;
              return (
                <li key={task.id} className="flex items-start gap-3 py-3">
                  <button
                    type="button"
                    onClick={() => void completeTask(task)}
                    aria-label={`Mark “${task.title}” done`}
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-line-strong text-transparent transition-colors hover:border-coral hover:text-coral"
                  >
                    <Check className="size-3" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-snug">{task.title}</p>
                    {task.description && <p className="mt-0.5 line-clamp-1 text-sm text-ink-mute">{task.description}</p>}
                  </div>
                  <span className={cn("tabular shrink-0 text-sm", overdue ? "text-coral" : "text-ink-soft")}>
                    {task.dueDate ? format(parseISO(task.dueDate), "EEE, MMM d") : ""}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link href={`${base}/plan`} className="mt-4 inline-flex items-center gap-1 text-sm text-coral">
            The whole plan <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="rise rise-2">
          <p className="eyebrow">Where the money goes</p>
          <h2 className="mt-1 text-3xl">{pinned ? formatMoney(scenarioMath(pinned).totalCost) : formatMoney(estimateTotal)}</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {pinned ? `Estimated total for ${pinned.name}, ${scenarioMath(pinned).expectedGuests} guests likely to come.` : "Estimated total so far."}
          </p>
          <MoneyBar estimate={estimateTotal} committed={committedTotal} target={pinned ? scenarioMath(pinned).totalCost : estimateTotal} />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <span>
              <span className="inline-block size-2.5 rounded-full bg-ink align-middle" /> Committed{" "}
              <span className="tabular text-ink-soft">{formatMoney(committedTotal)}</span>
            </span>
            <span>
              <span className="inline-block size-2.5 rounded-full bg-gold align-middle" /> Estimated{" "}
              <span className="tabular text-ink-soft">{formatMoney(estimateTotal)}</span>
            </span>
          </div>
          <Link href={`${base}/budget`} className="mt-4 inline-flex items-center gap-1 text-sm text-coral">
            How we estimated this <ArrowRight className="size-3.5" />
          </Link>

          {decisions.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow">Decided so far</p>
              <ul className="mt-3 space-y-2">
                {[...decisions]
                  .sort((a, b) => (a.decidedAt < b.decidedAt ? 1 : -1))
                  .slice(0, 4)
                  .map((d: Decision) => (
                    <li key={d.id} className="text-[15px] leading-snug">
                      <span className="mr-2 text-gold">◆</span>
                      {d.title}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <div className="hairline my-10" />

      <section className="rise flex flex-wrap items-center gap-3 text-sm text-ink-soft">
        <span className="flex size-8 items-center justify-center rounded-full bg-coral-soft text-coral">
          <Mic className="size-4" />
        </span>
        <p>
          Talk to the bar below. “Add my aunt Denise and uncle Ray from Columbia, must-invite.” “Move the engagement party to May.” Atlas
          proposes, you approve.
        </p>
      </section>

      {tip && !tipDismissed && (
        <div className="rise fixed bottom-6 left-4 z-30 hidden max-w-xs rounded-lg border border-line-strong bg-card/95 p-4 shadow-[0_14px_32px_-10px_rgba(20,40,32,0.35)] backdrop-blur lg:flex lg:flex-col lg:gap-2">
          <div className="flex items-start justify-between gap-2">
            <Quote className="size-4 shrink-0 text-coral" />
            <button
              type="button"
              onClick={() => setTipDismissed(true)}
              aria-label="Dismiss"
              className="rounded-full p-0.5 text-ink-mute transition-colors hover:bg-muted"
            >
              <X className="size-3.5" />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">{tip.text}</p>
        </div>
      )}
    </div>
  );
}

function DestinationPostcard({
  destination,
  scenario,
  pinned,
  guestTarget,
  className,
}: {
  destination: Destination;
  scenario?: Scenario;
  pinned: boolean;
  guestTarget: number;
  className?: string;
}) {
  const math = scenario ? scenarioMath(scenario) : undefined;
  const likely = Math.round(guestTarget * (destination.attendanceRateEstimate ?? scenario?.attendanceRate ?? 0.8));
  return (
    <Link
      href={`${base}/destinations`}
      className={cn("postcard flex w-64 shrink-0 snap-start flex-col p-4", pinned && "ring-1 ring-coral", className)}
    >
      <div className="flex items-start justify-between">
        <span className="stamp stamp-sm">{countryCode(destination.country, destination.name)}</span>
        {pinned && <span className="rounded-full bg-coral-soft px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-coral uppercase">Front-runner</span>}
      </div>
      <p className="mt-4 font-display text-2xl leading-tight">{destination.name}</p>
      <p className="mt-0.5 line-clamp-1 text-xs text-ink-mute">{destination.region ?? destination.country}</p>
      <dl className="mt-4 space-y-1.5 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-ink-soft">Total</dt>
          <dd className="tabular font-medium">{math ? formatMoney(math.totalCost) : "—"}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-ink-soft">Per guest to get there</dt>
          <dd className="tabular font-medium">{formatMoney(destination.travelCostPerGuestEstimate)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-ink-soft">Likely to come</dt>
          <dd className="tabular font-medium">
            ~{likely} of {guestTarget}
          </dd>
        </div>
      </dl>
    </Link>
  );
}

function MoneyBar({ estimate, committed, target }: { estimate: number; committed: number; target: number }) {
  const max = Math.max(estimate, committed, target, 1);
  return (
    <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-paper-deep">
      <div className="relative h-full">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gold/70" style={{ width: `${(estimate / max) * 100}%` }} />
        <div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `${(committed / max) * 100}%` }} />
      </div>
    </div>
  );
}

function weekTasks(tasks: Task[]): Task[] {
  return tasks
    .filter((t) => t.status !== "done" && t.status !== "skipped" && t.dueDate)
    .filter((t) => {
      const days = daysUntil(t.dueDate);
      return days !== undefined && days <= 7;
    })
    .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : 1))
    .slice(0, 8);
}

function upcomingAnchor(anchors: { id: string; title: string; date?: string; reveals: string[] }[]) {
  const today = new Date().toISOString().slice(0, 10);
  return anchors
    .filter((a): a is typeof a & { date: string } => Boolean(a.date) && a.date! >= today)
    .sort((a, b) => (a.date < b.date ? -1 : 1))[0];
}

function countdownFor(targetDate?: string, targetSeason?: string): { headline: string; days: string; caption: string } {
  if (targetDate) {
    const days = daysUntil(targetDate) ?? 0;
    return { headline: format(parseISO(targetDate), "MMMM d, yyyy"), days: String(days), caption: "days to go" };
  }
  if (targetSeason) {
    const start = parseSeasonStart(targetSeason);
    const days = start ? differenceInCalendarDays(start, new Date()) : undefined;
    return {
      headline: seasonLabel(targetSeason) ?? targetSeason,
      days: days !== undefined ? `~${days}` : "—",
      caption: "days until the season opens",
    };
  }
  return { headline: "A date to come", days: "—", caption: "tell Atlas when you know" };
}

"use client";

import { scenarioMath, type Scenario, type Task } from "@bower/shared";
import { ArrowRight, CalendarHeart, ListChecks, MapPinned, Wallet } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WEDDING_SLUG } from "@/lib/constants";
import { daysUntil, formatCountdown, formatDate, formatMoney, seasonLabel } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

export default function HomePage() {
  const { repo, wedding, settings, ready } = useRepoContext();
  const weddingId = wedding?.id;

  const loadTasks = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.tasks.list(weddingId);
  }, [repo, weddingId]);
  const { items: tasks } = useEntityList(loadTasks);

  const loadScenarios = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.scenarios.list(weddingId);
  }, [repo, weddingId]);
  const { items: scenarios } = useEntityList(loadScenarios);

  const loadBudgetItems = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.budgetItems.list(weddingId);
  }, [repo, weddingId]);
  const { items: budgetItems } = useEntityList(loadBudgetItems);

  const thisWeek = useMemo(() => weekTasks(tasks), [tasks]);
  const pinnedScenario = scenarios.find((s) => s.pinned) ?? wedding?.activeScenarioId ? scenarios.find((s) => s.id === wedding?.activeScenarioId) : undefined;
  const nextAnchor = useMemo(() => nextUpcomingAnchor(settings?.planConfig.anchors ?? []), [settings]);
  const estimateTotal = budgetItems.reduce((sum, item) => sum + (item.estimate ?? 0), 0);

  if (!ready) {
    return <p className="text-sm text-muted-foreground">Loading your wedding…</p>;
  }

  if (!wedding) {
    return <p className="text-sm text-muted-foreground">No wedding found. Something went wrong during setup.</p>;
  }

  const dateHeadline = wedding.targetDate
    ? formatDate(wedding.targetDate, "EEEE, MMMM d, yyyy")
    : wedding.targetSeason
      ? seasonLabel(wedding.targetSeason)
      : "Date not set yet";

  return (
    <div className="flex flex-col gap-8">
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid gap-6 p-6 sm:grid-cols-[1.3fr_1fr] sm:p-10">
          <div>
            <p className="text-sm tracking-wide text-muted-foreground uppercase">
              {wedding.partnerA.name} &amp; {wedding.partnerB.name}
            </p>
            <h1 className="mt-2 font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl">
              {dateHeadline}
            </h1>
            <p className="mt-3 font-display text-xl text-rose">{formatCountdown(wedding.targetDate)}</p>
            {wedding.isDestination && (
              <Badge variant="accent" className="mt-4">
                Destination wedding
              </Badge>
            )}
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-lg border border-dashed border-border bg-background/60 p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <CalendarHeart className="size-4 text-rose" /> Next anchor
            </p>
            {nextAnchor ? (
              <>
                <p className="font-display text-lg">{nextAnchor.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(nextAnchor.date)} · {formatCountdown(nextAnchor.date)}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No anchors set yet. Add one from Plan Settings to organize around it.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="size-4 text-rose" /> This week
            </CardTitle>
            <Link href={`/w/${WEDDING_SLUG}/plan`} className="text-xs text-rose hover:underline">
              Full plan <ArrowRight className="inline size-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {thisWeek.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing due this week. Enjoy the calm.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {thisWeek.map((task) => {
                  const overdue = task.dueDate ? daysUntil(task.dueDate)! < 0 : false;
                  return (
                    <li key={task.id} className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm">
                      <span className="truncate">{task.title}</span>
                      <span className={overdue ? "shrink-0 font-medium text-destructive" : "shrink-0 text-muted-foreground"}>
                        {formatDate(task.dueDate)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinned className="size-4 text-rose" /> Pinned scenario
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pinnedScenario ? <ScenarioSummary scenario={pinnedScenario} /> : (
              <p className="text-sm text-muted-foreground">
                Pin a scenario on the{" "}
                <Link href={`/w/${WEDDING_SLUG}/destinations`} className="text-rose underline underline-offset-2">
                  Destinations
                </Link>{" "}
                page to see it here.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="size-4 text-rose" /> Budget snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <Stat label="Estimated so far" value={formatMoney(estimateTotal)} />
            <Stat label="Scenario target" value={pinnedScenario ? formatMoney(scenarioMath(pinnedScenario).totalCost) : "—"} />
            <Link href={`/w/${WEDDING_SLUG}/budget`} className="ml-auto self-end text-xs text-rose hover:underline">
              Open budget <ArrowRight className="inline size-3" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <QuickLink href={`/w/${WEDDING_SLUG}/guests`} label="Guest list" />
            <QuickLink href={`/w/${WEDDING_SLUG}/events`} label="Satellite events" />
            <QuickLink href={`/w/${WEDDING_SLUG}/party`} label="Wedding party" />
            <QuickLink href={`/w/${WEDDING_SLUG}/calendar`} label="Calendar" />
          </CardContent>
        </Card>
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

function nextUpcomingAnchor(anchors: { id: string; title: string; date?: string }[]) {
  const today = new Date().toISOString().slice(0, 10);
  return anchors
    .filter((a) => a.date && a.date >= today)
    .sort((a, b) => (a.date! < b.date! ? -1 : 1))[0];
}

function ScenarioSummary({ scenario }: { scenario: Scenario }) {
  const math = scenarioMath(scenario);
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="font-display text-lg">{scenario.name}</p>
      <Stat label="Expected guests" value={String(math.expectedGuests)} />
      <Stat label="Total cost" value={formatMoney(math.totalCost)} />
      <Stat label="Cost per guest" value={formatMoney(math.costPerGuest)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="font-display text-lg">{value}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-md border border-border px-3 py-2 transition-colors hover:bg-accent">
      {label}
      <ArrowRight className="size-3.5 text-muted-foreground" />
    </Link>
  );
}

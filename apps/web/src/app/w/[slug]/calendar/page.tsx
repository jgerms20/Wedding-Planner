"use client";

import { addMonths, eachDayOfInterval, format, isValid, parseISO, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, Download, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AgendaList } from "@/components/calendar/agenda-list";
import { calendarLegend, dotClasses, type CalendarItem } from "@/components/calendar/calendar-item";
import { DayPanel } from "@/components/calendar/day-panel";
import { dateKey, MonthGrid } from "@/components/calendar/month-grid";
import { EventEditorDialog } from "@/components/event-editor-dialog";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/loading-state";
import { buildIcs, downloadFile } from "@/lib/ics";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";
import { cn } from "@/lib/utils";

export default function CalendarPage() {
  const { repo, wedding, settings } = useRepoContext();
  const weddingId = wedding?.id;

  const loadEvents = useCallback(async () => (repo && weddingId ? repo.events.list(weddingId) : undefined), [repo, weddingId]);
  const { items: events, loading: loadingEvents, reload: reloadEvents } = useEntityList(loadEvents);

  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const loadTasks = useCallback(async () => (repo && weddingId ? repo.tasks.list(weddingId) : undefined), [repo, weddingId]);
  const { items: tasks, loading: loadingTasks } = useEntityList(loadTasks);

  const travelWindows = useMemo(() => settings?.planConfig.travelWindows ?? [], [settings]);

  const calendarItems = useMemo<CalendarItem[]>(() => {
    const fromEvents: CalendarItem[] = events.map((e) => ({ id: e.id, date: e.startsAt, title: e.title, kind: e.kind }));
    const fromTasks: CalendarItem[] = tasks
      .filter((t) => t.dueDate && t.status !== "done" && t.status !== "skipped")
      .map((t) => ({ id: t.id, date: t.dueDate as string, title: t.title, kind: "task" as const }));
    return [...fromEvents, ...fromTasks].sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [events, tasks]);

  const itemsByDate = useMemo(() => {
    const map = new Map<string, CalendarItem[]>();
    for (const item of calendarItems) {
      const key = item.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(item);
    }
    return map;
  }, [calendarItems]);

  const travelDates = useMemo(() => {
    const set = new Set<string>();
    for (const window of travelWindows) {
      const start = parseISO(window.start);
      const end = parseISO(window.end);
      if (!isValid(start) || !isValid(end) || start > end) continue;
      for (const day of eachDayOfInterval({ start, end })) set.add(dateKey(day));
    }
    return set;
  }, [travelWindows]);

  const todayKey = dateKey(new Date());

  const [monthAnchor, setMonthAnchor] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  // Initial month/day: the next upcoming item, else today. Runs once, as soon as both lists have loaded.
  useEffect(() => {
    if (monthAnchor || loadingEvents || loadingTasks) return;
    const upcoming = calendarItems.find((i) => i.date.slice(0, 10) >= todayKey);
    const upcomingKey = upcoming?.date.slice(0, 10);
    setMonthAnchor(upcomingKey ? parseISO(upcomingKey) : new Date());
    setSelectedDate(upcomingKey ?? todayKey);
  }, [monthAnchor, loadingEvents, loadingTasks, calendarItems, todayKey]);

  const upcoming = useMemo(() => calendarItems.filter((i) => i.date.slice(0, 10) >= todayKey), [calendarItems, todayKey]);

  function downloadIcs() {
    const ics = buildIcs(wedding ? wedding.name : "Our wedding", [
      ...calendarItems.map((i) => ({ uid: i.id, title: i.title, date: i.date })),
      ...travelWindows.flatMap((w) => [
        { uid: `${w.id}-start`, title: `${w.label} begins (${w.location})`, date: w.start },
        { uid: `${w.id}-end`, title: `${w.label} ends (${w.location})`, date: w.end },
      ]),
    ]);
    downloadFile("wedding-plan.ics", ics, "text/calendar");
  }

  if (!repo || !weddingId) return <LoadingState label="Opening the calendar…" />;

  const shownMonth = monthAnchor ?? new Date();

  function goToday() {
    setMonthAnchor(new Date());
    setSelectedDate(todayKey);
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="The calendar"
        title="Calendar"
        description="Every anchor, satellite event, task due date, and travel window in one line-up."
        action={
          <Button size="sm" onClick={() => setEventDialogOpen(true)}>
            <Plus className="size-4 stroke-[1.5]" /> Add event
          </Button>
        }
      />

      <div className="rise grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-3xl" data-testid="calendar-month-title">
              {format(shownMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Previous month" onClick={() => setMonthAnchor(subMonths(shownMonth, 1))}>
                <ChevronLeft className="size-4 stroke-[1.5]" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToday}>
                Today
              </Button>
              <Button variant="ghost" size="icon" aria-label="Next month" onClick={() => setMonthAnchor(addMonths(shownMonth, 1))}>
                <ChevronRight className="size-4 stroke-[1.5]" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-soft">
            {calendarLegend().map((l) => (
              <span key={l.kind} className="inline-flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full", dotClasses(l.kind))} /> {l.label}
              </span>
            ))}
          </div>

          <MonthGrid
            monthAnchor={shownMonth}
            itemsByDate={itemsByDate}
            travelDates={travelDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        <DayPanel selectedDate={selectedDate} items={selectedDate ? (itemsByDate.get(selectedDate) ?? []) : []} />
      </div>

      <div className="hairline my-10" />

      <section>
        <p className="eyebrow">Coming up</p>
        <h2 className="mt-1 text-3xl">Everything ahead</h2>
        <div className="mt-5">
          <AgendaList items={upcoming} />
        </div>
      </section>

      <div className="hairline my-10" />

      <section className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-ink-soft">
          Downloads a file to import into Google or Apple Calendar. Live sync arrives with accounts.
        </p>
        <Button variant="outline" size="sm" onClick={downloadIcs}>
          <Download className="size-4 stroke-[1.5]" /> Add to Google / Apple Calendar
        </Button>
      </section>

      <EventEditorDialog
        open={eventDialogOpen}
        onOpenChange={setEventDialogOpen}
        weddingId={weddingId}
        onSave={async (event) => {
          await repo.events.upsert(event);
          await reloadEvents();
        }}
      />
    </div>
  );
}

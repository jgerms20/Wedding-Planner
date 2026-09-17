"use client";

import { Download, Plane } from "lucide-react";
import { useCallback, useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { buildIcs, downloadFile } from "@/lib/ics";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

interface CalendarItem {
  id: string;
  date: string;
  title: string;
  kind: string;
}

export default function CalendarPage() {
  const { repo, wedding, settings } = useRepoContext();
  const weddingId = wedding?.id;

  const loadEvents = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.events.list(weddingId);
  }, [repo, weddingId]);
  const { items: events } = useEntityList(loadEvents);

  const loadTasks = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.tasks.list(weddingId);
  }, [repo, weddingId]);
  const { items: tasks } = useEntityList(loadTasks);

  const travelWindows = settings?.planConfig.travelWindows ?? [];

  const items = useMemo<CalendarItem[]>(() => {
    const eventItems: CalendarItem[] = events.map((e) => ({ id: e.id, date: e.startsAt, title: e.title, kind: e.kind }));
    const taskItems: CalendarItem[] = tasks
      .filter((t) => t.dueDate && t.status !== "done" && t.status !== "skipped")
      .map((t) => ({ id: t.id, date: t.dueDate!, title: t.title, kind: "task" }));
    return [...eventItems, ...taskItems].sort((a, b) => (a.date < b.date ? -1 : 1));
  }, [events, tasks]);

  const byMonth = useMemo(() => {
    const map = new Map<string, CalendarItem[]>();
    for (const item of items) {
      const month = item.date.slice(0, 7);
      if (!map.has(month)) map.set(month, []);
      map.get(month)!.push(item);
    }
    return [...map.entries()];
  }, [items]);

  function downloadIcs() {
    const ics = buildIcs(wedding ? wedding.name : "Our wedding", [
      ...items.map((i) => ({ uid: i.id, title: i.title, date: i.date })),
      ...travelWindows.flatMap((w) => [
        { uid: `${w.id}-start`, title: `${w.label} begins (${w.location})`, date: w.start },
        { uid: `${w.id}-end`, title: `${w.label} ends (${w.location})`, date: w.end },
      ]),
    ]);
    downloadFile("wedding-plan.ics", ics, "text/calendar");
  }

  if (!repo || !weddingId) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Calendar"
        description="Every task due date, event, and anchor in one line-up."
        action={
          <Button size="sm" onClick={downloadIcs}>
            <Download className="size-4" /> Download .ics
          </Button>
        }
      />

      {travelWindows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="size-4 text-rose" /> Travel windows
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {travelWindows.map((w) => (
              <Badge key={w.id} variant="secondary">
                {w.label}: {formatDate(w.start)} – {formatDate(w.end)} ({w.location})
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {byMonth.length === 0 && <p className="text-sm text-muted-foreground">Nothing on the calendar yet.</p>}
        {byMonth.map(([month, monthItems]) => (
          <Card key={month}>
            <CardHeader>
              <CardTitle>{formatDate(`${month}-01`, "MMMM yyyy")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col divide-y divide-border">
                {monthItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                    <span>{item.title}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      <Badge variant="outline">{item.kind}</Badge>
                      <span className="text-muted-foreground">{formatDate(item.date)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

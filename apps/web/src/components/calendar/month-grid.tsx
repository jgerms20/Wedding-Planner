"use client";

import { addDays, endOfMonth, endOfWeek, format, isSameMonth, isToday, startOfMonth, startOfWeek } from "date-fns";
import type { CalendarItem } from "@/components/calendar/calendar-item";
import { chipClasses } from "@/components/calendar/calendar-item";
import { cn } from "@/lib/utils";

/** Sunday-start weeks, matching the "Sat, Apr 17" US-calendar voice used across Atlas. */
const WEEK_STARTS_ON = 0;

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Full 7-day weeks covering `monthAnchor`'s month, including the leading and
 * trailing days of the adjacent months needed to fill out the grid. Pure date
 * math — see apps/web/test/month-grid.test.ts.
 */
export function getMonthWeeks(monthAnchor: Date): Date[][] {
  const gridStart = startOfWeek(startOfMonth(monthAnchor), { weekStartsOn: WEEK_STARTS_ON });
  const gridEnd = endOfWeek(endOfMonth(monthAnchor), { weekStartsOn: WEEK_STARTS_ON });

  const weeks: Date[][] = [];
  let cursor = gridStart;
  while (cursor <= gridEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export function dateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

const MAX_CHIPS = 3;

export function MonthGrid({
  monthAnchor,
  itemsByDate,
  travelDates,
  selectedDate,
  onSelectDate,
}: {
  monthAnchor: Date;
  itemsByDate: Map<string, CalendarItem[]>;
  travelDates: Set<string>;
  selectedDate?: string;
  onSelectDate: (key: string) => void;
}) {
  const weeks = getMonthWeeks(monthAnchor);

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-line" data-testid="month-grid">
      <div className="grid grid-cols-7 gap-px bg-line">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="bg-paper-deep px-1 py-1.5 text-center text-[0.6rem] font-semibold tracking-[0.14em] text-ink-soft uppercase sm:text-[0.65rem]"
          >
            {label}
          </div>
        ))}
        {weeks.map((week) =>
          week.map((day) => {
            const key = dateKey(day);
            const items = itemsByDate.get(key) ?? [];
            const visible = items.slice(0, MAX_CHIPS);
            const overflow = items.length - visible.length;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectDate(key)}
                aria-pressed={selectedDate === key}
                className={cn(
                  "flex min-h-[72px] flex-col items-start gap-0.5 bg-card p-1 text-left transition-colors sm:min-h-[96px] sm:p-1.5",
                  !isSameMonth(day, monthAnchor) && "bg-paper text-ink-mute",
                  selectedDate === key && "bg-coral-soft/50",
                  travelDates.has(key) && "bg-ink/[0.05]",
                )}
              >
                <span
                  className={cn(
                    "tabular flex size-5 shrink-0 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm",
                    isToday(day) ? "ring-2 ring-coral font-semibold text-foreground" : "text-ink-soft",
                    !isSameMonth(day, monthAnchor) && "text-ink-mute",
                  )}
                >
                  {format(day, "d")}
                </span>
                <div className="flex w-full min-w-0 flex-col gap-0.5">
                  {visible.map((item) => (
                    <span
                      key={item.id}
                      className={cn("block truncate rounded-sm px-1 text-[0.55rem] leading-[1.2] sm:text-[0.65rem]", chipClasses(item.kind))}
                      title={item.title}
                    >
                      {item.title}
                    </span>
                  ))}
                  {overflow > 0 && <span className="text-[0.55rem] text-ink-mute sm:text-[0.65rem]">+{overflow} more</span>}
                </div>
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}

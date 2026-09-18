"use client";

import { format, parseISO } from "date-fns";
import Link from "next/link";
import type { CalendarItem } from "@/components/calendar/calendar-item";
import { dotClasses, hrefForItem } from "@/components/calendar/calendar-item";
import { WEDDING_SLUG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const base = `/w/${WEDDING_SLUG}`;

/** Every item passed in, grouped by month, regardless of which month the grid above shows. */
export function AgendaList({ items }: { items: CalendarItem[] }) {
  const byMonth = groupByMonth(items);
  if (byMonth.length === 0) {
    return <p className="text-sm text-ink-soft">Nothing coming up yet. Tell Atlas a date and it lands here.</p>;
  }
  return (
    <div className="flex flex-col gap-6">
      {byMonth.map(([month, monthItems]) => (
        <div key={month}>
          <p className="eyebrow">{format(parseISO(`${month}-01`), "MMMM yyyy")}</p>
          <ul className="mt-2 divide-y divide-line">
            {monthItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-2.5 text-[15px]">
                <span className={cn("size-2 shrink-0 rounded-full", dotClasses(item.kind))} />
                <Link href={hrefForItem(item, base)} className="min-w-0 flex-1 truncate transition-colors hover:text-coral">
                  {item.title}
                </Link>
                <span className="tabular shrink-0 text-sm text-ink-soft">{format(parseISO(item.date.slice(0, 10)), "EEE, MMM d")}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function groupByMonth(items: CalendarItem[]): [string, CalendarItem[]][] {
  const map = new Map<string, CalendarItem[]>();
  for (const item of items) {
    const month = item.date.slice(0, 7);
    if (!map.has(month)) map.set(month, []);
    map.get(month)?.push(item);
  }
  return [...map.entries()];
}

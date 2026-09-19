"use client";

import { format, parseISO } from "date-fns";
import Link from "next/link";
import type { CalendarItem } from "@/components/calendar/calendar-item";
import { dotClasses, hrefForItem, isEditableEvent, kindLabel } from "@/components/calendar/calendar-item";
import { WEDDING_SLUG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const base = `/w/${WEDDING_SLUG}`;

/** The right-column (desktop) / below-grid (mobile) list of everything on the selected day. */
export function DayPanel({
  selectedDate,
  items,
  onEditEvent,
}: {
  selectedDate?: string;
  items: CalendarItem[];
  /** Opens the item's own edit dialog, for a standalone event whose date isn't owned elsewhere. */
  onEditEvent: (item: CalendarItem) => void;
}) {
  return (
    <div className="postcard p-5">
      <p className="eyebrow">On this day</p>
      {!selectedDate ? (
        <p className="mt-2 text-sm text-ink-soft">Tap a day on the grid to see everything on it.</p>
      ) : (
        <>
          <p className="mt-1 font-display text-xl">{format(parseISO(selectedDate), "EEEE, MMM d")}</p>
          {items.length === 0 ? (
            <p className="mt-3 text-sm text-ink-soft">Nothing scheduled. Tell Atlas to plan something here.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-2.5 py-2.5">
                  <span className={cn("size-2 shrink-0 rounded-full", dotClasses(item.kind))} />
                  <div className="min-w-0 flex-1">
                    {isEditableEvent(item) ? (
                      <button type="button" onClick={() => onEditEvent(item)} className="block w-full truncate text-left text-[15px] transition-colors hover:text-coral">
                        {item.title}
                      </button>
                    ) : (
                      <Link href={hrefForItem(item, base)} className="block truncate text-[15px] transition-colors hover:text-coral">
                        {item.title}
                      </Link>
                    )}
                    <p className="text-xs text-ink-mute capitalize">{kindLabel(item.kind)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

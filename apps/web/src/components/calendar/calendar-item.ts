import type { EventKind } from "@bower/shared";

/** Everything that can land on a calendar day: a real Event, or a task's due date. */
export type CalendarItemKind = EventKind | "task";

export interface CalendarItem {
  id: string;
  /** ISO date (YYYY-MM-DD) or date-time; only the date part is used for placement. */
  date: string;
  title: string;
  kind: CalendarItemKind;
}

/** Tailwind classes for a day-cell chip, by kind. Gold never carries text on ivory, per the design system. */
export function chipClasses(kind: CalendarItemKind): string {
  switch (kind) {
    case "anchor":
      return "bg-coral-soft text-coral";
    case "sub_event":
      return "bg-gold-soft text-ink-700";
    case "travel":
      return "bg-ink text-rail-foreground";
    case "task":
      return "bg-transparent text-ink-soft";
    default:
      return "bg-paper-deep text-ink-soft";
  }
}

/** The small legend dot color, by kind — used in the agenda and side list. */
export function dotClasses(kind: CalendarItemKind): string {
  switch (kind) {
    case "anchor":
      return "bg-coral";
    case "sub_event":
      return "bg-gold";
    case "travel":
      return "bg-ink";
    case "task":
      return "bg-ink-soft";
    default:
      return "bg-ink-mute";
  }
}

export function kindLabel(kind: CalendarItemKind): string {
  return kind.replace(/_/g, " ");
}

/** Where clicking through on this item should land. */
export function hrefForItem(item: CalendarItem, base: string): string {
  switch (item.kind) {
    case "sub_event":
      return `${base}/events`;
    case "tour":
      return `${base}/destinations`;
    default:
      return `${base}/plan`;
  }
}

const LEGEND: { kind: CalendarItemKind; label: string }[] = [
  { kind: "anchor", label: "Anchor" },
  { kind: "sub_event", label: "Satellite event" },
  { kind: "task", label: "Task due" },
  { kind: "travel", label: "Travel" },
];

export function calendarLegend() {
  return LEGEND;
}

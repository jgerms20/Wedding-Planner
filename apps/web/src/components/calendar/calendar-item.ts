import type { EventKind } from "@bower/shared";

/** Everything that can land on a calendar day: a real Event, or a task's due date. */
export type CalendarItemKind = EventKind | "task";

export interface CalendarItem {
  id: string;
  /** ISO date (YYYY-MM-DD) or date-time; only the date part is used for placement. */
  date: string;
  title: string;
  kind: CalendarItemKind;
  /** Set when this item is derived from something else (a satellite event, an anchor) that owns
   * its own date — editing there is the source of truth, so this item's row navigates instead of
   * opening an edit dialog. Undefined for a plain, standalone `Event` and for a task. */
  linkedType?: string;
}

/** A standalone Event (not derived from a task, and not tied to a satellite event/anchor) can be
 * edited in place; anything else navigates to wherever its real data lives. */
export function isEditableEvent(item: CalendarItem): boolean {
  return item.kind !== "task" && !item.linkedType;
}

/** Tailwind classes for a day-cell chip, by kind. Gold never carries text on ivory, per the design
 * system's restrained palette (ink, coral, gold only) — so every kind gets its own combination of
 * fill/outline/weight within those three colors rather than a made-up new hue. */
export function chipClasses(kind: CalendarItemKind): string {
  switch (kind) {
    case "anchor":
      return "bg-coral-soft text-coral";
    case "deadline":
      return "bg-coral text-primary-foreground";
    case "sub_event":
      return "bg-gold-soft text-ink-700";
    case "tour":
      return "border border-line-strong text-ink-soft";
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
    case "deadline":
      return "bg-coral-deep";
    case "sub_event":
      return "bg-gold";
    case "tour":
      return "bg-ink-mute";
    case "travel":
      return "bg-ink";
    case "task":
      return "bg-ink-soft";
    default:
      return "border border-line-strong bg-paper";
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
  { kind: "deadline", label: "Deadline" },
  { kind: "sub_event", label: "Satellite event" },
  { kind: "task", label: "Task due" },
  { kind: "tour", label: "Tour" },
  { kind: "travel", label: "Travel" },
  { kind: "other", label: "Other" },
];

export function calendarLegend() {
  return LEGEND;
}

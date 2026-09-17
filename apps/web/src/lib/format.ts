import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatMoney(value: number | undefined | null): string {
  if (value === undefined || value === null) return "—";
  return currencyFormatter.format(value);
}

export function formatDate(iso: string | undefined | null, pattern = "MMM d, yyyy"): string {
  if (!iso) return "—";
  const date = parseISO(iso);
  if (!isValid(date)) return "—";
  return format(date, pattern);
}

export function daysUntil(iso: string | undefined | null): number | undefined {
  if (!iso) return undefined;
  const date = parseISO(iso);
  if (!isValid(date)) return undefined;
  return differenceInCalendarDays(date, new Date());
}

export function formatCountdown(iso: string | undefined | null): string {
  const days = daysUntil(iso);
  if (days === undefined) return "Date not set yet";
  if (days > 1) return `${days} days to go`;
  if (days === 1) return "Tomorrow!";
  if (days === 0) return "Today!";
  return `${Math.abs(days)} days ago`;
}

/** "Spring 2028" style label when only a season is known. */
export function seasonLabel(targetSeason: string | undefined | null): string | undefined {
  if (!targetSeason) return undefined;
  return targetSeason.replace(/\b\w/g, (c) => c.toUpperCase());
}

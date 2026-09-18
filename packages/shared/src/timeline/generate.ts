import type { Event, PlanConfig, PlanPace, Task, TravelWindow, Wedding } from "../entities/index";
import { newId, nowIso } from "../util";
import { COMMS_TEMPLATE_IDS, TEMPLATE_TASKS, type TemplateTask } from "./template";

const AVERAGE_DAYS_PER_MONTH = 30.4368;

/** Scales every default lead time — an "aggressive" plan compresses the runway, "relaxed"
 * stretches it. Never applied to an explicit per-task override or a date pinned to an anchor,
 * since those are the couple's own direct commitments, not a default worth pacing. */
const PACE_MULTIPLIERS: Record<PlanPace, number> = {
  relaxed: 1.25,
  balanced: 1,
  aggressive: 0.75,
};

/** Month (0-based) each season starts in, for a couple who only knows a season. Winter is taken as December of the given year. */
const SEASON_START_MONTH: Record<string, number> = {
  spring: 2,
  summer: 5,
  fall: 8,
  autumn: 8,
  winter: 11,
};

/** Parses a free-text season like "Spring 2027" into that season's first day. */
export function parseSeasonStart(targetSeason: string): Date | undefined {
  const match = /([A-Za-z]+)\D*(\d{4})/.exec(targetSeason);
  if (!match) return undefined;
  const season = match[1]?.toLowerCase();
  const year = Number(match[2]);
  const month = season ? SEASON_START_MONTH[season] : undefined;
  if (month === undefined || Number.isNaN(year)) return undefined;
  return new Date(Date.UTC(year, month, 1));
}

/** The date to schedule everything against: the target date, or the first day of the target season. */
function resolveReferenceDate(wedding: Wedding): Date | undefined {
  if (wedding.targetDate) return new Date(wedding.targetDate);
  if (wedding.targetSeason) return parseSeasonStart(wedding.targetSeason);
  return undefined;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Subtracts (fractional) months from a reference date, using an average month length so half-months resolve sensibly. */
function subtractMonths(reference: Date, monthsBefore: number): string {
  const days = Math.round(monthsBefore * AVERAGE_DAYS_PER_MONTH);
  const result = new Date(reference.getTime());
  result.setUTCDate(result.getUTCDate() - days);
  return toIsoDate(result);
}

function daysBefore(isoDate: string, days: number): string {
  const date = new Date(isoDate);
  date.setUTCDate(date.getUTCDate() - days);
  return toIsoDate(date);
}

const REVEAL_BY_TEMPLATE_ID: Record<string, "date" | "destination" | "wedding_party"> = {
  finalize_date: "date",
  pin_destination_scenario: "destination",
  choose_wedding_party: "wedding_party",
};

function commsMonthsBefore(templateId: string, planConfig: PlanConfig): number | undefined {
  switch (templateId) {
    case "save_the_dates":
      return planConfig.saveTheDatesMonthsBefore;
    case "invitations":
      return planConfig.invitationsMonthsBefore;
    case "rsvp_deadline":
      return planConfig.rsvpDeadlineMonthsBefore;
    default:
      return undefined;
  }
}

export interface GeneratePlanArgs {
  wedding: Wedding;
  planConfig: PlanConfig;
  existingTasks: Task[];
  /**
   * No untouched task is due before this date (ISO date; defaults to today).
   * Template offsets can land before the engagement for a short-lead wedding;
   * those tasks are spread over the six weeks after this date instead.
   */
  earliest?: string;
}

/**
 * Regenerates the full task list for a wedding from the default template plus
 * PlanConfig (anchors, travel windows, comms offsets, per-template overrides),
 * preserving whatever the couple has already edited on `existingTasks`. See
 * docs/specs/web-local-mode.md "Timeline engine" for the rules this
 * implements.
 */
export function generatePlan({ wedding, planConfig, existingTasks, earliest }: GeneratePlanArgs): Task[] {
  const referenceDate = resolveReferenceDate(wedding);
  const now = nowIso();
  const floor = earliest ?? now.slice(0, 10);

  const existingByTemplateId = new Map(
    existingTasks.filter((t): t is Task & { templateId: string } => Boolean(t.templateId)).map((t) => [t.templateId, t]),
  );

  const applicable = TEMPLATE_TASKS.filter((t) => !t.destinationOnly || wedding.isDestination);

  const idByTemplateId = new Map<string, string>();
  for (const template of applicable) {
    idByTemplateId.set(template.templateId, existingByTemplateId.get(template.templateId)?.id ?? newId());
  }

  const engagementAnchor = planConfig.anchors.find((a) => a.kind === "engagement_party");
  const saveTheDatesAnchor = planConfig.anchors.find((a) => a.kind === "save_the_dates");

  const generated = applicable.map((template) =>
    generateTask(template, {
      wedding,
      planConfig,
      referenceDate,
      now,
      id: idByTemplateId.get(template.templateId)!,
      existing: existingByTemplateId.get(template.templateId),
      engagementAnchorDate: engagementAnchor?.date,
      engagementReveals: engagementAnchor?.reveals ?? [],
      saveTheDatesAnchorDate: saveTheDatesAnchor?.date,
    }),
  );

  // Resolve dependsOn (declared as templateIds on the template) into task ids,
  // dropping any dependency whose template didn't apply (e.g. destination-only).
  for (let i = 0; i < applicable.length; i++) {
    const template = applicable[i];
    const task = generated[i];
    if (!template || !task) continue;
    task.dependsOn = (template.dependsOn ?? [])
      .map((depTemplateId) => idByTemplateId.get(depTemplateId))
      .filter((id): id is string => Boolean(id));
  }

  return assignTravelWindows(spreadPastDue(generated, floor), planConfig.travelWindows);
}

function shiftDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return toIsoDate(d);
}

/**
 * Untouched tasks whose computed due date is already in the past get spread,
 * in their original order, across the six weeks after `floor` so a newly
 * engaged couple sees a runway instead of a wall of overdue items.
 */
function spreadPastDue(tasks: Task[], floor: string): Task[] {
  const late = tasks
    .filter((t) => t.status === "todo" && t.dueDate && t.dueDate < floor)
    .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : a.dueDate! > b.dueDate! ? 1 : 0));
  if (late.length === 0) return tasks;
  const span = 42;
  late.forEach((task, i) => {
    task.dueDate = shiftDays(floor, 3 + Math.round((i * span) / late.length));
  });
  return tasks;
}

interface GenerateTaskContext {
  wedding: Wedding;
  planConfig: PlanConfig;
  referenceDate: Date | undefined;
  now: string;
  id: string;
  existing: Task | undefined;
  engagementAnchorDate: string | undefined;
  engagementReveals: ("date" | "destination" | "wedding_party")[];
  saveTheDatesAnchorDate: string | undefined;
}

function generateTask(template: TemplateTask, ctx: GenerateTaskContext): Task {
  const { wedding, planConfig, referenceDate, now, id, existing } = ctx;
  const override = planConfig.overrides[template.templateId];
  const pace = planConfig.pace ?? "balanced";
  const paceMultiplier = PACE_MULTIPLIERS[pace];

  const baseMonthsBefore = commsMonthsBefore(template.templateId, planConfig) ?? template.monthsBefore;
  const monthsBefore = override?.monthsBefore ?? baseMonthsBefore * paceMultiplier;
  const roundedMonths = Math.round(monthsBefore * 10) / 10;

  let freshDueDate = referenceDate ? subtractMonths(referenceDate, monthsBefore) : undefined;
  let reason: string | undefined = referenceDate
    ? override?.monthsBefore !== undefined
      ? `Set to ${roundedMonths} months before the wedding date — you overrode this task's own default lead time in Plan settings.`
      : pace === "balanced"
        ? `${roundedMonths} months before the wedding date, this task's default lead time.`
        : `${roundedMonths} months before the wedding date — the default lead time, ${pace === "relaxed" ? "stretched" : "compressed"} for a ${pace} pace (×${PACE_MULTIPLIERS[pace]}).`
    : undefined;

  // A dated save-the-dates anchor wins over the computed/configured offset.
  if (template.templateId === "save_the_dates" && ctx.saveTheDatesAnchorDate) {
    freshDueDate = ctx.saveTheDatesAnchorDate;
    reason = "Matches the save-the-dates date you set in Plan settings.";
  }

  // The "prepare materials" engagement-party task is pinned 8 weeks before the anchor, when one exists.
  if (template.templateId === "plan_engagement_party" && ctx.engagementAnchorDate) {
    freshDueDate = daysBefore(ctx.engagementAnchorDate, 56);
    reason = "8 weeks before your engagement party, so there's time to prepare.";
  }

  // finalize_date / pin_destination_scenario / choose_wedding_party pull in to
  // two weeks before the engagement party, if it reveals that thing.
  const reveal = REVEAL_BY_TEMPLATE_ID[template.templateId];
  if (reveal && ctx.engagementAnchorDate && ctx.engagementReveals.includes(reveal)) {
    freshDueDate = daysBefore(ctx.engagementAnchorDate, 14);
    reason = "2 weeks before your engagement party, since that's when you're revealing this.";
  }

  const isComms = (COMMS_TEMPLATE_IDS as readonly string[]).includes(template.templateId);

  if (!existing) {
    return {
      id,
      weddingId: wedding.id,
      templateId: template.templateId,
      title: template.title,
      description: template.description,
      phase: template.phase,
      dueDate: freshDueDate,
      dueDateReason: reason,
      status: override?.skipped ? "skipped" : "todo",
      tags: [...template.tags],
      dependsOn: [],
      windowId: undefined,
      createdAt: now,
      updatedAt: now,
    };
  }

  // Regeneration: keep the couple's edits. Status and title are always kept.
  // The due date is kept too once a task has moved off "todo" (our signal
  // that a person touched it), unless an explicit override says otherwise —
  // config-driven due dates (comms offsets, anchors) above always apply to
  // untouched ("todo") tasks so a plain regenerate still reacts to a changed
  // wedding date or anchor.
  const manuallyTouched = existing.status !== "todo";
  const useFresh = override?.monthsBefore !== undefined || isComms || !manuallyTouched;
  const dueDate = useFresh ? freshDueDate : existing.dueDate;
  const dueDateReason = useFresh ? reason : "You set this date yourself.";

  return {
    id,
    weddingId: wedding.id,
    templateId: template.templateId,
    title: existing.title,
    description: existing.description ?? template.description,
    phase: template.phase,
    dueDate,
    dueDateReason,
    status: override?.skipped ? "skipped" : existing.status,
    tags: existing.tags.length > 0 ? existing.tags : [...template.tags],
    dependsOn: [],
    sourceAgent: existing.sourceAgent,
    windowId: existing.windowId,
    createdAt: existing.createdAt,
    updatedAt: now,
  };
}

/**
 * Assigns in-person tasks to the travel window they fall in, the latest
 * window that finishes before their due date, or (tagged `needs-window`) the
 * earliest window still ahead of them.
 */
function assignTravelWindows(tasks: Task[], windows: TravelWindow[]): Task[] {
  if (windows.length === 0) return tasks;

  return tasks.map((task) => {
    if (!task.tags.includes("in-person") || !task.dueDate) return task;
    const due = task.dueDate;

    const containing = windows.find((w) => w.start <= due && due <= w.end);
    if (containing) {
      return { ...task, windowId: containing.id, tags: task.tags.filter((t) => t !== "needs-window") };
    }

    const preceding = [...windows].filter((w) => w.end < due).sort((a, b) => (a.end < b.end ? 1 : -1))[0];
    if (preceding) {
      return { ...task, windowId: preceding.id, tags: task.tags.filter((t) => t !== "needs-window") };
    }

    const following = [...windows].filter((w) => w.start > due).sort((a, b) => (a.start > b.start ? 1 : -1))[0];
    if (following) {
      const tags = task.tags.includes("needs-window") ? task.tags : [...task.tags, "needs-window"];
      return { ...task, windowId: following.id, tags };
    }

    return task;
  });
}

/** Derives calendar Events for every dated anchor, so they show up alongside tasks and deadlines. */
export function generateAnchorEvents(wedding: Wedding, planConfig: PlanConfig): Event[] {
  return planConfig.anchors
    .filter((a) => Boolean(a.date))
    .map((anchor) => ({
      id: `anchor-event-${anchor.id}`,
      weddingId: wedding.id,
      title: anchor.title,
      startsAt: anchor.date!,
      allDay: true,
      kind: "anchor",
      linkedType: "anchor",
      linkedId: anchor.id,
    }));
}

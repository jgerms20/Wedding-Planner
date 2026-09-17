import type { Event, PlanConfig, Task, TravelWindow, Wedding } from "../entities/index.js";
import { newId, nowIso } from "../util.js";
import { COMMS_TEMPLATE_IDS, TEMPLATE_TASKS, type TemplateTask } from "./template.js";

const AVERAGE_DAYS_PER_MONTH = 30.4368;

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
}

/**
 * Regenerates the full task list for a wedding from the default template plus
 * PlanConfig (anchors, travel windows, comms offsets, per-template overrides),
 * preserving whatever the couple has already edited on `existingTasks`. See
 * docs/specs/web-local-mode.md "Timeline engine" for the rules this
 * implements.
 */
export function generatePlan({ wedding, planConfig, existingTasks }: GeneratePlanArgs): Task[] {
  const referenceDate = resolveReferenceDate(wedding);
  const now = nowIso();

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

  return assignTravelWindows(generated, planConfig.travelWindows);
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

  const monthsBefore = override?.monthsBefore ?? commsMonthsBefore(template.templateId, planConfig) ?? template.monthsBefore;

  let freshDueDate = referenceDate ? subtractMonths(referenceDate, monthsBefore) : undefined;

  // A dated save-the-dates anchor wins over the computed/configured offset.
  if (template.templateId === "save_the_dates" && ctx.saveTheDatesAnchorDate) {
    freshDueDate = ctx.saveTheDatesAnchorDate;
  }

  // The "prepare materials" engagement-party task is pinned 8 weeks before the anchor, when one exists.
  if (template.templateId === "plan_engagement_party" && ctx.engagementAnchorDate) {
    freshDueDate = daysBefore(ctx.engagementAnchorDate, 56);
  }

  // finalize_date / pin_destination_scenario / choose_wedding_party pull in to
  // two weeks before the engagement party, if it reveals that thing.
  const reveal = REVEAL_BY_TEMPLATE_ID[template.templateId];
  if (reveal && ctx.engagementAnchorDate && ctx.engagementReveals.includes(reveal)) {
    freshDueDate = daysBefore(ctx.engagementAnchorDate, 14);
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
  const dueDate = override?.monthsBefore !== undefined || isComms ? freshDueDate : manuallyTouched ? existing.dueDate : freshDueDate;

  return {
    id,
    weddingId: wedding.id,
    templateId: template.templateId,
    title: existing.title,
    description: existing.description ?? template.description,
    phase: template.phase,
    dueDate,
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

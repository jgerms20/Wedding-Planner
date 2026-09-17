import { z } from "zod";
import {
  eventKindSchema,
  phaseKeySchema,
  sideSchema,
  subEventKindSchema,
  tierSchema,
  type BudgetItem,
  type Guest,
  type Household,
  type Task,
  type Wedding,
} from "../entities/index";
import type { WeddingRepo } from "../repo/types";
import { newId, nowIso } from "../util";

/**
 * What Bower is allowed to do on the couple's behalf. Every action is a plain
 * object so it can be proposed, shown as a card, approved, applied, and undone.
 * Schemas avoid records and numeric constraints so they translate cleanly to
 * the API's structured-output JSON schema.
 */

const isoDate = z.string().describe("YYYY-MM-DD");

export const guestDraftSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  side: sideSchema.optional().describe("a = Joshua's side, b = Janel's side, both = shared friends"),
  tier: tierSchema.optional().describe("must / should / nice; default must"),
  relationship: z.string().optional().describe("e.g. cousin, college friend, coworker"),
  plusOne: z.boolean().optional(),
  isChild: z.boolean().optional(),
  homeCity: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  dietary: z.string().optional(),
  householdName: z.string().optional().describe("Group guests who live together, e.g. 'The Lees'"),
});
export type GuestDraft = z.infer<typeof guestDraftSchema>;

export const addGuestsAction = z.object({
  type: z.literal("add_guests"),
  guests: z.array(guestDraftSchema),
});

export const addTaskAction = z.object({
  type: z.literal("add_task"),
  title: z.string(),
  description: z.string().optional(),
  phase: phaseKeySchema.optional(),
  dueDate: isoDate.optional(),
  tags: z.array(z.string()).optional(),
});

export const completeTaskAction = z.object({
  type: z.literal("complete_task"),
  taskId: z.string().optional(),
  titleMatch: z.string().optional().describe("Part of the task title, when the id is unknown"),
});

export const addEventAction = z.object({
  type: z.literal("add_event"),
  title: z.string(),
  date: isoDate,
  endDate: isoDate.optional(),
  kind: eventKindSchema.optional(),
});

export const addSubEventAction = z.object({
  type: z.literal("add_sub_event"),
  kind: subEventKindSchema,
  title: z.string().optional(),
  date: isoDate.optional(),
  location: z.string().optional(),
  hostName: z.string().optional(),
  budgetEstimate: z.number().optional(),
  guestRule: z.string().optional(),
  notes: z.string().optional(),
});

export const weddingFieldSchema = z.enum([
  "targetDate",
  "targetSeason",
  "dateFlexibility",
  "guestTarget",
  "locationText",
  "styleNotes",
  "isDestination",
  "partnerAName",
  "partnerBName",
]);
export type WeddingField = z.infer<typeof weddingFieldSchema>;

export const setWeddingFieldAction = z.object({
  type: z.literal("set_wedding_field"),
  field: weddingFieldSchema,
  value: z.string().describe("Always a string; numbers and booleans are coerced (e.g. '120', 'true')"),
});

export const addDestinationAction = z.object({
  type: z.literal("add_destination"),
  name: z.string(),
  country: z.string(),
  region: z.string().optional(),
  whyHere: z.string().optional(),
  travelCostPerGuestEstimate: z.number().optional(),
  lodgingPerNightEstimate: z.number().optional(),
  attendanceRateEstimate: z.number().optional().describe("0..1"),
  weatherNotes: z.string().optional(),
  legalNotes: z.string().optional(),
  seasonNotes: z.string().optional(),
  sourceUrls: z.array(z.string()).optional(),
});

export const addVenueAction = z.object({
  type: z.literal("add_venue"),
  destinationId: z.string().optional(),
  destinationName: z.string().optional().describe("Used when the id is unknown; matched case-insensitively"),
  name: z.string(),
  website: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  capacity: z.number().optional(),
  rentalFee: z.number().optional(),
  fbMinimum: z.number().optional(),
  perGuestCost: z.number().optional(),
  inHouseCatering: z.boolean().optional(),
  lodgingOnSite: z.boolean().optional(),
  styleNotes: z.string().optional(),
  availabilityNotes: z.string().optional(),
  sourceUrls: z.array(z.string()).optional(),
});

export const addBudgetItemAction = z.object({
  type: z.literal("add_budget_item"),
  categoryName: z.string().describe("Existing category name; created if missing"),
  name: z.string(),
  estimate: z.number().optional(),
  quoted: z.number().optional(),
  contracted: z.number().optional(),
  paid: z.number().optional(),
  dueDate: isoDate.optional(),
  notes: z.string().optional(),
});

export const updateBudgetItemAction = z.object({
  type: z.literal("update_budget_item"),
  itemId: z.string().optional(),
  nameMatch: z.string().optional(),
  estimate: z.number().optional(),
  quoted: z.number().optional(),
  contracted: z.number().optional(),
  paid: z.number().optional(),
  dueDate: isoDate.optional(),
  notes: z.string().optional(),
});

export const addPartyMemberAction = z.object({
  type: z.literal("add_party_member"),
  name: z.string(),
  role: z.string().describe("e.g. maid of honor, best man, bridesmaid, groomsman, officiant"),
  side: sideSchema.optional(),
  asked: z.boolean().optional(),
  contact: z.string().optional(),
  notes: z.string().optional(),
});

export const addDecisionAction = z.object({
  type: z.literal("add_decision"),
  title: z.string(),
  detail: z.string().optional(),
});

export const addNoteAction = z.object({
  type: z.literal("add_note"),
  text: z.string(),
  linkedType: z.string().optional(),
  linkedId: z.string().optional(),
});

export const actionSchema = z.discriminatedUnion("type", [
  addGuestsAction,
  addTaskAction,
  completeTaskAction,
  addEventAction,
  addSubEventAction,
  setWeddingFieldAction,
  addDestinationAction,
  addVenueAction,
  addBudgetItemAction,
  updateBudgetItemAction,
  addPartyMemberAction,
  addDecisionAction,
  addNoteAction,
]);
export type BowerAction = z.infer<typeof actionSchema>;
export type BowerActionType = BowerAction["type"];

/** The shape Bower returns for any "tell me / ask me" turn. */
export const bowerResponseSchema = z.object({
  reply: z.string().describe("A short, warm reply to the couple; one to three sentences"),
  actions: z.array(actionSchema).describe("Concrete changes to make; empty when the message is just a question"),
});
export type BowerResponse = z.infer<typeof bowerResponseSchema>;

/** One-line human description for an action card. */
export function describeAction(action: BowerAction): string {
  switch (action.type) {
    case "add_guests": {
      const names = action.guests.map((g) => [g.firstName, g.lastName].filter(Boolean).join(" "));
      const shown = names.slice(0, 3).join(", ");
      const more = names.length > 3 ? ` and ${names.length - 3} more` : "";
      return `Add ${names.length} guest${names.length === 1 ? "" : "s"}: ${shown}${more}`;
    }
    case "add_task":
      return `Add task “${action.title}”${action.dueDate ? ` due ${action.dueDate}` : ""}`;
    case "complete_task":
      return `Mark “${action.titleMatch ?? action.taskId ?? "task"}” done`;
    case "add_event":
      return `Add “${action.title}” to the calendar on ${action.date}`;
    case "add_sub_event":
      return `Add ${action.title ?? action.kind.replace(/_/g, " ")}${action.date ? ` on ${action.date}` : ""}`;
    case "set_wedding_field":
      return `Set ${action.field} to “${action.value}”`;
    case "add_destination":
      return `Add destination ${action.name}, ${action.country}`;
    case "add_venue":
      return `Add venue ${action.name}${action.destinationName ? ` in ${action.destinationName}` : ""}`;
    case "add_budget_item":
      return `Add budget line “${action.name}” under ${action.categoryName}${action.estimate !== undefined ? ` (~$${action.estimate.toLocaleString()})` : ""}`;
    case "update_budget_item":
      return `Update budget line “${action.nameMatch ?? action.itemId ?? "item"}”`;
    case "add_party_member":
      return `Add ${action.name} as ${action.role}`;
    case "add_decision":
      return `Log decision: ${action.title}`;
    case "add_note":
      return `Save note: ${action.text.length > 60 ? `${action.text.slice(0, 57)}…` : action.text}`;
  }
}

export interface ApplyOptions {
  /** Where the action came from, recorded on notes and decisions. */
  source?: "chat" | "voice" | "manual";
  now?: string;
}

export interface ApplyResult {
  action: BowerAction;
  ok: boolean;
  summary: string;
  error?: string;
  /** Entities created, for undo. */
  created: Array<{ entity: UndoEntity; id: string }>;
  /** Previous versions of entities updated, for undo. */
  previous: Array<{ entity: UndoEntity; value: unknown }>;
}

type UndoEntity =
  | "guests"
  | "households"
  | "tasks"
  | "events"
  | "subEvents"
  | "destinations"
  | "venues"
  | "budgetCategories"
  | "budgetItems"
  | "partyMembers"
  | "decisions"
  | "notes"
  | "wedding";

function includesLoose(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase().trim());
}

/** Applies actions in order. Never throws for a single bad action; each result says what happened. */
export async function applyActions(
  repo: WeddingRepo,
  weddingId: string,
  actions: BowerAction[],
  options: ApplyOptions = {},
): Promise<ApplyResult[]> {
  const results: ApplyResult[] = [];
  for (const action of actions) {
    results.push(await applyOne(repo, weddingId, action, options));
  }
  return results;
}

async function applyOne(
  repo: WeddingRepo,
  weddingId: string,
  action: BowerAction,
  options: ApplyOptions,
): Promise<ApplyResult> {
  const now = options.now ?? nowIso();
  const result: ApplyResult = { action, ok: true, summary: describeAction(action), created: [], previous: [] };
  try {
    switch (action.type) {
      case "add_guests": {
        const households = await repo.households.list(weddingId);
        for (const draft of action.guests) {
          let householdId: string | undefined;
          if (draft.householdName) {
            let household = households.find((h) => h.name.toLowerCase() === draft.householdName!.toLowerCase());
            if (!household) {
              household = {
                id: newId(),
                weddingId,
                name: draft.householdName,
                side: draft.side ?? "both",
                homeCity: draft.homeCity,
              } satisfies Household;
              await repo.households.upsert(household);
              households.push(household);
              result.created.push({ entity: "households", id: household.id });
            }
            householdId = household.id;
          }
          const guest: Guest = {
            id: newId(),
            weddingId,
            householdId,
            firstName: draft.firstName,
            lastName: draft.lastName,
            email: draft.email,
            phone: draft.phone,
            side: draft.side ?? "both",
            tier: draft.tier ?? "must",
            relationship: draft.relationship,
            plusOne: draft.plusOne ?? false,
            isChild: draft.isChild ?? false,
            dietary: draft.dietary,
            homeCity: draft.homeCity,
            tags: [],
            rsvp: {},
            createdAt: now,
            updatedAt: now,
          };
          await repo.guests.upsert(guest);
          result.created.push({ entity: "guests", id: guest.id });
        }
        break;
      }
      case "add_task": {
        const task: Task = {
          id: newId(),
          weddingId,
          title: action.title,
          description: action.description,
          phase: action.phase ?? "foundation",
          dueDate: action.dueDate,
          status: "todo",
          tags: action.tags ?? [],
          dependsOn: [],
          sourceAgent: options.source === "voice" ? "tell_bower" : "concierge",
          createdAt: now,
          updatedAt: now,
        };
        await repo.tasks.upsert(task);
        result.created.push({ entity: "tasks", id: task.id });
        break;
      }
      case "complete_task": {
        const tasks = await repo.tasks.list(weddingId);
        const task = action.taskId
          ? tasks.find((t) => t.id === action.taskId)
          : tasks.find((t) => action.titleMatch && includesLoose(t.title, action.titleMatch) && t.status !== "done");
        if (!task) throw new Error("No matching task");
        result.previous.push({ entity: "tasks", value: task });
        await repo.tasks.upsert({ ...task, status: "done", updatedAt: now });
        result.summary = `Marked “${task.title}” done`;
        break;
      }
      case "add_event": {
        const id = newId();
        await repo.events.upsert({
          id,
          weddingId,
          title: action.title,
          startsAt: action.date,
          endsAt: action.endDate,
          allDay: true,
          kind: action.kind ?? "other",
        });
        result.created.push({ entity: "events", id });
        break;
      }
      case "add_sub_event": {
        const id = newId();
        const title = action.title ?? action.kind.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
        await repo.subEvents.upsert({
          id,
          weddingId,
          kind: action.kind,
          title,
          date: action.date,
          location: action.location,
          hostName: action.hostName,
          budgetEstimate: action.budgetEstimate,
          guestRule: action.guestRule,
          notes: action.notes,
        });
        result.created.push({ entity: "subEvents", id });
        if (action.date) {
          const eventId = newId();
          await repo.events.upsert({
            id: eventId,
            weddingId,
            title,
            startsAt: action.date,
            allDay: true,
            kind: "sub_event",
            linkedType: "sub_event",
            linkedId: id,
          });
          result.created.push({ entity: "events", id: eventId });
        }
        break;
      }
      case "set_wedding_field": {
        const wedding = await findWedding(repo, weddingId);
        result.previous.push({ entity: "wedding", value: wedding });
        await repo.upsertWedding({ ...applyWeddingField(wedding, action.field, action.value), updatedAt: now });
        break;
      }
      case "add_destination": {
        const id = newId();
        await repo.destinations.upsert({
          id,
          weddingId,
          name: action.name,
          country: action.country,
          region: action.region,
          notes: action.whyHere,
          travelCostPerGuestEstimate: action.travelCostPerGuestEstimate,
          lodgingPerNightEstimate: action.lodgingPerNightEstimate,
          attendanceRateEstimate: action.attendanceRateEstimate,
          weatherNotes: action.weatherNotes,
          legalNotes: action.legalNotes,
          seasonNotes: action.seasonNotes,
          sourceUrls: action.sourceUrls ?? [],
          createdAt: now,
          updatedAt: now,
        });
        result.created.push({ entity: "destinations", id });
        break;
      }
      case "add_venue": {
        const destinations = await repo.destinations.list(weddingId);
        const destination = action.destinationId
          ? destinations.find((d) => d.id === action.destinationId)
          : destinations.find((d) => action.destinationName && includesLoose(d.name, action.destinationName));
        if (!destination) throw new Error("No matching destination");
        const id = newId();
        await repo.venues.upsert({
          id,
          weddingId,
          destinationId: destination.id,
          name: action.name,
          website: action.website,
          email: action.email,
          phone: action.phone,
          capacity: action.capacity,
          rentalFee: action.rentalFee,
          fbMinimum: action.fbMinimum,
          perGuestCost: action.perGuestCost,
          inHouseCatering: action.inHouseCatering,
          lodgingOnSite: action.lodgingOnSite,
          styleNotes: action.styleNotes,
          availabilityNotes: action.availabilityNotes,
          status: "idea",
          sourceUrls: action.sourceUrls ?? [],
          createdAt: now,
          updatedAt: now,
        });
        result.created.push({ entity: "venues", id });
        result.summary = `Added venue ${action.name} in ${destination.name}`;
        break;
      }
      case "add_budget_item": {
        const categories = await repo.budgetCategories.list(weddingId);
        let category = categories.find((c) => includesLoose(c.name, action.categoryName));
        if (!category) {
          category = {
            id: newId(),
            weddingId,
            name: action.categoryName,
            sortOrder: categories.length + 1,
          };
          await repo.budgetCategories.upsert(category);
          result.created.push({ entity: "budgetCategories", id: category.id });
        }
        const item: BudgetItem = {
          id: newId(),
          weddingId,
          categoryId: category.id,
          name: action.name,
          estimate: action.estimate,
          quoted: action.quoted,
          contracted: action.contracted,
          paid: action.paid,
          dueDate: action.dueDate,
          notes: action.notes,
          createdAt: now,
          updatedAt: now,
        };
        await repo.budgetItems.upsert(item);
        result.created.push({ entity: "budgetItems", id: item.id });
        break;
      }
      case "update_budget_item": {
        const items = await repo.budgetItems.list(weddingId);
        const item = action.itemId
          ? items.find((i) => i.id === action.itemId)
          : items.find((i) => action.nameMatch && includesLoose(i.name, action.nameMatch));
        if (!item) throw new Error("No matching budget line");
        result.previous.push({ entity: "budgetItems", value: item });
        await repo.budgetItems.upsert({
          ...item,
          estimate: action.estimate ?? item.estimate,
          quoted: action.quoted ?? item.quoted,
          contracted: action.contracted ?? item.contracted,
          paid: action.paid ?? item.paid,
          dueDate: action.dueDate ?? item.dueDate,
          notes: action.notes ?? item.notes,
          updatedAt: now,
        });
        result.summary = `Updated “${item.name}”`;
        break;
      }
      case "add_party_member": {
        const id = newId();
        await repo.partyMembers.upsert({
          id,
          weddingId,
          name: action.name,
          role: action.role,
          side: action.side ?? "both",
          asked: action.asked ?? false,
          contact: action.contact,
          notes: action.notes,
        });
        result.created.push({ entity: "partyMembers", id });
        break;
      }
      case "add_decision": {
        const id = newId();
        await repo.decisions.upsert({
          id,
          weddingId,
          title: action.title,
          detail: action.detail,
          decidedAt: now,
          decidedBy: "us",
          source: options.source === "manual" ? "manual" : "chat",
        });
        result.created.push({ entity: "decisions", id });
        break;
      }
      case "add_note": {
        const id = newId();
        await repo.notes.upsert({
          id,
          weddingId,
          text: action.text,
          source: options.source ?? "chat",
          linkedType: action.linkedType,
          linkedId: action.linkedId,
          createdAt: now,
        });
        result.created.push({ entity: "notes", id });
        break;
      }
    }
  } catch (error) {
    result.ok = false;
    result.error = error instanceof Error ? error.message : String(error);
  }
  return result;
}

/** Reverses what applyActions did, newest first. Best effort; missing rows are ignored. */
export async function undoResults(repo: WeddingRepo, results: ApplyResult[]): Promise<void> {
  for (const result of [...results].reverse()) {
    for (const created of [...result.created].reverse()) {
      if (created.entity === "wedding") continue;
      await repo[created.entity].remove(created.id);
    }
    for (const prev of result.previous) {
      if (prev.entity === "wedding") {
        await repo.upsertWedding(prev.value as Wedding);
      } else {
        // The previous value is a full entity of that table's type.
        await (repo[prev.entity] as { upsert(v: unknown): Promise<unknown> }).upsert(prev.value);
      }
    }
  }
}

async function findWedding(repo: WeddingRepo, weddingId: string): Promise<Wedding> {
  // Local mode has one wedding; this avoids threading the slug through actions.
  const candidates = ["our-wedding"];
  for (const slug of candidates) {
    const w = await repo.getWedding(slug);
    if (w && w.id === weddingId) return w;
  }
  throw new Error("Wedding not found");
}

function applyWeddingField(wedding: Wedding, field: WeddingField, value: string): Wedding {
  switch (field) {
    case "targetDate":
      return { ...wedding, targetDate: value || undefined, dateFlexibility: value ? "fixed" : wedding.dateFlexibility };
    case "targetSeason":
      return { ...wedding, targetSeason: value || undefined };
    case "dateFlexibility":
      return { ...wedding, dateFlexibility: value as Wedding["dateFlexibility"] };
    case "guestTarget":
      return { ...wedding, guestTarget: Number.parseInt(value, 10) || wedding.guestTarget };
    case "locationText":
      return { ...wedding, locationText: value };
    case "styleNotes":
      return { ...wedding, styleNotes: value };
    case "isDestination":
      return { ...wedding, isDestination: /^(true|yes|1)$/i.test(value) };
    case "partnerAName":
      return { ...wedding, partnerA: { ...wedding.partnerA, name: value } };
    case "partnerBName":
      return { ...wedding, partnerB: { ...wedding.partnerB, name: value } };
  }
}

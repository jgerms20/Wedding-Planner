"use client";

import {
  generateAnchorEvents,
  generatePlan,
  newId,
  nowIso,
  PHASE_LABELS,
  PHASE_ORDER,
  type PhaseKey,
  type PlanConfig,
  type Task,
  type TravelWindow,
} from "@bower/shared";
import { format, parseISO } from "date-fns";
import { Plus, Settings2, Sparkles } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { AnchorsCard, TravelWindowsCard } from "@/components/plan/plan-sidebar";
import { PlanMenu, PlanMenuItem } from "@/components/plan/plan-menu";
import { PlanPhaseTimeline } from "@/components/plan/plan-phase-timeline";
import { TaskRow } from "@/components/plan/task-row";
import { PlanSettingsDialog } from "@/components/plan-settings-dialog";
import { PrioritiesCard } from "@/components/priorities/priorities-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { LoadingState } from "@/components/loading-state";
import { usePriorities } from "@/lib/use-priorities";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

const NO_DATE_GROUP = "No date yet";

export default function PlanPage() {
  const { repo, wedding, settings, reloadSettings, viewerName } = useRepoContext();
  const weddingId = wedding?.id;

  const loadTasks = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.tasks.list(weddingId);
  }, [repo, weddingId]);
  const { items: tasks, reload } = useEntityList(loadTasks);

  const { priorities, add: addPriority, toggle: togglePriority, remove: removePriority } = usePriorities();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const windowLabels = useMemo(() => Object.fromEntries((settings?.planConfig.travelWindows ?? []).map((w) => [w.id, w.label])), [settings]);
  const tasksById = useMemo(() => new Map(tasks.map((t) => [t.id, t])), [tasks]);

  const byPhase = useMemo(() => {
    const map = new Map<PhaseKey, Task[]>();
    for (const phase of PHASE_ORDER) map.set(phase, []);
    for (const task of tasks) map.get(task.phase)?.push(task);
    for (const list of map.values()) {
      list.sort((a, b) => {
        if (a.dueDate && b.dueDate) return a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0;
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        return a.title.localeCompare(b.title);
      });
    }
    return map;
  }, [tasks]);

  async function updateTask(task: Task, patch: Partial<Task>) {
    if (!repo) return;
    await repo.tasks.upsert({ ...task, ...patch, updatedAt: nowIso() });
    await reload();
  }

  async function addTask(title: string, phase: PhaseKey, dueDate: string) {
    if (!repo || !weddingId) return;
    const now = nowIso();
    await repo.tasks.upsert({
      id: newId(),
      weddingId,
      title,
      phase,
      dueDate: dueDate || undefined,
      status: "todo",
      tags: [],
      dependsOn: [],
      sourceAgent: undefined,
      createdAt: now,
      updatedAt: now,
    });
    await reload();
    setAddOpen(false);
  }

  /** The single regenerate path: template + planConfig, preserving edits on existingTasks. Takes an explicit
   * planConfig so callers that just changed settings don't have to wait a render for the context to catch up. */
  async function regenerate(planConfig?: PlanConfig) {
    if (!repo || !wedding) return;
    const config = planConfig ?? settings?.planConfig;
    if (!config) return;
    setRegenerating(true);
    const next = generatePlan({ wedding, planConfig: config, existingTasks: tasks });
    for (const task of next) {
      await repo.tasks.upsert(task);
    }
    await reload();
    setRegenerating(false);
  }

  async function addTravelWindow(window: TravelWindow) {
    if (!repo || !wedding || !settings) return;
    const nextConfig: PlanConfig = { ...settings.planConfig, travelWindows: [...settings.planConfig.travelWindows, window] };
    await repo.saveSettings({ ...settings, planConfig: nextConfig });
    await reloadSettings();
    await regenerate(nextConfig);
  }

  if (!repo || !wedding || !settings) {
    return <LoadingState />;
  }

  const totalTasks = tasks.length;

  return (
    <div>
      <PageHeader
        title="Plan"
        description="Every task moves with your date, anchors, and travel windows. Edit anything; it sticks."
        action={
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="size-4" /> Add task
            </Button>
            <PlanMenu>
              <PlanMenuItem onClick={() => setSettingsOpen(true)}>
                <Settings2 className="size-4" /> Plan settings
              </PlanMenuItem>
              <PlanMenuItem onClick={() => void regenerate()} disabled={regenerating}>
                <Sparkles className="size-4" /> {regenerating ? "Regenerating…" : "Regenerate from template"}
              </PlanMenuItem>
            </PlanMenu>
          </div>
        }
      />

      {totalTasks === 0 ? (
        <div className="postcard rise flex flex-col items-start gap-4 p-8">
          <p className="text-[15px] text-ink-soft">Nothing planned yet. Build the default timeline from your date, anchors, and travel windows — you can edit anything afterward.</p>
          <Button onClick={() => void regenerate()} disabled={regenerating}>
            {regenerating ? "Building…" : "Build the plan"}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="order-2 flex flex-col lg:order-1">
            {PHASE_ORDER.map((phase, phaseIndex) => {
              const items = byPhase.get(phase) ?? [];
              if (items.length === 0) return null;
              const closed = items.filter((t) => t.status === "done" || t.status === "skipped").length;
              const months = groupByMonth(items);
              return (
                <section key={phase} className={`rise rise-${Math.min(phaseIndex + 1, 8)}`}>
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <p className="eyebrow">{dateSpan(items)}</p>
                      <h2 className="mt-1 text-3xl sm:text-4xl">{PHASE_LABELS[phase]}</h2>
                    </div>
                    <span className="tabular text-sm text-ink-soft">
                      {closed} of {items.length}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col">
                    {months.map(([month, monthTasks]) => (
                      <div key={month}>
                        <p className="mt-4 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-mute uppercase first:mt-2">{month}</p>
                        <div className="flex flex-col divide-y divide-line">
                          {monthTasks.map((task) => (
                            <TaskRow key={task.id} task={task} tasksById={tasksById} windowLabels={windowLabels} onChange={(patch) => updateTask(task, patch)} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hairline my-10" />
                </section>
              );
            })}
          </div>

          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <PlanPhaseTimeline byPhase={byPhase} />
            <PrioritiesCard
              title="Wedding must-haves"
              area="Overall"
              priorities={priorities}
              onAdd={(area, label) => void addPriority(area, label)}
              onToggle={(p) => void togglePriority(p)}
              onRemove={(p) => void removePriority(p)}
            />
            <AnchorsCard anchors={settings.planConfig.anchors} />
            <TravelWindowsCard windows={settings.planConfig.travelWindows} onAdd={addTravelWindow} />
          </div>
        </div>
      )}

      <PlanSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        planConfig={settings.planConfig}
        onSave={async (planConfig) => {
          await repo.saveSettings({ ...settings, planConfig });
          for (const event of generateAnchorEvents(wedding, planConfig)) {
            await repo.events.upsert(event);
          }
          await repo.decisions.upsert({
            id: newId(),
            weddingId: wedding.id,
            title: "Updated plan settings",
            detail: "Anchors, travel windows, or communications offsets changed.",
            decidedAt: nowIso(),
            decidedBy: viewerName,
            source: "manual",
          });
          await reloadSettings();
        }}
      />

      <AddTaskDialog open={addOpen} onOpenChange={setAddOpen} onAdd={addTask} />
    </div>
  );
}

/** Groups a phase's already date-sorted tasks by "Month YYYY", undated tasks last. */
function groupByMonth(items: Task[]): [string, Task[]][] {
  const groups = new Map<string, Task[]>();
  for (const task of items) {
    const key = task.dueDate ? format(parseISO(task.dueDate), "MMMM yyyy") : NO_DATE_GROUP;
    const list = groups.get(key);
    if (list) list.push(task);
    else groups.set(key, [task]);
  }
  return [...groups.entries()];
}

function dateSpan(items: Task[]): string {
  const dated = items.map((t) => t.dueDate).filter((d): d is string => Boolean(d));
  if (dated.length === 0) return "No dates yet";
  const sorted = [...dated].sort();
  const first = format(parseISO(sorted[0]!), "MMM yyyy");
  const last = format(parseISO(sorted[sorted.length - 1]!), "MMM yyyy");
  return first === last ? first : `${first} – ${last}`;
}

function AddTaskDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (title: string, phase: PhaseKey, dueDate: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [phase, setPhase] = useState<PhaseKey>("details");
  const [dueDate, setDueDate] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Add a task</DialogTitle>
        <DialogCloseButton onClose={() => onOpenChange(false)} />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Call the florist about peonies" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Phase</Label>
          <Select value={phase} onChange={(e) => setPhase(e.target.value as PhaseKey)}>
            {PHASE_ORDER.map((p) => (
              <option key={p} value={p}>
                {PHASE_LABELS[p]}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Due date (optional)</Label>
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (!title.trim()) return;
            onAdd(title.trim(), phase, dueDate);
            setTitle("");
            setDueDate("");
          }}
        >
          Add task
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

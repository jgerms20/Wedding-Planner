"use client";

import {
  generateAnchorEvents,
  generatePlan,
  newId,
  nowIso,
  PHASE_LABELS,
  PHASE_ORDER,
  type PhaseKey,
  type Task,
  type TaskStatus,
} from "@bower/shared";
import { Plus, RefreshCw, Settings2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { PlanSettingsDialog } from "@/components/plan-settings-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogBody, DialogCloseButton, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { formatDate } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

const STATUS_OPTIONS: TaskStatus[] = ["todo", "doing", "done", "skipped"];

export default function PlanPage() {
  const { repo, wedding, settings, reloadSettings, viewerName } = useRepoContext();
  const weddingId = wedding?.id;

  const loadTasks = useCallback(async () => {
    if (!repo || !weddingId) return undefined;
    return repo.tasks.list(weddingId);
  }, [repo, weddingId]);
  const { items: tasks, reload } = useEntityList(loadTasks);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const windowLabels = useMemo(
    () => Object.fromEntries((settings?.planConfig.travelWindows ?? []).map((w) => [w.id, w.label])),
    [settings],
  );

  const byPhase = useMemo(() => {
    const map = new Map<PhaseKey, Task[]>();
    for (const phase of PHASE_ORDER) map.set(phase, []);
    for (const task of tasks) {
      map.get(task.phase)?.push(task);
    }
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

  async function regenerate() {
    if (!repo || !wedding || !settings) return;
    setRegenerating(true);
    const next = generatePlan({ wedding, planConfig: settings.planConfig, existingTasks: tasks });
    for (const task of next) {
      await repo.tasks.upsert(task);
    }
    await reload();
    setRegenerating(false);
  }

  if (!repo || !wedding || !settings) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div>
      <PageHeader
        title="Plan"
        description="Every task moves with your date, anchors, and travel windows. Edit anything; it sticks."
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
              <Settings2 className="size-4" /> Plan settings
            </Button>
            <Button variant="outline" size="sm" onClick={regenerate} disabled={regenerating}>
              <RefreshCw className="size-4" /> {regenerating ? "Regenerating…" : "Regenerate from template"}
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="size-4" /> Add task
            </Button>
          </div>
        }
      />

      <div className="flex flex-col gap-4">
        {PHASE_ORDER.map((phase) => {
          const items = byPhase.get(phase) ?? [];
          if (items.length === 0) return null;
          const done = items.filter((t) => t.status === "done" || t.status === "skipped").length;
          return (
            <details key={phase} className="group rounded-lg border border-border bg-card" open>
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                <span className="font-display text-lg">{PHASE_LABELS[phase]}</span>
                <span className="text-xs text-muted-foreground">
                  {done}/{items.length} done
                </span>
              </summary>
              <div className="flex flex-col divide-y divide-border border-t border-border">
                {items.map((task) => (
                  <TaskRow key={task.id} task={task} windowLabels={windowLabels} onChange={(patch) => updateTask(task, patch)} />
                ))}
              </div>
            </details>
          );
        })}
      </div>

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

function TaskRow({
  task,
  windowLabels,
  onChange,
}: {
  task: Task;
  windowLabels: Record<string, string>;
  onChange: (patch: Partial<Task>) => void;
}) {
  const [title, setTitle] = useState(task.title);
  const doneish = task.status === "done" || task.status === "skipped";

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
      <Select value={task.status} onChange={(e) => onChange({ status: e.target.value as TaskStatus })} className="h-8 w-28 text-xs">
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => title !== task.title && onChange({ title })}
        className={`min-w-40 flex-1 rounded-md border border-transparent bg-transparent px-2 py-1 focus:border-border focus:outline-none ${doneish ? "text-muted-foreground line-through" : ""}`}
      />
      {task.windowId && windowLabels[task.windowId] && (
        <Badge variant="secondary">{windowLabels[task.windowId]}</Badge>
      )}
      {task.tags.map((tag) => (
        <Badge key={tag} variant={tag === "needs-window" ? "destructive" : "outline"}>
          {tag}
        </Badge>
      ))}
      <input
        type="date"
        value={task.dueDate ?? ""}
        onChange={(e) => onChange({ dueDate: e.target.value || undefined })}
        className="ml-auto h-8 rounded-md border border-border bg-transparent px-2 text-xs"
      />
      <span className="w-16 text-right text-xs text-muted-foreground">{formatDate(task.dueDate)}</span>
    </div>
  );
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
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Call the florist about peonies" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Phase</Label>
          <Select value={phase} onChange={(e) => setPhase(e.target.value as PhaseKey)}>
            {PHASE_ORDER.map((p) => (
              <option key={p} value={p}>
                {PHASE_LABELS[p]}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Due date (optional)</Label>
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

"use client";

import { newId, nowIso, type Priority } from "@bower/shared";
import { useCallback } from "react";
import { useRepoContext } from "./repo-context";
import { useEntityList } from "./use-entity-list";

/** Shared CRUD for the must-haves list, so Atlas/Budget/Plan don't each reimplement it. */
export function usePriorities() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const load = useCallback(async () => (repo && weddingId ? repo.priorities.list(weddingId) : undefined), [repo, weddingId]);
  const { items, reload } = useEntityList(load);

  const add = useCallback(
    async (area: string, label: string) => {
      if (!repo || !weddingId) return;
      const now = nowIso();
      await repo.priorities.upsert({ id: newId(), weddingId, area, label, done: false, createdAt: now, updatedAt: now });
      await reload();
    },
    [repo, weddingId, reload],
  );

  const toggle = useCallback(
    async (priority: Priority) => {
      if (!repo) return;
      await repo.priorities.upsert({ ...priority, done: !priority.done, updatedAt: nowIso() });
      await reload();
    },
    [repo, reload],
  );

  const remove = useCallback(
    async (priority: Priority) => {
      if (!repo) return;
      await repo.priorities.remove(priority.id);
      await reload();
    },
    [repo, reload],
  );

  return { priorities: items, add, toggle, remove };
}

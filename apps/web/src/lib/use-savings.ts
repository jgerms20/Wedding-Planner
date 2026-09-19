"use client";

import { newId, nowIso, type SavingsEntry } from "@bower/shared";
import { useCallback } from "react";
import { useRepoContext } from "./repo-context";
import { useEntityList } from "./use-entity-list";

/** Shared CRUD for the wedding-fund savings log, mirroring `usePriorities`. */
export function useSavings() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;

  const load = useCallback(async () => (repo && weddingId ? repo.savingsEntries.list(weddingId) : undefined), [repo, weddingId]);
  const { items, reload } = useEntityList(load);

  const add = useCallback(
    async (date: string, amount: number, note?: string) => {
      if (!repo || !weddingId) return;
      await repo.savingsEntries.upsert({ id: newId(), weddingId, date, amount, note, createdAt: nowIso() });
      await reload();
    },
    [repo, weddingId, reload],
  );

  const remove = useCallback(
    async (entry: SavingsEntry) => {
      if (!repo) return;
      await repo.savingsEntries.remove(entry.id);
      await reload();
    },
    [repo, reload],
  );

  const entries = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const total = items.reduce((sum, e) => sum + e.amount, 0);

  return { entries, total, add, remove };
}

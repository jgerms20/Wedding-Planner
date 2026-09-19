"use client";

import { createRepo, type Settings, type Wedding, type WeddingRepo } from "@bower/shared";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { ensureWedding, reconcileDestinations, reconcileGuests, reconcileVenues } from "./bootstrap";
import { DATA_MODE } from "./constants";

/** How long `ready` can stay false before pages start offering a reload hint. */
const SLOW_THRESHOLD_MS = 6000;

interface RepoContextValue {
  repo: WeddingRepo | null;
  /** True once the repo exists and the wedding has been loaded or seeded. */
  ready: boolean;
  /** True once `ready` has stayed false for a while — something is stuck. */
  slow: boolean;
  wedding: Wedding | null;
  settings: Settings | null;
  reloadWedding: () => Promise<void>;
  reloadSettings: () => Promise<void>;
  /** Stamped on decisions; the couple shares one workspace. */
  viewerName: string;
  /** Increments whenever data changed outside a page (Tell Atlas, Concierge). Lists reload on change. */
  dataVersion: number;
  /** Call after applying actions so every open list refreshes. */
  touch: () => void;
}

const RepoContext = createContext<RepoContextValue | undefined>(undefined);

export function RepoProvider({ children }: { children: ReactNode }) {
  const [repo, setRepo] = useState<WeddingRepo | null>(null);
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  // If loading never settles (whatever the cause), say so after a while
  // instead of leaving the couple staring at "Loading…" forever.
  useEffect(() => {
    if (ready) {
      setSlow(false);
      return;
    }
    const timer = setTimeout(() => setSlow(true), SLOW_THRESHOLD_MS);
    return () => clearTimeout(timer);
  }, [ready]);

  // Dexie touches indexedDB, which only exists in the browser: create it after mount.
  useEffect(() => {
    setRepo(createRepo(DATA_MODE));
  }, []);

  const reloadWedding = useCallback(async () => {
    if (!repo) return;
    const found = await ensureWedding(repo);
    setWedding(found);
    setSettings((await repo.getSettings(found.id)) ?? null);
  }, [repo]);

  const reloadSettings = useCallback(async () => {
    if (!repo || !wedding) return;
    setSettings((await repo.getSettings(wedding.id)) ?? null);
  }, [repo, wedding]);

  const touch = useCallback(() => {
    setDataVersion((v) => v + 1);
    void reloadWedding();
  }, [reloadWedding]);

  useEffect(() => {
    if (!repo) return;
    let cancelled = false;
    (async () => {
      const found = await ensureWedding(repo);
      if (cancelled) return;
      await reconcileDestinations(repo, found.id);
      if (cancelled) return;
      await reconcileVenues(repo, found.id);
      if (cancelled) return;
      await reconcileGuests(repo, found.id);
      if (cancelled) return;
      setWedding(found);
      setSettings((await repo.getSettings(found.id)) ?? null);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return (
    <RepoContext.Provider
      value={{ repo, ready, slow, wedding, settings, reloadWedding, reloadSettings, viewerName: "us", dataVersion, touch }}
    >
      {children}
    </RepoContext.Provider>
  );
}

export function useRepoContext(): RepoContextValue {
  const ctx = useContext(RepoContext);
  if (!ctx) throw new Error("useRepoContext must be used within a RepoProvider");
  return ctx;
}

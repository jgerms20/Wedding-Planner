"use client";

import { createRepo, type Settings, type Wedding, type WeddingRepo } from "@bower/shared";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { DATA_MODE, WEDDING_SLUG } from "./constants";

export type ViewingAs = "a" | "b";

const VIEWING_AS_KEY = "bower:viewingAs";

interface RepoContextValue {
  repo: WeddingRepo | null;
  /** True once the repo exists and the initial wedding/settings load has resolved (whether or not a wedding was found). */
  ready: boolean;
  wedding: Wedding | null;
  settings: Settings | null;
  reloadWedding: () => Promise<void>;
  reloadSettings: () => Promise<void>;
  viewingAs: ViewingAs;
  setViewingAs: (viewingAs: ViewingAs) => void;
  /** The current viewer's display name, for stamping `decidedBy` on edits. */
  viewerName: string;
}

const RepoContext = createContext<RepoContextValue | undefined>(undefined);

export function RepoProvider({ children }: { children: ReactNode }) {
  const [repo, setRepo] = useState<WeddingRepo | null>(null);
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [ready, setReady] = useState(false);
  const [viewingAs, setViewingAsState] = useState<ViewingAs>("a");

  // Dexie touches indexedDB, which only exists in the browser — create it
  // (and read the viewing-as preference) after mount, not during render.
  useEffect(() => {
    setRepo(createRepo(DATA_MODE));
    try {
      const stored = window.localStorage.getItem(VIEWING_AS_KEY);
      if (stored === "a" || stored === "b") setViewingAsState(stored);
    } catch {
      // localStorage can throw in private browsing; the toggle just won't persist.
    }
  }, []);

  const reloadWedding = useCallback(async () => {
    if (!repo) return;
    const found = (await repo.getWedding(WEDDING_SLUG)) ?? null;
    setWedding(found);
    if (found) {
      setSettings((await repo.getSettings(found.id)) ?? null);
    }
  }, [repo]);

  const reloadSettings = useCallback(async () => {
    if (!repo || !wedding) return;
    setSettings((await repo.getSettings(wedding.id)) ?? null);
  }, [repo, wedding]);

  useEffect(() => {
    if (!repo) return;
    let cancelled = false;
    (async () => {
      const found = (await repo.getWedding(WEDDING_SLUG)) ?? null;
      if (cancelled) return;
      setWedding(found);
      if (found) {
        const s = (await repo.getSettings(found.id)) ?? null;
        if (!cancelled) setSettings(s);
      }
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const setViewingAs = useCallback((next: ViewingAs) => {
    setViewingAsState(next);
    try {
      window.localStorage.setItem(VIEWING_AS_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const viewerName = wedding
    ? viewingAs === "a"
      ? wedding.partnerA.name
      : wedding.partnerB.name
    : viewingAs === "a"
      ? "Partner A"
      : "Partner B";

  return (
    <RepoContext.Provider
      value={{ repo, ready, wedding, settings, reloadWedding, reloadSettings, viewingAs, setViewingAs, viewerName }}
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

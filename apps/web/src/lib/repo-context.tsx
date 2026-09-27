"use client";

import { createRepo, type Settings, type Wedding, type WeddingRepo } from "@bower/shared";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { CloudGate, type CloudStatus } from "@/components/cloud/cloud-gate";
import { ensureWedding, reconcileDestinations, reconcileGuests, reconcileVenues } from "./bootstrap";
import { CLOUD_ENABLED, cloudClient } from "./cloud/client";
import { findSharedWedding, localCopyPending, mergeLocalCopy, sharedRepo } from "./cloud/session";

/** How long `ready` can stay false before pages start offering a reload hint. */
const SLOW_THRESHOLD_MS = 6000;
/** Coalesces a burst of the partner's edits (or a merge) into one refresh. */
const REALTIME_DEBOUNCE_MS = 400;

export interface CloudInfo {
  email?: string;
  weddingId: string;
  /** This browser still holds its own pre-sharing copy that hasn't been merged in. */
  mergePending: boolean;
  mergeLocal: () => Promise<string>;
  signOut: () => Promise<void>;
}

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
  /** Increments whenever data changed outside a page (Tell Atlas, Concierge, the partner). Lists reload on change. */
  dataVersion: number;
  /** Call after applying actions so every open list refreshes. */
  touch: () => void;
  /** Set when this build shares one wedding between both partners (Supabase). */
  cloud: CloudInfo | null;
}

const RepoContext = createContext<RepoContextValue | undefined>(undefined);

export function RepoProvider({ children }: { children: ReactNode }) {
  const [repo, setRepo] = useState<WeddingRepo | null>(null);
  const [wedding, setWedding] = useState<Wedding | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  const [cloudStatus, setCloudStatus] = useState<CloudStatus>("checking");
  const [cloudError, setCloudError] = useState<string>();
  const [cloudEmail, setCloudEmail] = useState<string>();
  const [cloudWeddingId, setCloudWeddingId] = useState<string>();
  const [mergePending, setMergePending] = useState(false);
  const [resolveNonce, setResolveNonce] = useState(0);

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

  // Local mode: Dexie touches indexedDB, which only exists in the browser — create it after mount.
  useEffect(() => {
    if (!CLOUD_ENABLED) setRepo(createRepo("local"));
  }, []);

  // Shared mode: who's signed in decides which wedding (if any) this session opens.
  useEffect(() => {
    if (!CLOUD_ENABLED) return;
    const supabase = cloudClient();
    let active = true;
    let resolvedFor: string | null | undefined;

    async function resolve(userId: string | null, email: string | undefined) {
      if (userId === resolvedFor) return;
      resolvedFor = userId;
      setCloudEmail(email);
      if (!userId) {
        setRepo(null);
        setReady(false);
        setCloudStatus("signed-out");
        return;
      }
      setCloudStatus("checking");
      try {
        const weddingId = await findSharedWedding(supabase);
        if (!active) return;
        if (!weddingId) {
          setCloudStatus("no-wedding");
          return;
        }
        setCloudWeddingId(weddingId);
        setMergePending(await localCopyPending(supabase, weddingId));
        setRepo(sharedRepo(supabase, weddingId));
        setCloudStatus("ready");
      } catch (err) {
        if (!active) return;
        resolvedFor = undefined;
        setCloudError((err as Error).message);
        setCloudStatus("error");
      }
    }

    // Supabase warns against awaiting its own calls inside this callback; defer instead.
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "SIGNED_OUT") {
        setTimeout(() => void resolve(session?.user.id ?? null, session?.user.email), 0);
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [resolveNonce]);

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

  const touchRef = useRef(touch);
  useEffect(() => {
    touchRef.current = touch;
  }, [touch]);

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

  // Live updates: the partner's hearts, guests, and edits land on this screen as they happen.
  useEffect(() => {
    if (!CLOUD_ENABLED || !cloudWeddingId || cloudStatus !== "ready") return;
    const supabase = cloudClient();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const channel = supabase
      .channel(`wedding-${cloudWeddingId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "wedding_docs", filter: `wedding_id=eq.${cloudWeddingId}` }, () => {
        clearTimeout(timer);
        timer = setTimeout(() => touchRef.current(), REALTIME_DEBOUNCE_MS);
      })
      .subscribe();
    return () => {
      clearTimeout(timer);
      void supabase.removeChannel(channel);
    };
  }, [cloudWeddingId, cloudStatus]);

  const cloud: CloudInfo | null =
    CLOUD_ENABLED && cloudWeddingId && cloudStatus === "ready"
      ? {
          email: cloudEmail,
          weddingId: cloudWeddingId,
          mergePending,
          async mergeLocal() {
            const message = await mergeLocalCopy(cloudClient(), cloudWeddingId);
            setMergePending(false);
            touch();
            return message;
          },
          async signOut() {
            await cloudClient().auth.signOut();
          },
        }
      : null;

  if (CLOUD_ENABLED && cloudStatus !== "ready") {
    return (
      <CloudGate
        status={cloudStatus}
        email={cloudEmail}
        error={cloudError}
        onRetry={() => {
          setCloudStatus("checking");
          setResolveNonce((n) => n + 1);
        }}
      />
    );
  }

  return (
    <RepoContext.Provider
      value={{ repo, ready, slow, wedding, settings, reloadWedding, reloadSettings, viewerName: "us", dataVersion, touch, cloud }}
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

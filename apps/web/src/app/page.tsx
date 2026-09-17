"use client";

import { createRepo, defaultSettings, newId, nowIso, type Wedding } from "@bower/shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DATA_MODE, WEDDING_SLUG } from "@/lib/constants";

function placeholderWedding(): Wedding {
  const now = nowIso();
  return {
    id: newId(),
    slug: WEDDING_SLUG,
    name: "Our wedding",
    partnerA: { name: "Partner A" },
    partnerB: { name: "Partner B" },
    dateFlexibility: "open",
    isDestination: false,
    createdAt: now,
    updatedAt: now,
  };
}

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const repo = createRepo(DATA_MODE);
      const existing = await repo.getWedding(WEDDING_SLUG);
      if (cancelled) return;
      if (existing) {
        router.replace(`/w/${WEDDING_SLUG}`);
        return;
      }
      const wedding = placeholderWedding();
      await repo.upsertWedding(wedding);
      await repo.saveSettings(defaultSettings(wedding.id));
      if (!cancelled) router.replace(`/w/${WEDDING_SLUG}/intake`);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <p className="font-display text-lg text-muted-foreground">Setting things up…</p>
    </main>
  );
}

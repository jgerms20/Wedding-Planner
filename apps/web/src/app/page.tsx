"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { WEDDING_SLUG } from "@/lib/constants";

/** The site root just opens the couple's wedding; seeding happens inside the shell. */
export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/w/${WEDDING_SLUG}`);
  }, [router]);

  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <p className="font-display text-xl text-ink-soft">Opening your atlas…</p>
    </main>
  );
}

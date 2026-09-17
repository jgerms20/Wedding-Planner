import type { Guest, Tier } from "@bower/shared";

export function TierTile({ tier, guests }: { tier: Tier; guests: Guest[] }) {
  const inTier = guests.filter((g) => g.tier === tier);
  const bySide = {
    a: inTier.filter((g) => g.side === "a").length,
    b: inTier.filter((g) => g.side === "b").length,
    both: inTier.filter((g) => g.side === "both").length,
  };
  return (
    <div className="postcard p-5">
      <p className="eyebrow capitalize">{tier}-invite</p>
      <p className="numeral mt-1 text-4xl">{inTier.length}</p>
      <p className="mt-2 text-xs text-ink-soft">
        Side A {bySide.a} · Side B {bySide.b} · Both {bySide.both}
      </p>
    </div>
  );
}

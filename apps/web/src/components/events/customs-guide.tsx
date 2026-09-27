"use client";

import { CUSTOMS } from "@bower/shared";
import { ExternalLink } from "lucide-react";

const domain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

/** Who traditionally plans and pays for what — next to what couples actually do now. */
export function CustomsGuide() {
  return (
    <section className="flex flex-col gap-5">
      <p className="max-w-2xl text-[15px] text-ink-soft">
        Tradition, not rules. Most couples now split things however works for their families — this is the old default, so you know
        what people might expect and can decide on purpose.
      </p>
      <ul className="flex flex-col gap-3">
        {CUSTOMS.map((custom, i) => (
          <li key={custom.topic} className={`rise rise-${Math.min(i + 1, 8)} rounded-lg border border-line bg-card p-4 sm:p-5`}>
            <p className="font-display text-xl leading-tight">{custom.topic}</p>
            <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
              <dt className="eyebrow pt-0.5">Traditionally plans</dt>
              <dd className="text-foreground">{custom.traditionallyOrganizes}</dd>
              <dt className="eyebrow pt-0.5">Traditionally pays</dt>
              <dd className="text-foreground">{custom.traditionallyPays}</dd>
              <dt className="eyebrow pt-0.5">Now</dt>
              <dd className="text-ink-soft">{custom.howCouplesDoItNow}</dd>
            </dl>
            <a
              href={custom.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-ink-mute hover:text-coral"
            >
              {domain(custom.sourceUrl)} <ExternalLink className="size-3 stroke-[1.5]" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

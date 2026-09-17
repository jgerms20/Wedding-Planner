import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rise mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-[15px] text-ink-soft">{description}</p>}
      </div>
      {action}
    </div>
  );
}

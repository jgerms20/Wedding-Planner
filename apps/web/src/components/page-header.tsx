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
    // Deliberately not `.rise`: a completed rise animation leaves a computed transform
    // (an identity matrix, not the literal keyword `none`), which permanently creates a new
    // stacking context. That traps any dropdown/menu placed in `action` (e.g. Plan's "More plan
    // actions") inside it, so a later, unrelated section of the page can paint on top of the menu
    // regardless of its own z-index. PageHeader is used on every page, so this is fixed at the
    // source rather than worked around per page.
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-[15px] text-ink-soft">{description}</p>}
      </div>
      {action}
    </div>
  );
}

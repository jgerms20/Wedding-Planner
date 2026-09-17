import type { ReactNode } from "react";
import { WEDDING_SLUG } from "@/lib/constants";
import { WeddingShell } from "@/components/wedding-shell";

// Local mode is single-tenant: the only slug that exists is "our-wedding".
// Required for `output: "export"` since /w/[slug] is a dynamic route.
export function generateStaticParams() {
  return [{ slug: WEDDING_SLUG }];
}

export default function WeddingLayout({ children }: { children: ReactNode }) {
  return <WeddingShell>{children}</WeddingShell>;
}

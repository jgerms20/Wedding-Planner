import { FolderOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function FilesPage() {
  return (
    <div>
      <PageHeader title="Files" description="A vault for contracts, quotes, and inspiration." />
      <div className="postcard rise flex flex-col items-center gap-3 p-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-gold-soft text-ink">
          <FolderOpen className="size-5" />
        </span>
        <p className="font-display text-xl">This is where the paperwork will live</p>
        <p className="max-w-md text-[15px] text-ink-soft">
          Contracts, quotes, inspiration boards, marriage-license paperwork, and the vows you don&apos;t want to lose — a
          contract will file itself against its vendor, a quote against its budget line. Uploads arrive once Bower has
          accounts to keep them behind; for now, keep files wherever you already do, and note the highlights in
          Destinations, Budget, or Plan.
        </p>
      </div>
    </div>
  );
}

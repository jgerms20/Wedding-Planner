import { FolderOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function FilesPage() {
  return (
    <div>
      <PageHeader title="Files" description="A vault for contracts, quotes, and inspiration." />
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <FolderOpen className="size-10 text-muted-foreground" />
          <p className="font-display text-lg">Files arrive with Phase 0b</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Once Bower is backed by Supabase, drop a PDF here and the right agent will pick it up — a contract gets
            filed against its vendor, a quote against its budget line. For now, keep files wherever you already keep
            them, and note the highlights in Destinations, Budget, or Plan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import type { FileAttachment } from "@bower/shared";
import { Download, File, FileSpreadsheet, FileText, Image as ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { LoadingState } from "@/components/loading-state";
import { formatDate } from "@/lib/format";
import { useRepoContext } from "@/lib/repo-context";
import { useEntityList } from "@/lib/use-entity-list";

export default function FilesPage() {
  const { repo, wedding } = useRepoContext();
  const weddingId = wedding?.id;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = useCallback(async () => (repo && weddingId ? repo.files.list(weddingId) : undefined), [repo, weddingId]);
  const { items: files, reload } = useEntityList(loadFiles);

  async function handleFiles(fileList: FileList | null) {
    if (!repo || !weddingId || !fileList || fileList.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(fileList)) {
        try {
          await repo.files.upload(weddingId, file);
        } catch (err) {
          setError(err instanceof Error ? err.message : `Couldn't upload ${file.name}.`);
        }
      }
      await reload();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function download(file: FileAttachment) {
    if (!repo) return;
    const url = await repo.files.getObjectUrl(file.id);
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
  }

  async function remove(file: FileAttachment) {
    if (!repo) return;
    await repo.files.remove(file.id);
    await reload();
  }

  if (!repo || !weddingId) return <LoadingState />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Files" description="Contracts, quotes, inspiration boards, and the paperwork you don't want to lose." />

      <label className="postcard rise flex flex-col items-center gap-3 border-dashed p-10 text-center transition-colors hover:border-coral">
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => void handleFiles(e.target.files)}
          disabled={uploading}
        />
        <span className="flex size-12 items-center justify-center rounded-full bg-gold-soft text-ink">
          <Upload className="size-5" />
        </span>
        <p className="font-display text-xl">{uploading ? "Uploading…" : "Click to upload, or drop files here"}</p>
        <p className="max-w-md text-[15px] text-ink-soft">
          PDFs, spreadsheets, Word documents, images — up to 20MB each. Files are stored in this browser only; they
          won&apos;t follow you to another device until accounts ship, and they&apos;re not included in an export bundle.
        </p>
      </label>
      {error && <p className="text-sm text-destructive">{error}</p>}

      {files.length > 0 && (
        <ul className="flex flex-col divide-y divide-line">
          {files.map((file) => (
            <li key={file.id} className="flex items-center gap-3 py-3">
              <FileIcon mimeType={file.mimeType} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px]">{file.name}</p>
                <p className="text-xs text-ink-mute">
                  {formatBytes(file.size)} · {formatDate(file.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void download(file)}
                aria-label={`Download ${file.name}`}
                className="rounded-full p-1.5 text-ink-mute transition-colors hover:bg-muted hover:text-coral"
              >
                <Download className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => void remove(file)}
                aria-label={`Remove ${file.name}`}
                className="rounded-full p-1.5 text-ink-mute transition-colors hover:bg-muted hover:text-destructive"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FileIcon({ mimeType }: { mimeType: string }) {
  const className = "size-5 shrink-0 text-ink-soft";
  if (mimeType.startsWith("image/")) return <ImageIcon className={className} />;
  if (mimeType.includes("sheet") || mimeType.includes("excel") || mimeType === "text/csv") return <FileSpreadsheet className={className} />;
  if (mimeType === "application/pdf" || mimeType.includes("word") || mimeType.includes("document")) return <FileText className={className} />;
  return <File className={className} />;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

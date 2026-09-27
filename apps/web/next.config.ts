import type { NextConfig } from "next";

// Both data modes are client-only today — local keeps data in the browser, and shared mode talks
// to Supabase straight from the browser (row-level security guards it) — so both deploy as a
// static export. Unset (plain `next dev`) keeps the normal server build.
const mode = process.env.NEXT_PUBLIC_DATA_MODE;
const isStaticExport = mode === "local" || mode === "supabase";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;

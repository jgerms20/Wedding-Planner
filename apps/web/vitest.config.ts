import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    // Dexie reads the global `indexedDB` when it is imported, so the fake has
    // to be installed before any test module (or @bower/shared) loads.
    setupFiles: ["fake-indexeddb/auto"],
    // Playwright owns e2e/*.spec.ts — keep it out of the vitest run.
    exclude: ["**/node_modules/**", "**/e2e/**"],
  },
});

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
    // Playwright owns e2e/*.spec.ts — keep it out of the vitest run.
    exclude: ["**/node_modules/**", "**/e2e/**"],
  },
});

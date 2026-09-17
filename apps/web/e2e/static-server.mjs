#!/usr/bin/env node
/* global process, console */
// A tiny static file server for `apps/web/out`, used by Playwright to smoke
// test the GitHub Pages export the way GitHub Pages actually serves it: at
// BASE_PATH (the repo name), everything else 404s. No extra dependency
// ("serve" et al.) — just Node's http/fs.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.STATIC_DIR ?? path.resolve(__dirname, "../out");
const BASE_PATH = process.env.BASE_PATH ?? "/Wedding-Planner";
const PORT = Number(process.env.PORT ?? 4173);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
};

async function resolveFile(requestUrl) {
  const urlPath = requestUrl.split("?")[0] ?? "/";
  if (!urlPath.startsWith(BASE_PATH)) return null;

  const relative = urlPath.slice(BASE_PATH.length) || "/";
  let filePath = path.join(OUT_DIR, decodeURIComponent(relative));

  try {
    const stats = await stat(filePath);
    if (stats.isDirectory()) filePath = path.join(filePath, "index.html");
  } catch {
    if (!path.extname(filePath)) filePath = `${filePath}.html`;
  }

  try {
    await stat(filePath);
    return filePath;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (!file) {
    try {
      const body = await readFile(path.join(OUT_DIR, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
    return;
  }

  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME_TYPES[path.extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500);
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Serving ${OUT_DIR} at http://localhost:${PORT}${BASE_PATH}/`);
});

// Placeholder worker entry. The real pg-boss queue (see
// docs/specs/phase-0-foundation.md) lands here; `dry-run` runs the agent
// runtime directly for local testing (docs/specs/agent-runtime.md).
import { runDryRun } from "./dry-run.js";

async function main() {
  // `pnpm run dev -- dry-run ...` forwards the "--" itself as an argument
  // rather than stripping it, so drop a leading one before inspecting args.
  const args = process.argv.slice(2).filter((arg, i) => !(i === 0 && arg === "--"));

  if (args[0] === "dry-run") {
    process.exitCode = await runDryRun(args.slice(1));
    return;
  }

  console.log("worker ready");

  if (process.env.WORKER_ONESHOT === "1") {
    process.exit(0);
  } else {
    // Keep the process alive; replace with the pg-boss queue subscription.
    setInterval(() => {}, 1 << 30);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

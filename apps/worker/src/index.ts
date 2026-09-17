// Placeholder worker entry. The real pg-boss queue and agent runtime
// invocation (see docs/specs/phase-0-foundation.md) land here.
console.log("worker ready");

if (process.env.WORKER_ONESHOT === "1") {
  process.exit(0);
} else {
  // Keep the process alive; replace with the pg-boss queue subscription.
  setInterval(() => {}, 1 << 30);
}

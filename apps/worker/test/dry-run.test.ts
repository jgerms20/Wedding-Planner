import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { runDryRun } from "../src/dry-run.js";

describe("dry-run", () => {
  const originalFake = process.env.ANTHROPIC_FAKE;

  beforeEach(() => {
    process.env.ANTHROPIC_FAKE = "1";
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    if (originalFake === undefined) delete process.env.ANTHROPIC_FAKE;
    else process.env.ANTHROPIC_FAKE = originalFake;
    vi.restoreAllMocks();
  });

  it("runs the hello agent against the fake client and exits 0", async () => {
    const exitCode = await runDryRun(["hello", "what's", "next?"]);

    expect(exitCode).toBe(0);
    expect(console.log).toHaveBeenCalled();

    const printed = (console.log as unknown as { mock: { calls: unknown[][] } }).mock.calls.map(
      (call) => String(call[0]),
    );
    const events = printed.slice(0, -1).map((line) => JSON.parse(line));
    expect(events.map((e: { type: string }) => e.type)).toEqual([
      "tool_call",
      "tool_result",
      "text",
      "done",
    ]);

    const summary = JSON.parse(printed[printed.length - 1]!);
    expect(summary.status).toBe("done");
  });

  it("exits 1 for an unknown agent", async () => {
    const exitCode = await runDryRun(["nonexistent", "hi"]);
    expect(exitCode).toBe(1);
    expect(console.error).toHaveBeenCalled();
  });

  it("exits 1 when no input is given", async () => {
    const exitCode = await runDryRun(["hello"]);
    expect(exitCode).toBe(1);
  });
});

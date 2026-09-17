import { describe, expect, it } from "vitest";
import { registry, helloAgent } from "../src/registry/index.js";
import { runAgent } from "../src/runtime.js";
import { createFakeClient, type FakeTurn } from "../src/client/fake.js";
import { createMemoryStore } from "../src/store/memory.js";

describe("registry", () => {
  it("registers the hello agent by name", () => {
    expect(registry.hello).toBe(helloAgent);
    expect(helloAgent.name).toBe("hello");
  });

  it("runs the hello agent end to end against the fake client", async () => {
    const store = createMemoryStore();
    store.setSnapshot("wedding-1", {
      wedding: { id: "wedding-1", name: "Alex & Sam", targetDate: "2028-05-20" },
      tasksSummary: { total: 2, done: 1, upcoming: [{ title: "Book venue", phase: "foundation" }] },
    });

    const script: FakeTurn[] = [
      {
        content: [{ type: "tool_use", id: "toolu_1", name: "get_wedding_summary", input: {} }],
        stop_reason: "tool_use",
      },
      {
        content: [{ type: "text", text: "Next up: book your venue." }],
        stop_reason: "end_turn",
      },
    ];

    const result = await runAgent({
      agent: helloAgent,
      weddingId: "wedding-1",
      input: "what's next?",
      trigger: "test",
      store,
      client: createFakeClient(script),
    });

    expect(result.status).toBe("done");
    expect(result.finalText).toBe("Next up: book your venue.");

    const events = store.getEvents(result.runId);
    const toolResult = events.find((e) => e.type === "tool_result");
    expect((toolResult as { output: string }).output).toContain("Alex & Sam");
  });
});

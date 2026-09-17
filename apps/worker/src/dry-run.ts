import {
  createAnthropicClient,
  createFakeClient,
  createMemoryStore,
  registry,
  runAgent,
  type FakeTurn,
} from "@bower/agents";

const DEMO_WEDDING_ID = "demo-wedding";

/**
 * A deterministic scripted conversation for `ANTHROPIC_FAKE=1` dry runs,
 * keyed by agent name so each agent can get a fixture that exercises its
 * own tools. Anything without a fixture gets a plain scripted answer.
 */
function scriptFor(agentName: string, input: string): FakeTurn[] {
  if (agentName === "hello") {
    return [
      {
        content: [
          { type: "tool_use", id: "toolu_dry_run_1", name: "get_wedding_summary", input: {} },
        ],
        stop_reason: "tool_use",
      },
      {
        content: [
          {
            type: "text",
            text:
              "Here's what's next: lock in your venue, then send save-the-dates. " +
              `(You asked: "${input}")`,
          },
        ],
        stop_reason: "end_turn",
      },
    ];
  }

  return [
    {
      content: [{ type: "text", text: `(fake) ${agentName} received: ${input}` }],
      stop_reason: "end_turn",
    },
  ];
}

function demoStore() {
  return createMemoryStore({
    snapshots: {
      [DEMO_WEDDING_ID]: {
        wedding: { id: DEMO_WEDDING_ID, name: "Demo Wedding", targetDate: "2028-05-20" },
        tasksSummary: {
          total: 12,
          done: 3,
          upcoming: [
            { title: "Book venue", phase: "foundation", dueDate: "2027-03-01" },
            { title: "Send save-the-dates", phase: "communications" },
          ],
        },
      },
    },
  });
}

/**
 * `dry-run <agent> <input...>`: runs one agent from the registry against
 * the in-memory store, using the fake client when `ANTHROPIC_FAKE=1` is
 * set and the real Anthropic client otherwise (docs/specs/agent-runtime.md
 * § Acceptance). Prints every logged event, then a final summary line, and
 * returns the process exit code.
 */
export async function runDryRun(args: string[]): Promise<number> {
  const [agentName, ...rest] = args;
  const input = rest.join(" ");

  if (!agentName || !input) {
    console.error("usage: dry-run <agent> <input...>");
    return 1;
  }

  const agent = registry[agentName];
  if (!agent) {
    console.error(`unknown agent "${agentName}". known agents: ${Object.keys(registry).join(", ")}`);
    return 1;
  }

  const store = demoStore();
  const client =
    process.env.ANTHROPIC_FAKE === "1" ? createFakeClient(scriptFor(agentName, input)) : createAnthropicClient();

  const result = await runAgent({
    agent,
    weddingId: DEMO_WEDDING_ID,
    input,
    trigger: "dry-run",
    store,
    client,
  });

  for (const event of store.getEvents(result.runId)) {
    console.log(JSON.stringify(event));
  }

  console.log(
    JSON.stringify({
      status: result.status,
      finalText: result.finalText,
      approvals: result.approvals,
      usage: result.usage,
    }),
  );

  return result.status === "failed" ? 1 : 0;
}

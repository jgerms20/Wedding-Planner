import type {
  ModelClient,
  ModelContentBlock,
  ModelMessage,
  ModelStopReason,
  ModelUsage,
  ToolRun,
  ToolRunParams,
} from "./types.js";

export interface FakeTurn {
  content: ModelContentBlock[];
  stop_reason: ModelStopReason;
  usage?: Partial<ModelUsage>;
}

const DEFAULT_USAGE: ModelUsage = {
  input_tokens: 100,
  output_tokens: 50,
  cache_creation_input_tokens: 0,
  cache_read_input_tokens: 0,
};

/**
 * Stands in for the Anthropic client in tests and `ANTHROPIC_FAKE=1` dry
 * runs. `script` is played back one scripted turn per iteration; whenever
 * a turn is a `tool_use` turn, the matching tool's `run()` is actually
 * invoked (after the turn is yielded, mirroring the real tool runner:
 * consumers see the assistant turn first, then the tool executes) so
 * gated-tool approvals, tool errors, and tool output are exercised for
 * real. A `pause_turn` turn only advances once the caller resumes it via
 * `pushMessages`, exactly like `client.beta.messages.toolRunner()`.
 */
export function createFakeClient(script: FakeTurn[]): ModelClient {
  return {
    createToolRun(params: ToolRunParams): ToolRun {
      const toolsByName = new Map(params.tools.map((tool) => [tool.name, tool]));
      let index = 0;
      // Set (synchronously, before yielding) the moment a pause_turn message
      // is produced, so pushMessages() works no matter when the caller calls
      // it relative to the generator actually suspending - see below.
      let resumeSignal: (() => void) | null = null;

      async function* iterate(): AsyncGenerator<ModelMessage> {
        while (index < script.length) {
          const turn = script[index++]!;
          const message: ModelMessage = {
            content: turn.content,
            stop_reason: turn.stop_reason,
            usage: { ...DEFAULT_USAGE, ...turn.usage },
            model: params.model,
          };

          if (turn.stop_reason === "pause_turn") {
            // The resume gate must exist *before* `yield` suspends this
            // generator, because the consumer's `for await` body (where it
            // calls pushMessages()) runs interleaved with, and can complete
            // before, the code that resumes after `yield` - a resumeSignal
            // set only after yielding could arrive too late to observe.
            const gate = new Promise<void>((resolve) => {
              resumeSignal = resolve;
            });
            yield message;
            await gate;
            resumeSignal = null;
            continue;
          }

          yield message;

          if (turn.stop_reason === "tool_use") {
            for (const block of turn.content) {
              if (block.type !== "tool_use") continue;
              const toolUse = block as { name: string; input: unknown };
              const tool = toolsByName.get(toolUse.name);
              if (!tool) {
                throw new Error(`Unknown tool in fake script: ${toolUse.name}`);
              }
              try {
                await tool.run(toolUse.input);
              } catch {
                // The real tool runner catches a thrown run() and turns it
                // into an `is_error` tool_result instead of failing the
                // whole loop - see BetaToolRunner#generateToolResponse. We
                // mirror that here: the error was already logged by the
                // runtime's tool wrapper, so just keep the script going.
              }
            }
            continue;
          }

          return;
        }
      }

      const generator = iterate();

      return {
        [Symbol.asyncIterator]: () => generator,
        pushMessages: () => {
          resumeSignal?.();
        },
      };
    },
  };
}

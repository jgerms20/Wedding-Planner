import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { ModelClient, ToolRun, ToolRunParams } from "./types.js";

export interface AnthropicClientOptions {
  apiKey?: string;
}

/**
 * The real `ModelClient`, backed by `@anthropic-ai/sdk`'s beta tool
 * runner (`client.beta.messages.toolRunner`). Per the `claude-api` skill:
 * adaptive thinking, `output_config.effort`, and `fallbacks: "default"`
 * under the `server-side-fallback-2026-07-01` beta so a policy decline on
 * Opus 5 is retried server-side instead of failing the run.
 */
export function createAnthropicClient(options: AnthropicClientOptions = {}): ModelClient {
  const client = new Anthropic(options.apiKey ? { apiKey: options.apiKey } : {});

  return {
    createToolRun(params: ToolRunParams): ToolRun {
      const tools = params.tools.map((tool) =>
        betaZodTool({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
          run: tool.run,
        }),
      );

      const runner = client.beta.messages.toolRunner({
        model: params.model,
        max_tokens: params.maxTokens,
        system: params.system,
        messages: params.messages as Anthropic.Beta.Messages.BetaMessageParam[],
        tools,
        thinking: { type: "adaptive" },
        output_config: { effort: params.effort },
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      });

      // The runner's element type (`BetaMessage`) and `pushMessages` are a
      // structural superset of our minimal `ToolRun` surface - see
      // src/client/types.ts for what the runtime actually reads off it.
      return runner as unknown as ToolRun;
    },
  };
}

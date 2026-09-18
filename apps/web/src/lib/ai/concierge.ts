import { bowerResponseSchema, type BowerResponse, type ChatMessage, type WeddingRepo } from "@bower/shared";
import { createBrowserPort, hasApiKey, MODELS, ZERO_USAGE, type ModelPort, type PortMessage, type PortUsage } from "./client";
import { CONCIERGE_SYSTEM, systemBlocks } from "./prompts";
import { buildSnapshot } from "./snapshot";
import { logUsage } from "./usage";

/**
 * The Concierge answers from the whole wedding and can propose changes.
 *
 * Opus 5 with adaptive thinking and medium effort: this is the one place the
 * couple asks open questions, so it is worth the better model. The last 20
 * turns ride after the cached system block; the snapshot holds the facts.
 */

const HISTORY_TURNS = 20;
const MAX_CHAT_TOKENS = 8000;

export interface ConciergeInput {
  text: string;
  /** Prior turns, oldest first. Only the last 20 are sent. */
  history: ChatMessage[];
  repo: WeddingRepo;
  weddingId: string;
  /** Injected in tests; defaults to the browser SDK port for the stored key. */
  port?: ModelPort;
  today?: string;
}

export interface ConciergeResult {
  response: BowerResponse;
  usage: PortUsage;
  fromModel: boolean;
  model?: string;
  error?: string;
}

const NO_KEY_REPLY =
  "I can read your whole plan once Claude is connected in Settings. Until then, every tab on the left is live and the Tell Atlas bar still saves what you say.";

export async function respond(input: ConciergeInput): Promise<ConciergeResult> {
  const port = input.port ?? (hasApiKey() ? createBrowserPort() : undefined);
  if (!port) {
    return { response: { reply: NO_KEY_REPLY, actions: [] }, usage: ZERO_USAGE, fromModel: false };
  }

  try {
    const snapshot = await buildSnapshot(input.repo, input.weddingId, { today: input.today });
    const result = await port.parse({
      model: MODELS.concierge,
      system: systemBlocks(CONCIERGE_SYSTEM, snapshot),
      messages: [...toMessages(input.history), { role: "user", content: input.text }],
      schema: bowerResponseSchema,
      maxTokens: MAX_CHAT_TOKENS,
      effort: "medium",
    });
    await logUsage(input.repo, input.weddingId, "concierge", result.model, result.usage);
    if (!result.parsed) {
      return {
        response: { reply: result.text || "I could not put that together. Ask me again?", actions: [] },
        usage: result.usage,
        fromModel: true,
        model: result.model,
      };
    }
    return { response: result.parsed, usage: result.usage, fromModel: true, model: result.model };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      response: { reply: `I could not reach Claude just now. ${message}`, actions: [] },
      usage: ZERO_USAGE,
      fromModel: false,
      error: message,
    };
  }
}

/** The stored history, trimmed to the last 20 turns and stripped to role + text. */
function toMessages(history: ChatMessage[]): PortMessage[] {
  return history
    .slice(-HISTORY_TURNS)
    .filter((message) => message.content.trim().length > 0)
    .map((message) => ({ role: message.role, content: message.content }));
}

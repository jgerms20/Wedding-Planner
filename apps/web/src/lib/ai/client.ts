import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { z } from "zod";

/**
 * The browser side of Bower's Claude connection.
 *
 * The app is a static export with no server routes, so the key the couple
 * pastes into Settings lives in this browser's localStorage and the SDK runs
 * with `dangerouslyAllowBrowser`. Nothing is proxied and nothing is stored
 * anywhere else.
 *
 * Every model call goes through `ModelPort` rather than the SDK directly, so
 * tests inject a fake and never touch the network.
 */

export const API_KEY_STORAGE_KEY = "bower:anthropic-key";

/** Which model does which job. Sonnet for extraction, Opus for the Concierge. */
export const MODELS = {
  parse: "claude-sonnet-5",
  concierge: "claude-opus-5",
  research: "claude-sonnet-5",
} as const;

export type ModelName = (typeof MODELS)[keyof typeof MODELS];

/** Adaptive thinking is on for Opus; Sonnet extraction runs without it. */
function isOpus(model: string): boolean {
  return model.startsWith("claude-opus");
}

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(API_KEY_STORAGE_KEY);
    return value && value.trim() ? value.trim() : null;
  } catch {
    // Private mode, blocked site data, or a prerender pass: behave as unset.
    return null;
  }
}

export function setApiKey(key: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (key && key.trim()) window.localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
    else window.localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch {
    // Nothing to do — the couple will be asked for the key again next time.
  }
}

export function hasApiKey(): boolean {
  return getApiKey() !== null;
}

/** The SDK client, keyed from this browser's storage unless one is passed in. */
export function createBrowserClient(apiKey?: string): Anthropic {
  const key = apiKey ?? getApiKey();
  if (!key) throw new Error("No Claude API key. Connect Claude in Settings first.");
  return new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true });
}

/** Cheapest possible call that proves a key works: one model from the list. */
export async function verifyApiKey(key: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const client = createBrowserClient(key);
    await client.models.list({ limit: 1 });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describeApiError(error) };
  }
}

export function describeApiError(error: unknown): string {
  if (error instanceof Anthropic.AuthenticationError) return "That key was rejected. Check it and paste it again.";
  if (error instanceof Anthropic.PermissionDeniedError) return "That key does not have access to the Messages API.";
  if (error instanceof Anthropic.RateLimitError) return "Claude is rate limiting this key. Try again in a minute.";
  if (error instanceof Anthropic.APIConnectionError) return "Could not reach Claude from this browser.";
  if (error instanceof Anthropic.APIError) return error.message;
  return error instanceof Error ? error.message : String(error);
}

/* ------------------------------------------------------------------ */
/* The port                                                            */
/* ------------------------------------------------------------------ */

export type Effort = "low" | "medium" | "high" | "xhigh" | "max";

export interface PortSystemBlock {
  type: "text";
  text: string;
  cache_control?: { type: "ephemeral" };
}

export interface PortMessage {
  role: "user" | "assistant";
  content: string | unknown[];
}

export interface PortUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
}

export const ZERO_USAGE: PortUsage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0 };

export interface PortParseParams<S extends z.ZodType = z.ZodType> {
  model: string;
  system: PortSystemBlock[];
  messages: PortMessage[];
  schema: S;
  maxTokens: number;
  effort?: Effort;
}

export interface PortParseResult<T> {
  parsed: T | null;
  text: string;
  usage: PortUsage;
  model: string;
}

export interface PortCreateParams {
  model: string;
  system?: PortSystemBlock[];
  messages: PortMessage[];
  maxTokens: number;
  effort?: Effort;
  tools?: unknown[];
}

export interface PortCreateResult {
  /** Raw content blocks, echoed back verbatim when resuming a `pause_turn`. */
  content: unknown[];
  /** Just the text blocks, joined — what the parse step reads. */
  text: string;
  stopReason: string | null;
  usage: PortUsage;
  model: string;
}

/**
 * The seam between Bower and Anthropic. `parse` is structured extraction,
 * `create` is a free-form turn (the one that carries server tools), and
 * `models` backs the Settings "Verify" button.
 */
export interface ModelPort {
  parse<S extends z.ZodType>(params: PortParseParams<S>): Promise<PortParseResult<z.infer<S>>>;
  create(params: PortCreateParams): Promise<PortCreateResult>;
  models(): Promise<string[]>;
}

function readUsage(usage: {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
}): PortUsage {
  return {
    inputTokens: usage.input_tokens ?? 0,
    outputTokens: usage.output_tokens ?? 0,
    cacheReadTokens: usage.cache_read_input_tokens ?? 0,
    cacheWriteTokens: usage.cache_creation_input_tokens ?? 0,
  };
}

function joinText(content: Array<{ type: string; text?: string }>): string {
  return content
    .filter((block) => block.type === "text" && typeof block.text === "string")
    .map((block) => block.text as string)
    .join("\n")
    .trim();
}

/** The real port, wrapping `@anthropic-ai/sdk`. */
export function createSdkPort(client: Anthropic): ModelPort {
  return {
    async parse<S extends z.ZodType>(params: PortParseParams<S>): Promise<PortParseResult<z.infer<S>>> {
      // Structured output lives on the stable `client.messages.parse`, whose
      // params do not accept `fallbacks` — so extraction calls run without a
      // server-side refusal fallback. The Concierge's answer is short and the
      // caller surfaces an error rather than silently losing the turn.
      const message = await client.messages.parse({
        model: params.model,
        max_tokens: params.maxTokens,
        system: params.system,
        messages: params.messages as Anthropic.MessageParam[],
        ...(isOpus(params.model) ? { thinking: { type: "adaptive" as const } } : {}),
        output_config: {
          ...(params.effort ? { effort: params.effort } : {}),
          format: zodOutputFormat(params.schema),
        },
      });
      return {
        parsed: (message.parsed_output as z.infer<S> | null) ?? null,
        text: joinText(message.content as Array<{ type: string; text?: string }>),
        usage: readUsage(message.usage),
        model: message.model,
      };
    },

    async create(params: PortCreateParams): Promise<PortCreateResult> {
      const message = await client.beta.messages.create({
        model: params.model,
        max_tokens: params.maxTokens,
        ...(params.system ? { system: params.system } : {}),
        messages: params.messages as Anthropic.Beta.Messages.BetaMessageParam[],
        ...(params.tools ? { tools: params.tools as Anthropic.Beta.Messages.BetaToolUnion[] } : {}),
        ...(isOpus(params.model)
          ? {
              thinking: { type: "adaptive" as const },
              betas: ["server-side-fallback-2026-07-01"],
              fallbacks: "default" as const,
            }
          : {}),
        ...(params.effort ? { output_config: { effort: params.effort } } : {}),
      });
      return {
        content: message.content,
        text: joinText(message.content as Array<{ type: string; text?: string }>),
        stopReason: message.stop_reason,
        usage: readUsage(message.usage),
        model: message.model,
      };
    },

    async models(): Promise<string[]> {
      const page = await client.models.list({ limit: 1 });
      return page.data.map((model) => model.id);
    },
  };
}

/** Convenience: the port for the key currently stored in this browser. */
export function createBrowserPort(apiKey?: string): ModelPort {
  return createSdkPort(createBrowserClient(apiKey));
}

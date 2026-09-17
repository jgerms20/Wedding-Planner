import type { ModelPort, PortCreateParams, PortCreateResult, PortParseParams, PortParseResult, PortUsage } from "@/lib/ai/client";
import type { z } from "zod";

/**
 * A scripted stand-in for the Anthropic SDK. Every AI test injects one of
 * these instead of a real port, so nothing in this suite can reach the live
 * API: the fake has no client, no key, and no network code at all. Each
 * scripted turn is handed out in order and the params it was called with are
 * recorded on `parseCalls` / `createCalls` for assertions.
 */

const BASE_USAGE: PortUsage = { inputTokens: 1000, outputTokens: 500, cacheReadTokens: 0, cacheWriteTokens: 0 };

export interface FakeParseTurn {
  parsed: unknown;
  text?: string;
  usage?: Partial<PortUsage>;
  model?: string;
}

export interface FakeCreateTurn {
  content?: unknown[];
  text?: string;
  stopReason?: string | null;
  usage?: Partial<PortUsage>;
  model?: string;
}

export interface FakeScript {
  parse?: FakeParseTurn[];
  create?: FakeCreateTurn[];
  models?: string[];
}

export interface FakePort extends ModelPort {
  parseCalls: PortParseParams[];
  createCalls: PortCreateParams[];
}

export function createFakePort(script: FakeScript): FakePort {
  const parseTurns = [...(script.parse ?? [])];
  const createTurns = [...(script.create ?? [])];
  const parseCalls: PortParseParams[] = [];
  const createCalls: PortCreateParams[] = [];

  return {
    parseCalls,
    createCalls,
    async parse<S extends z.ZodType>(params: PortParseParams<S>): Promise<PortParseResult<z.infer<S>>> {
      parseCalls.push(params as PortParseParams);
      const turn = parseTurns.shift();
      if (!turn) throw new Error("fake port: no parse turn left in the script");
      return {
        parsed: (turn.parsed ?? null) as z.infer<S> | null,
        text: turn.text ?? "",
        usage: { ...BASE_USAGE, ...turn.usage },
        model: turn.model ?? params.model,
      };
    },
    async create(params: PortCreateParams): Promise<PortCreateResult> {
      createCalls.push(params);
      const turn = createTurns.shift();
      if (!turn) throw new Error("fake port: no create turn left in the script");
      return {
        content: turn.content ?? [{ type: "text", text: turn.text ?? "" }],
        text: turn.text ?? "",
        stopReason: turn.stopReason ?? "end_turn",
        usage: { ...BASE_USAGE, ...turn.usage },
        model: turn.model ?? params.model,
      };
    },
    async models(): Promise<string[]> {
      return script.models ?? ["claude-opus-5"];
    },
  };
}

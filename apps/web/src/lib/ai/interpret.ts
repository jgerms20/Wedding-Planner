import {
  applyActions,
  bowerResponseSchema,
  describeAction,
  parseFallback,
  type ApplyResult,
  type BowerAction,
  type BowerResponse,
  type WeddingRepo,
} from "@bower/shared";
import { WEDDING_SLUG } from "@/lib/constants";
import { createBrowserPort, hasApiKey, MODELS, ZERO_USAGE, type ModelPort, type PortUsage } from "./client";
import { TELL_BOWER_SYSTEM, systemBlocks } from "./prompts";
import { buildSnapshot } from "./snapshot";
import { logUsage } from "./usage";

/**
 * One utterance from the Tell Bower bar becomes a reply plus a proposal.
 *
 * With a key: Sonnet 5 reads the wedding snapshot and returns a
 * `BowerResponse` through structured output. Without one: the deterministic
 * fallback parser handles the simple phrasings and everything else becomes a
 * note — the couple sees the same cards either way.
 */

export type ActionSource = "chat" | "voice" | "manual";

export interface InterpretInput {
  text: string;
  repo: WeddingRepo;
  weddingId: string;
  /** Injected in tests; defaults to the browser SDK port for the stored key. */
  port?: ModelPort;
  source?: ActionSource;
  /** Pins "today" for the snapshot and the fallback parser. */
  today?: string;
}

export interface InterpretResult {
  response: BowerResponse;
  usage: PortUsage;
  /** True when the model produced this; false when the fallback parser did. */
  fromModel: boolean;
  model?: string;
  /** Set when a model call was attempted and failed; the fallback ran instead. */
  error?: string;
}

const MAX_PARSE_TOKENS = 4000;

export async function interpret(input: InterpretInput): Promise<InterpretResult> {
  const { text, repo, weddingId } = input;
  const port = input.port ?? (hasApiKey() ? createBrowserPort() : undefined);

  if (!port) return await fallbackResult(input);

  try {
    const snapshot = await buildSnapshot(repo, weddingId, { today: input.today });
    const result = await port.parse({
      model: MODELS.parse,
      system: systemBlocks(TELL_BOWER_SYSTEM, snapshot),
      messages: [{ role: "user", content: text }],
      schema: bowerResponseSchema,
      maxTokens: MAX_PARSE_TOKENS,
      effort: "low",
    });
    await logUsage(repo, weddingId, "tell_bower", result.model, result.usage);
    if (!result.parsed) {
      const fallback = await fallbackResult(input);
      return { ...fallback, usage: result.usage, error: "Claude did not return a usable proposal." };
    }
    return { response: result.parsed, usage: result.usage, fromModel: true, model: result.model };
  } catch (error) {
    const fallback = await fallbackResult(input);
    return { ...fallback, error: error instanceof Error ? error.message : String(error) };
  }
}

async function fallbackResult(input: InterpretInput): Promise<InterpretResult> {
  const wedding = await input.repo.getWedding(WEDDING_SLUG);
  const actions = parseFallback(input.text, {
    now: input.today,
    partnerAName: wedding?.partnerA.name,
    partnerBName: wedding?.partnerB.name,
  });
  return { response: { reply: fallbackReply(actions), actions }, usage: ZERO_USAGE, fromModel: false };
}

function fallbackReply(actions: BowerAction[]): string {
  if (actions.length === 0) return "I did not catch that. Say it again?";
  const onlyCatchAllNote = actions.length === 1 && actions[0]!.type === "add_note";
  if (onlyCatchAllNote) {
    return "I saved that as a note. Connect Claude in Settings and I can turn what you say into guests, tasks, and dates.";
  }
  return `${actions.map(describeAction).join("; ")}. Connect Claude in Settings for the rest.`;
}

/* ------------------------------------------------------------------ */
/* Autonomy                                                            */
/* ------------------------------------------------------------------ */

/** `settings.autonomy.tell_bower`: 0 suggest, 1 draft and approve, 2 auto-apply additions. */
export type AutonomyLevel = 0 | 1 | 2 | 3;

export interface RunProposalInput {
  repo: WeddingRepo;
  weddingId: string;
  actions: BowerAction[];
  autonomy?: AutonomyLevel;
  source?: ActionSource;
}

export interface ProposalOutcome {
  /** Actions still waiting on the couple, rendered as cards. */
  pending: BowerAction[];
  /** What was applied without asking, so the toast can offer Undo. */
  results: ApplyResult[];
}

/** Additions are safe to auto-apply at level 2; everything else still asks. */
function isAddition(action: BowerAction): boolean {
  return action.type.startsWith("add_");
}

export async function runProposal({
  repo,
  weddingId,
  actions,
  autonomy = 1,
  source = "chat",
}: RunProposalInput): Promise<ProposalOutcome> {
  if (autonomy < 2 || actions.length === 0) return { pending: actions, results: [] };
  const auto = actions.filter(isAddition);
  const pending = actions.filter((action) => !isAddition(action));
  if (auto.length === 0) return { pending, results: [] };
  const results = await applyActions(repo, weddingId, auto, { source });
  return { pending, results };
}

/** Reads the Tell Bower autonomy level off settings, defaulting to "draft and approve". */
export function autonomyFor(autonomy: Record<string, number> | undefined, key = "tell_bower"): AutonomyLevel {
  const level = autonomy?.[key];
  return level === 0 || level === 1 || level === 2 || level === 3 ? level : 1;
}

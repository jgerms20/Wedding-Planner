import type { AgentConfig } from "./types.js";

/**
 * Identity helper that gives agent configs a single declarative shape (see
 * docs/specs/agent-runtime.md § API). It exists mainly for readability at
 * the call site and so the registry has one canonical import to type
 * against; it does no validation of its own today.
 */
export function defineAgent(config: AgentConfig): AgentConfig {
  return config;
}

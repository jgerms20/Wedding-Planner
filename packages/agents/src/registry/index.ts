import { helloAgent } from "./hello.js";
import type { AgentConfig } from "../types.js";

export { helloAgent };

/** Every agent, keyed by `AgentConfig.name`. */
export const registry: Record<string, AgentConfig> = {
  hello: helloAgent,
};

import { describe, expect, it } from "vitest";
import { describeKeyShape } from "@/lib/ai/client";

describe("describeKeyShape", () => {
  it("explains the two Console look-alikes that aren't keys", () => {
    expect(describeKeyShape("apikey_0153qCJ6DM2393DP9bpB1A4t")).toMatch(/key's ID/);
    expect(describeKeyShape("sk-ant-api03-sPM...WgAA")).toMatch(/shortened preview/);
  });

  it("catches other bad pastes and passes a well-formed key", () => {
    expect(describeKeyShape("hello")).toMatch(/start with sk-ant-/);
    expect(describeKeyShape("sk-ant-api03-abc\ndef")).toMatch(/space or line break/);
    expect(describeKeyShape("  sk-ant-api03-abcDEF_123-xyz  ")).toBeNull();
  });
});

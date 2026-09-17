import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    const showB = false;
    expect(cn("a", showB && "b", "c")).toBe("a c");
  });
});

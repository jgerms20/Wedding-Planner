import { describe, expect, it } from "vitest";
import { PACKAGE_NAME } from "../src/index.js";

describe("@bower/db", () => {
  it("exports a package name", () => {
    expect(PACKAGE_NAME).toBe("@bower/db");
  });
});

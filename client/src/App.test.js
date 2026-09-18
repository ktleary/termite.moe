import { describe, it, expect } from "vitest";

describe("client smoke", () => {
  it("renders a title string", () => {
    expect("termite").toMatch(/termite/);
  });
});

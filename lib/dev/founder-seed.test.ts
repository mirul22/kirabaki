import { describe, expect, it } from "vitest";
import { clampDayInMonth, planFounderSeed } from "./founder-seed";

describe("clampDayInMonth", () => {
  it("does not invent a future day", () => {
    expect(clampDayInMonth("2026-08-16", 1)).toBe("2026-08-01");
    expect(clampDayInMonth("2026-08-16", 20)).toBe("2026-08-16");
  });
});

describe("planFounderSeed", () => {
  it("gives every place a stated amount and at least one line", () => {
    const plan = planFounderSeed(
      [
        { id: "a", name: "Maybank", kind: "bank" },
        { id: "b", name: "GX", kind: "ewallet" },
        { id: "c", name: "In Hand", kind: "cash" },
      ],
      "2026-08-16",
    );
    expect(plan.balances).toHaveLength(3);
    expect(plan.lines.length).toBeGreaterThanOrEqual(3);
    expect(plan.lines.every((line) => line.occurredOn <= "2026-08-16")).toBe(true);
    expect(new Set(plan.lines.map((line) => line.accountId)).size).toBe(3);
  });
});

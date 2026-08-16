import { describe, expect, it } from "vitest";
import { planTravelLoop } from "./travel-loop";

describe("planTravelLoop", () => {
  it("covers accepted, later, and not-relevant paths", () => {
    const loop = planTravelLoop("2026-08-16");
    expect(loop.map((row) => row.key)).toEqual([
      "empty_month",
      "missing_picture",
      "empty_month",
      "quiet_good",
      "goal_slipping",
      "nothing_stayed",
    ]);
    expect(loop.some((row) => row.decision === "accepted" && row.note)).toBe(true);
    expect(loop.some((row) => row.decision === "later")).toBe(true);
    expect(loop.some((row) => row.decision === "not_relevant")).toBe(true);
  });
});

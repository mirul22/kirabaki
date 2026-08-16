import { describe, expect, it } from "vitest";
import { dateInMonth, monthCashflowFromLines, planTravelStory } from "./travel-story";
import { majorToCents } from "@/lib/money";

describe("dateInMonth", () => {
  it("skips days after the as-of date", () => {
    expect(dateInMonth("2026-08-01", 1, "2026-08-16")).toBe("2026-08-01");
    expect(dateInMonth("2026-08-01", 20, "2026-08-16")).toBeNull();
    expect(dateInMonth("2026-06-01", 31, "2026-08-16")).toBe("2026-06-30");
  });
});

describe("planTravelStory", () => {
  const plan = planTravelStory("2026-08-16");
  const [june, july, august] = plan.months;

  it("covers three months with a 10k salary and the housing and car lines", () => {
    expect(plan.months).toEqual(["2026-06-01", "2026-07-01", "2026-08-01"]);
    expect(plan.lines.length).toBeGreaterThanOrEqual(40);
    expect(plan.lines.filter((row) => row.name === "Pay" && row.amountCents === majorToCents(10_000))).toHaveLength(
      3,
    );
    for (const start of [june, july]) {
      expect(plan.lines.some((row) => row.occurredOn.startsWith(start.slice(0, 7)) && row.name === "Rent")).toBe(
        true,
      );
      expect(
        plan.lines.some((row) => row.occurredOn.startsWith(start.slice(0, 7)) && row.name === "House maintenance"),
      ).toBe(true);
      expect(plan.lines.some((row) => row.occurredOn.startsWith(start.slice(0, 7)) && row.name === "Car loan")).toBe(
        true,
      );
    }
  });

  it("keeps June in surplus and sends July out on the trip", () => {
    const juneFlow = monthCashflowFromLines(plan.lines, june);
    const julyFlow = monthCashflowFromLines(plan.lines, july);
    expect(juneFlow.savingsCents).toBeGreaterThan(0);
    expect(julyFlow.savingsCents).toBeLessThanOrEqual(0);
    expect(plan.lines.some((row) => row.name === "Flights to Japan")).toBe(true);
  });

  it("does not invent August days after the as-of date", () => {
    expect(plan.lines.every((row) => row.occurredOn <= "2026-08-16")).toBe(true);
    expect(monthCashflowFromLines(plan.lines, august).incomeCents).toBe(majorToCents(10_000));
  });
});

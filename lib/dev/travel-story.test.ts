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
  const [may, june, july, august] = plan.months;

  it("covers four months with a 10k salary and the housing and car lines", () => {
    expect(plan.months).toEqual(["2026-05-01", "2026-06-01", "2026-07-01", "2026-08-01"]);
    expect(plan.lines.length).toBeGreaterThanOrEqual(80);
    expect(plan.lines.filter((row) => row.name === "Pay" && row.amountCents === majorToCents(10_000))).toHaveLength(
      4,
    );
    expect(plan.assets.some((row) => row.name === "ASB")).toBe(true);
    expect(plan.lines.some((row) => row.name === "Weekend work")).toBe(true);
    for (const start of [may, june, july]) {
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

  it("evens May, keeps June, and sends July out on the trip", () => {
    const mayFlow = monthCashflowFromLines(plan.lines, may);
    const juneFlow = monthCashflowFromLines(plan.lines, june);
    const julyFlow = monthCashflowFromLines(plan.lines, july);
    expect(mayFlow.incomeCents).toBe(majorToCents(10_000));
    expect(mayFlow.savingsCents).toBe(0);
    expect(juneFlow.savingsCents).toBeGreaterThan(0);
    expect(julyFlow.savingsCents).toBeLessThanOrEqual(0);
    expect(plan.lines.some((row) => row.name === "Flights to Japan")).toBe(true);
    expect(plan.lines.some((row) => row.name === "Family")).toBe(true);
  });

  it("does not invent August days after the as-of date", () => {
    expect(plan.lines.every((row) => row.occurredOn <= "2026-08-16")).toBe(true);
    expect(monthCashflowFromLines(plan.lines, august).incomeCents).toBe(majorToCents(10_000));
  });
});

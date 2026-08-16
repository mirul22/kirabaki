import { describe, expect, it } from "vitest";
import { fillTemplate, predicates, type FinanceFacts } from "./facts";

const empty: FinanceFacts = {
  accountCount: 0,
  incomeCents: 0,
  expenseCents: 0,
  savingsCents: 0,
  savingsRateBps: null,
  emergencyFundMonths: null,
  goalOnTrack: null,
  monthsBehind: null,
};

describe("predicates", () => {
  it("asks for a picture when there are no accounts", () => {
    expect(predicates.missing_picture(empty)).toBe(true);
    expect(predicates.missing_picture({ ...empty, accountCount: 1 })).toBe(false);
  });

  it("asks for one month line after a place exists", () => {
    expect(predicates.empty_month(empty)).toBe(false);
    expect(predicates.empty_month({ ...empty, accountCount: 1 })).toBe(true);
    expect(predicates.empty_month({ ...empty, accountCount: 1, incomeCents: 100 })).toBe(false);
  });

  it("flags a thin buffer from calculated months only", () => {
    expect(predicates.thin_buffer({ ...empty, emergencyFundMonths: 1.2 })).toBe(true);
    expect(predicates.thin_buffer({ ...empty, emergencyFundMonths: 3 })).toBe(false);
    expect(predicates.thin_buffer(empty)).toBe(false);
  });

  it("does not invent a slipping goal when none exists", () => {
    expect(predicates.goal_slipping(empty)).toBe(false);
    expect(predicates.goal_slipping({ ...empty, goalOnTrack: false })).toBe(true);
  });
});

describe("fillTemplate", () => {
  it("only substitutes provided tokens", () => {
    expect(fillTemplate("Cash covers {months} months.", { months: "2.5" })).toBe(
      "Cash covers 2.5 months.",
    );
  });
});

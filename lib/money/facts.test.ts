import { describe, expect, it } from "vitest";
import { fillTemplate, monthKeepContrast, predicates, type FinanceFacts } from "./facts";
import { RULES } from "@/domains/knowledge/catalog";

const empty: FinanceFacts = {
  accountCount: 0,
  incomeCents: 0,
  expenseCents: 0,
  savingsCents: 0,
  savingsRateBps: null,
  emergencyFundMonths: null,
  goalOnTrack: null,
  monthsBehind: null,
  lastSavingsCents: null,
  lastIncomeCents: null,
  lastExpenseCents: null,
  lastMonthStart: null,
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

  it("names a keep after a month that went out", () => {
    expect(
      predicates.kept_after_out({
        ...empty,
        lastSavingsCents: -15_800,
        savingsCents: 501_700,
      }),
    ).toBe(true);
    expect(predicates.kept_after_out({ ...empty, lastSavingsCents: 40_000, savingsCents: 50_000 })).toBe(false);
    expect(
      predicates.quiet_good({ ...empty, accountCount: 1, emergencyFundMonths: 3.5, savingsCents: 50_000 }),
    ).toBe(true);
  });

  it("names a flip after a month that kept something", () => {
    expect(
      predicates.out_after_kept({
        ...empty,
        lastSavingsCents: 551_100,
        incomeCents: 1_000_000,
        savingsCents: -15_800,
      }),
    ).toBe(true);
    expect(
      predicates.out_after_kept({
        ...empty,
        lastSavingsCents: -10_000,
        incomeCents: 1_000_000,
        savingsCents: -5_000,
      }),
    ).toBe(false);
  });
});

describe("rule order from facts", () => {
  it("picks keep the buffer after a loud month, not you’re okay", () => {
    const facts: FinanceFacts = {
      ...empty,
      accountCount: 3,
      incomeCents: 1_000_000,
      expenseCents: 498_300,
      savingsCents: 501_700,
      emergencyFundMonths: 3.5,
      goalOnTrack: true,
      lastSavingsCents: -15_800,
      lastIncomeCents: 1_000_000,
      lastExpenseCents: 1_015_800,
      lastMonthStart: "2026-07-01",
    };
    const fired = RULES.filter((row) => predicates[row.key](facts)).sort((a, b) => a.priority - b.priority);
    expect(fired[0]?.key).toBe("kept_after_out");
  });

  it("picks a different-month close over generic nothing stayed", () => {
    const facts: FinanceFacts = {
      ...empty,
      accountCount: 3,
      incomeCents: 1_000_000,
      expenseCents: 1_015_800,
      savingsCents: -15_800,
      lastSavingsCents: 551_100,
      lastIncomeCents: 1_085_000,
      lastExpenseCents: 533_900,
      lastMonthStart: "2026-06-01",
    };
    const fired = RULES.filter((row) => predicates[row.key](facts)).sort((a, b) => a.priority - b.priority);
    expect(fired[0]?.key).toBe("out_after_kept");
  });
});

describe("fillTemplate", () => {
  it("only substitutes provided tokens", () => {
    expect(fillTemplate("Cash covers {months} months.", { months: "2.5" })).toBe(
      "Cash covers 2.5 months.",
    );
  });
});

describe("monthKeepContrast", () => {
  it("names last month’s keep next to this month’s keep", () => {
    expect(
      monthKeepContrast(
        "kept_after_out",
        {
          ...empty,
          savingsCents: 501_700,
          lastSavingsCents: -15_800,
          lastMonthStart: "2026-07-01",
        },
        "MYR",
      ),
    ).toEqual({
      lastLabel: "July 2026",
      lastKept: "−RM158.00",
      thisLabel: "This month",
      thisKept: "RM5,017.00",
    });
  });

  it("stays off generic okay", () => {
    expect(
      monthKeepContrast("quiet_good", { ...empty, lastMonthStart: "2026-07-01", lastSavingsCents: 1 }, "MYR"),
    ).toBeNull();
  });
});

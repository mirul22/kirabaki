import { describe, expect, it } from "vitest";
import {
  currentBalanceCents,
  emergencyFundMonths,
  formatAmountComplete,
  formatAmountTyping,
  formatMoney,
  parseAmountToCents,
  goalProjection,
  healthLanguage,
  majorToCents,
  monthAgainstLast,
  monthClosesFromLines,
  monthPlainTalk,
  monthRange,
  monthSentence,
  netWorth,
  periodCashflow,
} from "./index";

describe("currentBalanceCents", () => {
  it("applies later lines to what was stated", () => {
    expect(
      currentBalanceCents(10_000, [
        { type: "income", amountCents: 2_000 },
        { type: "expense", amountCents: 1_500 },
      ]),
    ).toBe(10_500);
  });
});

describe("majorToCents", () => {
  it("avoids floating-point drift", () => {
    expect(majorToCents(10.2)).toBe(1020);
    expect(majorToCents(0.1)).toBe(10);
  });
});

describe("periodCashflow", () => {
  it("computes savings and rate from income and expenses", () => {
    const result = periodCashflow({ incomeCents: 1_000_000, expenseCents: 580_000 });
    expect(result.savingsCents).toBe(420_000);
    expect(result.cashflowCents).toBe(420_000);
    expect(result.savingsRateBps).toBe(4200);
    expect(result.calculation).toBe("period_cashflow");
  });

  it("returns a null rate when income is zero", () => {
    const result = periodCashflow({ incomeCents: 0, expenseCents: 12_000 });
    expect(result.savingsCents).toBe(-12_000);
    expect(result.savingsRateBps).toBeNull();
  });
});

describe("netWorth", () => {
  it("adds cash and assets, subtracts liabilities", () => {
    const result = netWorth({
      cashAccountCents: [500_000, 200_000],
      otherAccountCents: [100_000],
      assetCents: [50_000],
      liabilityCents: [80_000],
    });
    expect(result.cashCents).toBe(700_000);
    expect(result.accountCents).toBe(800_000);
    expect(result.netWorthCents).toBe(770_000);
  });
});

describe("emergencyFundMonths", () => {
  it("divides cash by monthly spending", () => {
    const result = emergencyFundMonths({ cashCents: 900_000, monthlyExpenseCents: 300_000 });
    expect(result.months).toBe(3);
  });

  it("is null when there is no monthly spending", () => {
    const result = emergencyFundMonths({ cashCents: 900_000, monthlyExpenseCents: 0 });
    expect(result.months).toBeNull();
  });
});

describe("goalProjection", () => {
  it("marks a goal on track when contributions fit the date", () => {
    const result = goalProjection({
      currentCents: 400_000,
      targetCents: 1_000_000,
      monthlyContributionCents: 100_000,
      targetDate: "2026-12-01",
      asOf: "2026-06-01",
    });
    expect(result.monthsNeeded).toBe(6);
    expect(result.monthsAvailable).toBe(6);
    expect(result.onTrack).toBe(true);
    expect(result.monthsBehind).toBe(0);
    expect(result.projectedDate).toBe("2026-12-01");
  });

  it("counts months behind when the pace is short", () => {
    const result = goalProjection({
      currentCents: 100_000,
      targetCents: 1_000_000,
      monthlyContributionCents: 50_000,
      targetDate: "2026-12-01",
      asOf: "2026-06-01",
    });
    expect(result.monthsNeeded).toBe(18);
    expect(result.onTrack).toBe(false);
    expect(result.monthsBehind).toBe(12);
  });

  it("does not invent a date when contribution is zero", () => {
    const result = goalProjection({
      currentCents: 100_000,
      targetCents: 1_000_000,
      monthlyContributionCents: 0,
      targetDate: "2026-12-01",
      asOf: "2026-06-01",
    });
    expect(result.monthsNeeded).toBeNull();
    expect(result.onTrack).toBeNull();
    expect(result.projectedDate).toBeNull();
  });
});

describe("monthRange", () => {
  it("handles February in a leap year", () => {
    expect(monthRange("2024-02-10")).toEqual({ start: "2024-02-01", end: "2024-02-29" });
  });
});

describe("copy from facts", () => {
  it("uses protected voice for a month that kept something", () => {
    expect(monthSentence(periodCashflow({ incomeCents: 100, expenseCents: 40 }))).toBe(
      "Some of it stayed.",
    );
  });

  it("does not invent a health score", () => {
    const language = healthLanguage({
      hasAccounts: true,
      buffer: emergencyFundMonths({ cashCents: 100_000, monthlyExpenseCents: 200_000 }),
      goal: null,
      cashflow: periodCashflow({ incomeCents: 200_000, expenseCents: 180_000 }),
    });
    expect(language).toBe("Needs attention");
    expect(language).not.toMatch(/\d+\/100/);
  });
});

describe("formatMoney", () => {
  it("prefixes MYR as RM", () => {
    expect(formatMoney(123456, "MYR")).toBe("RM1,234.56");
  });

  it("groups thousands the same way in every amount", () => {
    expect(formatMoney(100_000_000, "MYR")).toBe("RM1,000,000.00");
    expect(formatMoney(10_000_000, "MYR")).toBe("RM100,000.00");
    expect(formatMoney(1_000_000, "MYR")).toBe("RM10,000.00");
    expect(formatMoney(100_000, "MYR")).toBe("RM1,000.00");
  });
});

describe("amount fields", () => {
  it("adds commas while typing", () => {
    expect(formatAmountTyping("1000000")).toBe("1,000,000");
    expect(formatAmountTyping("1000000.5")).toBe("1,000,000.5");
  });

  it("completes two decimal places", () => {
    expect(formatAmountComplete("1000")).toBe("1,000.00");
    expect(formatAmountComplete("1,000,000")).toBe("1,000,000.00");
  });

  it("parses grouped amounts back to cents", () => {
    expect(parseAmountToCents("1,000,000.00")).toBe(100_000_000);
    expect(parseAmountToCents("1,000.00")).toBe(100_000);
    expect(parseAmountToCents("24.00")).toBe(2_400);
  });
});

describe("monthPlainTalk", () => {
  it("says what stayed in ringgit", () => {
    const talk = monthPlainTalk(periodCashflow({ incomeCents: 645_000, expenseCents: 234_800 }), "MYR");
    expect(talk).toContain("RM4,102.00");
    expect(talk).toContain("RM6,450.00");
  });
});

describe("monthClosesFromLines", () => {
  it("groups dated lines and always includes this month", () => {
    const closes = monthClosesFromLines(
      [
        { occurredOn: "2026-06-01", type: "income", amountCents: 100_000 },
        { occurredOn: "2026-06-10", type: "expense", amountCents: 40_000 },
        { occurredOn: "2026-07-01", type: "income", amountCents: 80_000 },
        { occurredOn: "2026-08-20", type: "income", amountCents: 50_000 },
      ],
      "2026-08-16",
      6,
    );
    expect(closes.map((row) => row.periodStart)).toEqual(["2026-08-01", "2026-07-01", "2026-06-01"]);
    expect(closes[0]?.incomeCents).toBe(0);
    expect(closes[1]?.incomeCents).toBe(80_000);
    expect(closes[2]?.savingsCents).toBe(60_000);
  });

  it("keeps the newest six months", () => {
    const lines = Array.from({ length: 8 }, (_, index) => ({
      occurredOn: `2026-0${index + 1}-01` as const,
      type: "income" as const,
      amountCents: 1_000,
    }));
    const closes = monthClosesFromLines(lines, "2026-08-16", 6);
    expect(closes).toHaveLength(6);
    expect(closes[0]?.periodStart).toBe("2026-08-01");
    expect(closes.at(-1)?.periodStart).toBe("2026-03-01");
  });
});

describe("monthAgainstLast", () => {
  it("stays quiet with only one month", () => {
    expect(monthAgainstLast({ savingsCents: 10 }, null)).toBeNull();
  });

  it("names a stronger keep without a score", () => {
    expect(monthAgainstLast({ savingsCents: 50 }, { savingsCents: 10 })).toBe("You kept more than last month.");
  });

  it("allows a smaller keep", () => {
    expect(monthAgainstLast({ savingsCents: 10 }, { savingsCents: 50 })).toBe(
      "You kept less than last month. That’s allowed.",
    );
  });

  it("treats a flip from kept to not as a different month", () => {
    expect(monthAgainstLast({ savingsCents: -20 }, { savingsCents: 40 })).toBe(
      "This month went a little differently than last.",
    );
  });

  it("says less went out when the hole got smaller", () => {
    expect(monthAgainstLast({ savingsCents: -10 }, { savingsCents: -40 })).toBe("Less went out than last month.");
  });

  it("says the keep was about the same", () => {
    expect(monthAgainstLast({ savingsCents: 25 }, { savingsCents: 25 })).toBe(
      "You kept about the same as last month.",
    );
  });
});

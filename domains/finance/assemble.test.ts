import { describe, expect, it } from "vitest";
import { assembleMoneyPicture } from "./assemble";

describe("assembleMoneyPicture", () => {
  it("ignores later months when assembling a past as-of date", () => {
    const picture = assembleMoneyPicture({
      asOf: "2026-06-30",
      accounts: [
        { id: "bank", name: "Maybank", kind: "bank", statedBalanceCents: 100_000, isPrimary: true },
      ],
      transactions: [
        {
          id: "jun",
          accountId: "bank",
          type: "income",
          name: "Pay",
          amountCents: 50_000,
          occurredOn: "2026-06-01",
          category: "pay",
        },
        {
          id: "jul",
          accountId: "bank",
          type: "income",
          name: "Pay",
          amountCents: 50_000,
          occurredOn: "2026-07-01",
          category: "pay",
        },
      ],
      assets: [],
      liabilities: [],
      goal: null,
    });

    expect(picture.cashflow.incomeCents).toBe(50_000);
    expect(picture.accounts[0]?.currentCents).toBe(150_000);
    expect(picture.transactions).toHaveLength(1);
    expect(picture.facts.lastSavingsCents).toBeNull();
  });

  it("remembers last month’s keep from dated lines", () => {
    const picture = assembleMoneyPicture({
      asOf: "2026-07-31",
      accounts: [
        { id: "bank", name: "Maybank", kind: "bank", statedBalanceCents: 100_000, isPrimary: true },
      ],
      transactions: [
        {
          id: "jun-in",
          accountId: "bank",
          type: "income",
          name: "Pay",
          amountCents: 100_000,
          occurredOn: "2026-06-01",
          category: "pay",
        },
        {
          id: "jun-out",
          accountId: "bank",
          type: "expense",
          name: "Rent",
          amountCents: 40_000,
          occurredOn: "2026-06-02",
          category: "rent",
        },
        {
          id: "jul-in",
          accountId: "bank",
          type: "income",
          name: "Pay",
          amountCents: 100_000,
          occurredOn: "2026-07-01",
          category: "pay",
        },
        {
          id: "jul-out",
          accountId: "bank",
          type: "expense",
          name: "Flights",
          amountCents: 120_000,
          occurredOn: "2026-07-09",
          category: "travel",
        },
      ],
      assets: [],
      liabilities: [],
      goal: null,
    });

    expect(picture.cashflow.savingsCents).toBe(-20_000);
    expect(picture.facts.lastSavingsCents).toBe(60_000);
    expect(picture.facts.lastIncomeCents).toBe(100_000);
    expect(picture.facts.lastMonthStart).toBe("2026-06-01");
  });
});

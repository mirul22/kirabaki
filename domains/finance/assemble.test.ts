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
  });
});

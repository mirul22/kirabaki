import { periodCashflow, type PeriodCashflow } from "./cashflow";
import { monthRange, type IsoDate } from "./period";

export type MonthCloseLine = {
  occurredOn: IsoDate;
  type: "income" | "expense";
  amountCents: number;
};

export type MonthClose = PeriodCashflow & {
  periodStart: IsoDate;
};

export function monthClosesFromLines(
  lines: readonly MonthCloseLine[],
  asOf: IsoDate,
  limit = 6,
): MonthClose[] {
  const currentStart = monthRange(asOf).start;
  const starts = new Set<IsoDate>([currentStart]);
  for (const line of lines) {
    if (line.occurredOn > asOf) {
      continue;
    }
    starts.add(monthRange(line.occurredOn).start);
  }

  return [...starts]
    .sort((left, right) => (left < right ? 1 : left > right ? -1 : 0))
    .slice(0, Math.max(limit, 1))
    .map((periodStart) => {
      const { start, end } = monthRange(periodStart);
      let incomeCents = 0;
      let expenseCents = 0;
      for (const line of lines) {
        if (line.occurredOn < start || line.occurredOn > end || line.occurredOn > asOf) {
          continue;
        }
        if (line.type === "income") {
          incomeCents += line.amountCents;
        } else {
          expenseCents += line.amountCents;
        }
      }
      return { periodStart, ...periodCashflow({ incomeCents, expenseCents }) };
    });
}

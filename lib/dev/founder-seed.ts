import { majorToCents, monthRange } from "@/lib/money";

export const FOUNDER_SEED_EMAIL = "amirulikmal.biz@gmail.com";
export const SEED_MARK = "kirabaki.seed";

export type SeedPlace = { id: string; name: string; kind: string };

export type SeedLine = {
  accountId: string;
  type: "income" | "expense";
  name: string;
  amountCents: number;
  occurredOn: string;
};

export function clampDayInMonth(asOf: string, day: number): string {
  const { start, end } = monthRange(asOf);
  const last = Number(end.slice(8));
  const safe = Math.min(Math.max(Math.trunc(day), 1), last);
  const iso = `${start.slice(0, 8)}${String(safe).padStart(2, "0")}`;
  return iso > asOf ? asOf : iso;
}

function bucket(place: SeedPlace): "bank" | "ewallet" | "cash" | "investment" | "other" {
  const name = place.name.toLowerCase();
  if (/(gx|tng|touch|grab|boost|shopee|wallet)/.test(name) || place.kind === "ewallet") {
    return "ewallet";
  }
  if (/(hand|cash|pocket|dompet)/.test(name) || place.kind === "cash") {
    return "cash";
  }
  if (place.kind === "investment" || /(asb|unit trust)/.test(name)) {
    return "investment";
  }
  if (place.kind === "bank" || /(maybank|cimb|rhb|hong leong|bank)/.test(name)) {
    return "bank";
  }
  return "other";
}

const PACKS: Record<
  "bank" | "ewallet" | "cash" | "investment",
  { statedMajor: number; lines: { day: number; type: "income" | "expense"; name: string; major: number }[] }
> = {
  bank: {
    statedMajor: 4200,
    lines: [
      { day: 1, type: "income", name: "Pay", major: 6200 },
      { day: 2, type: "expense", name: "Rent", major: 1800 },
      { day: 8, type: "expense", name: "Groceries", major: 420 },
    ],
  },
  ewallet: {
    statedMajor: 150,
    lines: [
      { day: 5, type: "income", name: "Top up", major: 200 },
      { day: 6, type: "expense", name: "Food", major: 48 },
      { day: 12, type: "expense", name: "Ride", major: 18 },
    ],
  },
  cash: {
    statedMajor: 80,
    lines: [
      { day: 10, type: "expense", name: "Parking", major: 12 },
    ],
  },
  investment: {
    statedMajor: 5000,
    lines: [{ day: 3, type: "income", name: "Dividend", major: 40 }],
  },
};

export function planFounderSeed(places: SeedPlace[], asOf: string) {
  const used = new Set<string>();
  const balances: { accountId: string; statedBalanceCents: number }[] = [];
  const lines: SeedLine[] = [];

  for (const place of places) {
    const kind = bucket(place);
    const packKey = kind !== "other" && !used.has(kind) ? kind : null;
    if (packKey) {
      used.add(packKey);
      const pack = PACKS[packKey];
      balances.push({ accountId: place.id, statedBalanceCents: majorToCents(pack.statedMajor) });
      for (const line of pack.lines) {
        lines.push({
          accountId: place.id,
          type: line.type,
          name: line.name,
          amountCents: majorToCents(line.major),
          occurredOn: clampDayInMonth(asOf, line.day),
        });
      }
      continue;
    }

    balances.push({ accountId: place.id, statedBalanceCents: majorToCents(50) });
    lines.push(
      {
        accountId: place.id,
        type: "income",
        name: `In · ${place.name}`,
        amountCents: majorToCents(80),
        occurredOn: clampDayInMonth(asOf, 4),
      },
      {
        accountId: place.id,
        type: "expense",
        name: `Out · ${place.name}`,
        amountCents: majorToCents(20),
        occurredOn: clampDayInMonth(asOf, 9),
      },
    );
  }

  return {
    balances,
    lines,
    goal: {
      name: "A six-month buffer",
      targetAmountCents: majorToCents(12_000),
      targetDate: `${Number(asOf.slice(0, 4)) + 1}-08-01`,
      monthlyContributionCents: majorToCents(500),
      progressFrom: "cash" as const,
    },
    focus: "A quiet buffer. Six months of rent.",
    asset: { name: "EPF", amountCents: majorToCents(18_000) },
    liability: { name: "PTPTN", amountCents: majorToCents(9_400) },
  };
}

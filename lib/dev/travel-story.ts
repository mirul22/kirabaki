import { addMonths, majorToCents, monthRange, periodCashflow, type IsoDate } from "@/lib/money";

export const TEST_SEED_EMAIL = "hafiz.kirabaki@gmail.com";
export const TEST_SEED_NAME = "Hafiz";
export const TEST_SEED_PASSWORD = "KirabakiTest1";
export const TEST_SEED_MARK = "kirabaki.story";

export type StoryPlaceKey = "bank" | "ewallet" | "cash";

export const STORY_PLACES: {
  key: StoryPlaceKey;
  name: string;
  kind: "bank" | "ewallet" | "cash";
  openingMajor: number;
  primary?: boolean;
}[] = [
  { key: "bank", name: "Maybank", kind: "bank", openingMajor: 4_820, primary: true },
  { key: "ewallet", name: "GX", kind: "ewallet", openingMajor: 1_860 },
  { key: "cash", name: "In Hand", kind: "cash", openingMajor: 180 },
];

export const STORY_ASSETS = [
  { name: "EPF", amountMajor: 42_600 },
  { name: "ASB", amountMajor: 6_200 },
  { name: "Honda City", amountMajor: 38_000 },
] as const;

export const STORY_LIABILITIES = [
  { name: "Car loan", amountMajor: 26_900 },
  { name: "Credit card", amountMajor: 3_450 },
  { name: "PTPTN", amountMajor: 8_400 },
] as const;

type Draft = {
  monthsAgo: 0 | 1 | 2 | 3;
  day: number;
  place: StoryPlaceKey;
  type: "income" | "expense";
  name: string;
  major: number;
  category: string;
};

function food(monthsAgo: 0 | 1 | 2 | 3, day: number, major: number, ride = false): Draft {
  return {
    monthsAgo,
    day,
    place: "ewallet",
    type: "expense",
    name: ride ? "Ride" : "Food",
    major,
    category: ride ? "ride" : "food",
  };
}

const DRAFTS: Draft[] = [
  // May — quieter. Sent money home. In and out evened out.
  { monthsAgo: 3, day: 1, place: "bank", type: "income", name: "Pay", major: 10_000, category: "pay" },
  { monthsAgo: 3, day: 2, place: "bank", type: "expense", name: "Rent", major: 1_800, category: "rent" },
  { monthsAgo: 3, day: 2, place: "bank", type: "expense", name: "House maintenance", major: 200, category: "rent" },
  { monthsAgo: 3, day: 3, place: "bank", type: "expense", name: "Car loan", major: 1_000, category: "car" },
  { monthsAgo: 3, day: 4, place: "bank", type: "expense", name: "Credit card", major: 580, category: "card" },
  { monthsAgo: 3, day: 5, place: "bank", type: "expense", name: "TNB", major: 148, category: "bills" },
  { monthsAgo: 3, day: 6, place: "bank", type: "expense", name: "Unifi", major: 129, category: "bills" },
  { monthsAgo: 3, day: 7, place: "bank", type: "expense", name: "Phone", major: 88, category: "bills" },
  { monthsAgo: 3, day: 8, place: "bank", type: "expense", name: "Groceries", major: 198, category: "groceries" },
  { monthsAgo: 3, day: 11, place: "bank", type: "expense", name: "Petrol", major: 88, category: "car" },
  { monthsAgo: 3, day: 14, place: "bank", type: "expense", name: "Groceries", major: 176, category: "groceries" },
  { monthsAgo: 3, day: 18, place: "bank", type: "expense", name: "Medical insurance", major: 160, category: "bills" },
  { monthsAgo: 3, day: 21, place: "bank", type: "expense", name: "Clinic", major: 92, category: "bills" },
  { monthsAgo: 3, day: 22, place: "bank", type: "expense", name: "Petrol", major: 76, category: "car" },
  { monthsAgo: 3, day: 25, place: "bank", type: "expense", name: "Family", major: 4_800, category: "family" },
  { monthsAgo: 3, day: 27, place: "bank", type: "expense", name: "Shopee", major: 88, category: "other" },
  { monthsAgo: 3, day: 28, place: "ewallet", type: "expense", name: "TNG", major: 40, category: "car" },
  food(3, 3, 22),
  food(3, 5, 18),
  food(3, 6, 12, true),
  food(3, 8, 28),
  food(3, 10, 16),
  food(3, 12, 31),
  food(3, 15, 19),
  food(3, 17, 24),
  food(3, 19, 14, true),
  food(3, 22, 27),
  food(3, 24, 21),
  food(3, 27, 33),
  food(3, 29, 18),
  { monthsAgo: 3, day: 8, place: "cash", type: "expense", name: "Parking", major: 6, category: "car" },
  { monthsAgo: 3, day: 16, place: "cash", type: "expense", name: "Drinks", major: 12, category: "food" },
  { monthsAgo: 3, day: 23, place: "cash", type: "expense", name: "Pasar", major: 28, category: "groceries" },
  { monthsAgo: 3, day: 26, place: "cash", type: "expense", name: "Parking", major: 8, category: "car" },

  // June — a normal month, some of it stayed. Weekend work too.
  { monthsAgo: 2, day: 1, place: "bank", type: "income", name: "Pay", major: 10_000, category: "pay" },
  { monthsAgo: 2, day: 16, place: "bank", type: "income", name: "Weekend work", major: 850, category: "pay" },
  { monthsAgo: 2, day: 2, place: "bank", type: "expense", name: "Rent", major: 1_800, category: "rent" },
  { monthsAgo: 2, day: 2, place: "bank", type: "expense", name: "House maintenance", major: 200, category: "rent" },
  { monthsAgo: 2, day: 3, place: "bank", type: "expense", name: "Car loan", major: 1_000, category: "car" },
  { monthsAgo: 2, day: 4, place: "bank", type: "expense", name: "Credit card", major: 620, category: "card" },
  { monthsAgo: 2, day: 5, place: "bank", type: "expense", name: "TNB", major: 178, category: "bills" },
  { monthsAgo: 2, day: 6, place: "bank", type: "expense", name: "Unifi", major: 129, category: "bills" },
  { monthsAgo: 2, day: 7, place: "bank", type: "expense", name: "Phone", major: 88, category: "bills" },
  { monthsAgo: 2, day: 8, place: "bank", type: "expense", name: "Groceries", major: 214, category: "groceries" },
  { monthsAgo: 2, day: 11, place: "bank", type: "expense", name: "Petrol", major: 95, category: "car" },
  { monthsAgo: 2, day: 14, place: "bank", type: "expense", name: "Groceries", major: 186, category: "groceries" },
  { monthsAgo: 2, day: 18, place: "bank", type: "expense", name: "Medical insurance", major: 160, category: "bills" },
  { monthsAgo: 2, day: 22, place: "bank", type: "expense", name: "Petrol", major: 88, category: "car" },
  { monthsAgo: 2, day: 21, place: "bank", type: "expense", name: "Clinic", major: 85, category: "bills" },
  { monthsAgo: 2, day: 27, place: "bank", type: "expense", name: "Shopee", major: 67, category: "other" },
  food(2, 3, 24),
  food(2, 5, 18),
  food(2, 6, 14, true),
  food(2, 7, 32),
  food(2, 9, 28),
  food(2, 10, 19, true),
  food(2, 12, 41),
  food(2, 15, 22),
  food(2, 17, 36),
  food(2, 19, 16, true),
  food(2, 21, 29),
  food(2, 24, 45),
  food(2, 26, 19),
  food(2, 28, 33),
  { monthsAgo: 2, day: 8, place: "cash", type: "expense", name: "Parking", major: 6, category: "car" },
  { monthsAgo: 2, day: 16, place: "cash", type: "expense", name: "Drinks", major: 12, category: "food" },
  { monthsAgo: 2, day: 23, place: "cash", type: "expense", name: "Pasar", major: 35, category: "groceries" },

  // July — booked the trip. The month went out.
  { monthsAgo: 1, day: 1, place: "bank", type: "income", name: "Pay", major: 10_000, category: "pay" },
  { monthsAgo: 1, day: 2, place: "bank", type: "expense", name: "Rent", major: 1_800, category: "rent" },
  { monthsAgo: 1, day: 2, place: "bank", type: "expense", name: "House maintenance", major: 200, category: "rent" },
  { monthsAgo: 1, day: 3, place: "bank", type: "expense", name: "Car loan", major: 1_000, category: "car" },
  { monthsAgo: 1, day: 4, place: "bank", type: "expense", name: "Credit card", major: 540, category: "card" },
  { monthsAgo: 1, day: 5, place: "bank", type: "expense", name: "TNB", major: 191, category: "bills" },
  { monthsAgo: 1, day: 6, place: "bank", type: "expense", name: "Unifi", major: 129, category: "bills" },
  { monthsAgo: 1, day: 7, place: "bank", type: "expense", name: "Phone", major: 88, category: "bills" },
  { monthsAgo: 1, day: 8, place: "bank", type: "expense", name: "Groceries", major: 198, category: "groceries" },
  { monthsAgo: 1, day: 9, place: "bank", type: "expense", name: "Flights to Japan", major: 2_880, category: "travel" },
  { monthsAgo: 1, day: 10, place: "bank", type: "expense", name: "Hotel deposit", major: 650, category: "travel" },
  { monthsAgo: 1, day: 11, place: "bank", type: "expense", name: "Travel insurance", major: 89, category: "travel" },
  { monthsAgo: 1, day: 12, place: "bank", type: "expense", name: "Luggage", major: 159, category: "travel" },
  { monthsAgo: 1, day: 14, place: "bank", type: "expense", name: "Petrol", major: 102, category: "car" },
  { monthsAgo: 1, day: 16, place: "bank", type: "expense", name: "Clothes for the trip", major: 389, category: "travel" },
  { monthsAgo: 1, day: 18, place: "bank", type: "expense", name: "Medical insurance", major: 160, category: "bills" },
  { monthsAgo: 1, day: 19, place: "bank", type: "expense", name: "Family dinner", major: 420, category: "food" },
  { monthsAgo: 1, day: 21, place: "bank", type: "expense", name: "Petrol", major: 76, category: "car" },
  { monthsAgo: 1, day: 22, place: "bank", type: "expense", name: "Shopee", major: 214, category: "other" },
  { monthsAgo: 1, day: 24, place: "bank", type: "expense", name: "Japan guidebook", major: 42, category: "travel" },
  { monthsAgo: 1, day: 27, place: "bank", type: "expense", name: "Groceries", major: 221, category: "groceries" },
  { monthsAgo: 1, day: 30, place: "bank", type: "expense", name: "Luggage bits", major: 156, category: "travel" },
  food(1, 3, 27),
  food(1, 4, 31),
  food(1, 6, 15, true),
  food(1, 8, 44),
  food(1, 9, 38),
  food(1, 11, 21, true),
  food(1, 13, 29),
  food(1, 16, 48),
  food(1, 18, 22),
  food(1, 20, 18, true),
  food(1, 22, 36),
  food(1, 25, 41),
  food(1, 27, 19),
  food(1, 29, 33),
  { monthsAgo: 1, day: 7, place: "cash", type: "expense", name: "Parking", major: 8, category: "car" },
  { monthsAgo: 1, day: 15, place: "cash", type: "expense", name: "Kopitiam", major: 18, category: "food" },
  { monthsAgo: 1, day: 26, place: "cash", type: "expense", name: "Parking", major: 6, category: "car" },

  // This month — pay in, the usual out, still going.
  { monthsAgo: 0, day: 1, place: "bank", type: "income", name: "Pay", major: 10_000, category: "pay" },
  { monthsAgo: 0, day: 2, place: "bank", type: "expense", name: "Rent", major: 1_800, category: "rent" },
  { monthsAgo: 0, day: 2, place: "bank", type: "expense", name: "House maintenance", major: 200, category: "rent" },
  { monthsAgo: 0, day: 3, place: "bank", type: "expense", name: "Car loan", major: 1_000, category: "car" },
  { monthsAgo: 0, day: 4, place: "bank", type: "expense", name: "Credit card", major: 410, category: "card" },
  { monthsAgo: 0, day: 5, place: "bank", type: "expense", name: "TNB", major: 172, category: "bills" },
  { monthsAgo: 0, day: 6, place: "bank", type: "expense", name: "Unifi", major: 129, category: "bills" },
  { monthsAgo: 0, day: 7, place: "bank", type: "expense", name: "Phone", major: 88, category: "bills" },
  { monthsAgo: 0, day: 8, place: "bank", type: "expense", name: "Groceries", major: 205, category: "groceries" },
  { monthsAgo: 0, day: 9, place: "bank", type: "expense", name: "Yen", major: 500, category: "travel" },
  { monthsAgo: 0, day: 11, place: "bank", type: "expense", name: "Petrol", major: 90, category: "car" },
  { monthsAgo: 0, day: 13, place: "bank", type: "expense", name: "Groceries", major: 88, category: "groceries" },
  food(0, 2, 21),
  food(0, 3, 34),
  food(0, 5, 16, true),
  food(0, 7, 28),
  food(0, 8, 19),
  food(0, 10, 42),
  food(0, 12, 15, true),
  food(0, 14, 31),
  food(0, 15, 24),
  { monthsAgo: 0, day: 4, place: "ewallet", type: "expense", name: "TNG", major: 50, category: "car" },
  { monthsAgo: 0, day: 6, place: "cash", type: "expense", name: "Parking", major: 7, category: "car" },
  { monthsAgo: 0, day: 12, place: "cash", type: "expense", name: "Drinks", major: 14, category: "food" },
];

export function storyMonthStarts(asOf: IsoDate): [IsoDate, IsoDate, IsoDate, IsoDate] {
  const current = monthRange(asOf).start;
  return [addMonths(current, -3), addMonths(current, -2), addMonths(current, -1), current];
}

export function dateInMonth(monthStart: IsoDate, day: number, latest: IsoDate): IsoDate | null {
  const { start, end } = monthRange(monthStart);
  const last = Number(end.slice(8));
  const safe = Math.min(Math.max(Math.trunc(day), 1), last);
  const iso = `${start.slice(0, 8)}${String(safe).padStart(2, "0")}`;
  if (iso > latest) {
    return null;
  }
  return iso;
}

export type StoryLine = {
  place: StoryPlaceKey;
  type: "income" | "expense";
  name: string;
  amountCents: number;
  occurredOn: IsoDate;
  category: string;
};

export function planTravelStory(asOf: IsoDate) {
  const months = storyMonthStarts(asOf);
  const lines: StoryLine[] = [];

  for (const draft of DRAFTS) {
    const monthStart = months[3 - draft.monthsAgo];
    const occurredOn = dateInMonth(monthStart, draft.day, asOf);
    if (!occurredOn) {
      continue;
    }
    lines.push({
      place: draft.place,
      type: draft.type,
      name: draft.name,
      amountCents: majorToCents(draft.major),
      occurredOn,
      category: draft.category,
    });
  }

  const [year] = asOf.split("-").map(Number);

  return {
    places: STORY_PLACES.map((row) => ({
      key: row.key,
      name: row.name,
      kind: row.kind,
      statedBalanceCents: majorToCents(row.openingMajor),
      primary: Boolean(row.primary),
    })),
    lines,
    assets: STORY_ASSETS.map((row) => ({
      name: row.name,
      amountCents: majorToCents(row.amountMajor),
    })),
    liabilities: STORY_LIABILITIES.map((row) => ({
      name: row.name,
      amountCents: majorToCents(row.amountMajor),
    })),
    goal: {
      name: "Japan in December",
      targetAmountCents: majorToCents(15_000),
      targetDate: `${year}-12-15`,
      monthlyContributionCents: majorToCents(800),
      progressFrom: "cash" as const,
    },
    focus: "A trip to Japan this December.",
    months,
  };
}

export function monthCashflowFromLines(lines: readonly StoryLine[], monthStart: IsoDate) {
  const { start, end } = monthRange(monthStart);
  const inMonth = lines.filter((row) => row.occurredOn >= start && row.occurredOn <= end);
  const incomeCents = inMonth
    .filter((row) => row.type === "income")
    .reduce((sum, row) => sum + row.amountCents, 0);
  const expenseCents = inMonth
    .filter((row) => row.type === "expense")
    .reduce((sum, row) => sum + row.amountCents, 0);
  return periodCashflow({ incomeCents, expenseCents });
}

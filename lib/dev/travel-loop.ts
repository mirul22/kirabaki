import { dateInMonth, monthCashflowFromLines, planTravelStory } from "@/lib/dev/travel-story";
import { fillTemplate, formatMoney, type IsoDate } from "@/lib/money";
import { RULES, type SeedRule } from "@/domains/knowledge/catalog";

export type StoryLoopItem = {
  key: SeedRule["key"];
  status: "completed" | "later" | "dismissed";
  decision: "accepted" | "later" | "not_relevant";
  note: string | null;
  at: IsoDate;
  happening: string;
  why: string;
  ifNothing: string;
  nextAction: string;
};

export function planTravelLoop(asOf: IsoDate): StoryLoopItem[] {
  const plan = planTravelStory(asOf);
  const [may, june, july] = plan.months;
  const julyFlow = monthCashflowFromLines(plan.lines, july);
  const tokens = {
    income: formatMoney(julyFlow.incomeCents, "MYR"),
    expenses: formatMoney(julyFlow.expenseCents, "MYR"),
    emergency_fund_months: "1.2",
    months_behind: "5",
  };

  function copy(key: SeedRule["key"]) {
    const rule = RULES.find((row) => row.key === key);
    if (!rule) {
      throw new Error(`Missing rule ${key}`);
    }
    return {
      happening: fillTemplate(rule.happening, tokens),
      why: fillTemplate(rule.why, tokens),
      ifNothing: fillTemplate(rule.ifNothing, tokens),
      nextAction: fillTemplate(rule.nextAction, tokens),
    };
  }

  const mayHome = dateInMonth(may, 26, asOf);
  const juneStart = dateInMonth(june, 2, asOf);
  const junePay = dateInMonth(june, 3, asOf);
  const junePass = dateInMonth(june, 25, asOf);
  const julySlip = dateInMonth(july, 12, asOf);
  const julyTrip = dateInMonth(july, 28, asOf);
  if (!mayHome || !juneStart || !junePay || !junePass || !julySlip || !julyTrip) {
    throw new Error("Travel loop dates fell outside the as-of window.");
  }

  return [
    {
      key: "empty_month",
      status: "completed",
      decision: "accepted",
      note: "Sent May money home. The month evened out.",
      at: mayHome,
      ...copy("empty_month"),
    },
    {
      key: "missing_picture",
      status: "completed",
      decision: "accepted",
      note: "Added Maybank, GX, and cash.",
      at: juneStart,
      ...copy("missing_picture"),
    },
    {
      key: "empty_month",
      status: "completed",
      decision: "accepted",
      note: "Put June pay in.",
      at: junePay,
      ...copy("empty_month"),
    },
    {
      key: "quiet_good",
      status: "dismissed",
      decision: "not_relevant",
      note: "Not the thing I needed that week.",
      at: junePass,
      ...copy("quiet_good"),
    },
    {
      key: "goal_slipping",
      status: "later",
      decision: "later",
      note: null,
      at: julySlip,
      ...copy("goal_slipping"),
    },
    {
      key: "nothing_stayed",
      status: "completed",
      decision: "accepted",
      note: "Booked the Japan flights. The month went out.",
      at: julyTrip,
      ...copy("nothing_stayed"),
    },
  ];
}

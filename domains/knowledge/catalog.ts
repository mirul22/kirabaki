import type { PredicateKey } from "@/lib/money";

export const KNOWLEDGE_SOURCES = [
  {
    id: "src_housel",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    kind: "book" as const,
    tier: "book" as const,
    year: 2020,
  },
  {
    id: "src_stanley",
    title: "The Millionaire Next Door",
    author: "Thomas J. Stanley and William D. Danko",
    kind: "book" as const,
    tier: "book" as const,
    year: 1996,
  },
  {
    id: "src_collins",
    title: "The Simple Path to Wealth",
    author: "J.L. Collins",
    kind: "book" as const,
    tier: "book" as const,
    year: 2016,
  },
  {
    id: "src_robin",
    title: "Your Money or Your Life",
    author: "Vicki Robin and Joe Dominguez",
    kind: "book" as const,
    tier: "book" as const,
    year: 1992,
  },
  {
    id: "src_akpk",
    title: "Financial education on emergency savings",
    author: "Agensi Kaunseling dan Pengurusan Kredit (AKPK)",
    kind: "regulator" as const,
    tier: "official" as const,
    year: 2020,
  },
  {
    id: "src_kclau",
    title: "Millionaire Roadmap",
    author: "KCLau",
    kind: "book" as const,
    tier: "educator" as const,
  },
] as const;

export const PRINCIPLES = [
  {
    id: "pr_room_for_error",
    sourceId: "src_housel",
    title: "Leave room for error",
    chapter: "Room for Error",
    summary: "A buffer is how a plan survives a month that goes differently.",
    explanation:
      "Housel’s point is not a score. Room for error is cash and slack so one surprise does not undo the path. Three months of spending is a start, not a grade.",
  },
  {
    id: "pr_wealth_unseen",
    sourceId: "src_housel",
    title: "Wealth is what you do not see",
    chapter: "Wealth is What You Don't See",
    summary: "The money that stayed is the wealth. The list can wait.",
    explanation:
      "Spent money is visible. Kept money is quiet. KIRABAKI looks at what stayed this month before it looks at the ledger.",
  },
  {
    id: "pr_save_money",
    sourceId: "src_housel",
    title: "The gap is the point",
    chapter: "Save Money",
    summary: "Savings is the gap between ego and income — a rate, not a vibe.",
    explanation:
      "Housel treats saving as a gap you can choose. The engine measures that gap. The copy does not shame the number.",
  },
  {
    id: "pr_never_enough",
    sourceId: "src_housel",
    title: "Enough is a decision",
    chapter: "Never Enough",
    summary: "A goal needs a finish line, or the pace never feels fine.",
    explanation:
      "Without enough, every target moves. A named goal with a date lets the engine say on track or off track — not a score.",
  },
  {
    id: "pr_stay_wealthy",
    sourceId: "src_housel",
    title: "Keep the buffer",
    chapter: "Getting Wealthy vs Staying Wealthy",
    summary: "A good month is not a reason to spend the cash you set aside.",
    explanation:
      "Getting there can be bold. Staying there is quieter. Do not spend the buffer just because this month felt fine. The cash you kept is the point.",
  },
  {
    id: "pr_compounding",
    sourceId: "src_housel",
    title: "Time does the heavy work",
    chapter: "Confounding Compounding",
    summary: "This pace is fine. Not a race.",
    explanation:
      "Small consistent gaps beat dramatic months. The projection uses the contribution you named — not a hope.",
  },
  {
    id: "pr_frugal",
    sourceId: "src_stanley",
    title: "Live below the surface",
    chapter: "Frugal, Frugal, Frugal",
    summary: "Wealth often looks ordinary. Spending less than you earn is the habit.",
    explanation:
      "Stanley and Danko found that many high-net-worth households were quietly frugal. The finding is about the gap, not a lifestyle lecture.",
  },
  {
    id: "pr_spend_less",
    sourceId: "src_collins",
    title: "Spend less than you earn",
    chapter: "A Simple Path",
    summary: "The path starts with a surplus. Everything else is a later conversation.",
    explanation:
      "Collins reduces the first move to a surplus. KIRABAKI will not invent investment advice from that. It will notice whether this month produced one.",
  },
  {
    id: "pr_enough_life",
    sourceId: "src_robin",
    title: "Name enough",
    chapter: "The concept of enough",
    summary: "Tracking is in service of enough, not of a perfect list.",
    explanation:
      "Robin and Dominguez treat money as life energy. The list can wait if you already know the sentence for the month.",
  },
  {
    id: "pr_emergency",
    sourceId: "src_akpk",
    title: "Keep a cash reserve",
    chapter: "Emergency savings guidance",
    summary: "AKPK asks households to keep a cash reserve for surprises — a buffer, not a score.",
    explanation:
      "Malaysian consumer education through AKPK treats an emergency fund as months of living costs set aside. KIRABAKI uses this month’s spending as the denominator when you have expenses recorded.",
  },
  {
    id: "pr_sir_saving",
    sourceId: "src_kclau",
    title: "Saving is a pillar",
    chapter: "Budget & Saving",
    summary: "What stays after earning is one lever of wealth, not the whole path.",
    explanation:
      "KCLau treats saving as one of three pillars. KIRABAKI measures the gap this month. A small gap is a fact, not a grade.",
  },
  {
    id: "pr_sir_income",
    sourceId: "src_kclau",
    title: "Income can still be the lever",
    chapter: "Raise Income",
    summary: "Cutting out has a floor. Earning can still move the path.",
    explanation:
      "When a gap already stays, another cut is often the wrong next move. KIRABAKI names earning power only from measured savings and income — not from a vibe.",
  },
  {
    id: "pr_roadmap_target",
    sourceId: "src_kclau",
    title: "Name the destination",
    chapter: "Plot Your Millionaire Roadmap",
    summary: "A roadmap needs where you are going and when.",
    explanation:
      "KCLau starts with a named target and a date. KIRABAKI already uses one goal. The pace comes from the contribution you named, not from a hoped-for return.",
  },
  {
    id: "pr_leakage",
    sourceId: "src_kclau",
    title: "Money needs a job",
    chapter: "Allocate Capital",
    summary: "Cash that has no job still leaves.",
    explanation:
      "KCLau treats allocation as giving money a job. KIRABAKI will not invent tax or investment figures. It notices whether a gap stayed this month.",
  },
] as const;

export type SeedRule = {
  id: string;
  key: PredicateKey;
  name: string;
  versionId: string;
  priority: number;
  principleId: string;
  happening: string;
  why: string;
  ifNothing: string;
  nextAction: string;
};

export const RULES: SeedRule[] = [
  {
    id: "rule_missing_picture",
    key: "missing_picture",
    name: "Add a bank or wallet",
    versionId: "rv_missing_picture_1",
    priority: 10,
    principleId: "pr_enough_life",
    happening: "Just one place your money sits. You can add more later.",
    why: "A next move needs a place the money sits.",
    ifNothing: "The month stays quiet.",
    nextAction: "Add it",
  },
  {
    id: "rule_empty_month",
    key: "empty_month",
    name: "Add one thing from this month",
    versionId: "rv_empty_month_1",
    priority: 15,
    principleId: "pr_enough_life",
    happening: "Pay that came in, or money that went out. One line is enough.",
    why: "A month needs one real line before KIRABAKI can say what stayed.",
    ifNothing: "The month stays quiet.",
    nextAction: "Add it",
  },
  {
    id: "rule_thin_buffer",
    key: "thin_buffer",
    name: "A buffer, not a score",
    versionId: "rv_thin_buffer_1",
    priority: 20,
    principleId: "pr_room_for_error",
    happening: "Cash covers {emergency_fund_months} months of this month’s spending.",
    why: "Room for error is how a plan survives a month that goes differently.",
    ifNothing: "The next surprise has less slack.",
    nextAction: "Take a look",
  },
  {
    id: "rule_nothing_stayed",
    key: "nothing_stayed",
    name: "Nothing stayed",
    versionId: "rv_nothing_stayed_1",
    priority: 30,
    principleId: "pr_wealth_unseen",
    happening: "{income} in. {expenses} out. The gap is gone this month.",
    why: "Wealth is what you do not see.",
    ifNothing: "The month can repeat.",
    nextAction: "Take a look",
  },
  {
    id: "rule_out_after_kept",
    key: "out_after_kept",
    name: "This month went a little differently",
    versionId: "rv_out_after_kept_1",
    priority: 25,
    principleId: "pr_wealth_unseen",
    happening: "{last_month} some of it stayed. This month {income} in, {expenses} out.",
    why: "Wealth is what you do not see.",
    ifNothing: "The month can repeat.",
    nextAction: "Take a look",
  },
  {
    id: "rule_goal_slipping",
    key: "goal_slipping",
    name: "The date can move",
    versionId: "rv_goal_slipping_1",
    priority: 40,
    principleId: "pr_compounding",
    happening: "At this pace you’re about {months_behind} months behind the date you named. Not a race.",
    why: "Change the date or the monthly amount — or keep this pace.",
    ifNothing: "The date stays.",
    nextAction: "Look at the pace",
  },
  {
    id: "rule_kept_after_out",
    key: "kept_after_out",
    name: "Hold what stayed",
    versionId: "rv_kept_after_out_1",
    priority: 50,
    principleId: "pr_stay_wealthy",
    happening: "{last_month} nothing stayed. This month some of it did.",
    why: "A good month is not a reason to spend the cash you set aside.",
    ifNothing: "The cash you kept can still go.",
    nextAction: "See the picture",
  },
  {
    id: "rule_saving_bottleneck",
    key: "saving_bottleneck",
    name: "The gap is still small",
    versionId: "rv_saving_bottleneck_1",
    priority: 55,
    principleId: "pr_sir_saving",
    happening: "You kept {savings_rate} of {income}. Some of it stayed.",
    why: "Saving is a pillar. The gap can still grow.",
    ifNothing: "The month can repeat at this gap.",
    nextAction: "See the picture",
  },
  {
    id: "rule_income_bottleneck",
    key: "income_bottleneck",
    name: "Earning power is the next lever",
    versionId: "rv_income_bottleneck_1",
    priority: 70,
    principleId: "pr_sir_income",
    happening: "You kept {savings_rate} of {income}. Pay did not rise versus {last_month}.",
    why: "When a gap already stays, another cut is often the wrong next move.",
    ifNothing: "The path stays at this earning pace.",
    nextAction: "See the picture",
  },
  {
    id: "rule_quiet_good",
    key: "quiet_good",
    name: "You’re okay",
    versionId: "rv_quiet_good_1",
    priority: 90,
    principleId: "pr_stay_wealthy",
    happening: "You kept money this month. Cash covers {emergency_fund_months} months of spending. Nothing to fix.",
    why: "Getting stronger is allowed to be quiet.",
    ifNothing: "Nothing bad. That is the point.",
    nextAction: "Okay",
  },
];

import type { Cents } from "./cents";
import { addMonths, monthsBetween, type IsoDate } from "./period";

export type GoalProjectionInput = {
  currentCents: Cents;
  targetCents: Cents;
  monthlyContributionCents: Cents;
  targetDate: IsoDate;
  asOf: IsoDate;
};

export type GoalProjection = {
  calculation: "goal_projection";
  currentCents: Cents;
  targetCents: Cents;
  remainingCents: Cents;
  monthlyContributionCents: Cents;
  monthsAvailable: number;
  monthsNeeded: number | null;
  onTrack: boolean | null;
  monthsBehind: number | null;
  projectedDate: IsoDate | null;
  reached: boolean;
};

export function goalProjection(input: GoalProjectionInput): GoalProjection {
  const remainingCents = Math.max(0, input.targetCents - input.currentCents);
  const reached = input.currentCents >= input.targetCents;
  const monthsAvailable = Math.max(0, monthsBetween(input.asOf, input.targetDate));

  if (reached) {
    return {
      calculation: "goal_projection",
      currentCents: input.currentCents,
      targetCents: input.targetCents,
      remainingCents: 0,
      monthlyContributionCents: input.monthlyContributionCents,
      monthsAvailable,
      monthsNeeded: 0,
      onTrack: true,
      monthsBehind: 0,
      projectedDate: input.asOf,
      reached: true,
    };
  }

  if (input.monthlyContributionCents <= 0) {
    return {
      calculation: "goal_projection",
      currentCents: input.currentCents,
      targetCents: input.targetCents,
      remainingCents,
      monthlyContributionCents: input.monthlyContributionCents,
      monthsAvailable,
      monthsNeeded: null,
      onTrack: null,
      monthsBehind: null,
      projectedDate: null,
      reached: false,
    };
  }

  const monthsNeeded = Math.ceil(remainingCents / input.monthlyContributionCents);
  const onTrack = monthsNeeded <= monthsAvailable;
  const monthsBehind = onTrack ? 0 : monthsNeeded - monthsAvailable;

  return {
    calculation: "goal_projection",
    currentCents: input.currentCents,
    targetCents: input.targetCents,
    remainingCents,
    monthlyContributionCents: input.monthlyContributionCents,
    monthsAvailable,
    monthsNeeded,
    onTrack,
    monthsBehind,
    projectedDate: addMonths(input.asOf, monthsNeeded),
    reached: false,
  };
}

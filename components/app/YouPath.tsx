"use client";

import { EditButton, EditScope, WhenEditing, WhenReading } from "@/components/app/EditScope";
import { GoalForm } from "@/components/app/GoalForm";
import { FocusForm } from "@/components/app/YouForms";
import { moneyClass } from "@/components/app/fields";
import { formatMoney } from "@/lib/money";

type PathProps = {
  currency: string;
  focus: string;
  goalName: string;
  targetCents: number;
  targetDate: string;
  contributionCents: number;
  progressFrom: "net_worth" | "cash";
  currentCents: number | null;
  onTrack: boolean | null;
};

export function YouPath(props: PathProps) {
  return (
    <EditScope>
      <PathInner {...props} />
    </EditScope>
  );
}

function PathInner(props: PathProps) {
  const hasGoal = props.goalName.length > 0;

  return (
    <section className="mt-12">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">The path</p>
        <EditButton label={hasGoal ? "Edit" : "Add"} />
      </div>

      <WhenReading>
        <div className="mt-5">
          {hasGoal ? (
            <>
              <p className="text-2xl font-extrabold tracking-tight">{props.goalName}</p>
              {props.currentCents !== null ? (
                <p className={`mt-3 text-base text-kb-muted ${moneyClass}`}>
                  {formatMoney(props.currentCents, props.currency)} of {formatMoney(props.targetCents, props.currency)}
                  {props.onTrack === false
                    ? " — behind the date you named."
                    : props.onTrack
                      ? " — on track."
                      : ""}
                </p>
              ) : null}
              {props.focus ? <p className="mt-3 text-base text-kb-muted">{props.focus}</p> : null}
            </>
          ) : (
            <p className="mt-3 text-base text-kb-muted">
              Name one thing. A date. How much you’d put aside each month.
            </p>
          )}
        </div>
      </WhenReading>

      <WhenEditing>
        <div className="mt-8 space-y-10">
          <FocusForm defaultFocus={props.focus} />
          <GoalForm
            defaultName={props.goalName}
            defaultTargetCents={props.targetCents}
            defaultDate={props.targetDate}
            defaultContributionCents={props.contributionCents}
            defaultProgressFrom={props.progressFrom}
          />
        </div>
      </WhenEditing>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { saveGoalAction } from "@/app/(v2)/(app)/actions";
import { buttonClass, fieldClass } from "@/components/app/fields";
import { AmountField } from "@/components/app/AmountField";
import { formatCentsGrouped } from "@/lib/money";

type Props = {
  defaultName?: string;
  defaultTargetCents?: number;
  defaultDate?: string;
  defaultContributionCents?: number;
  defaultProgressFrom?: "net_worth" | "cash";
};

export function GoalForm({
  defaultName = "",
  defaultTargetCents = 0,
  defaultDate = "",
  defaultContributionCents = 0,
  defaultProgressFrom = "net_worth",
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(defaultName);
  const [target, setTarget] = useState(amountFromCents(defaultTargetCents));
  const [date, setDate] = useState(defaultDate);
  const [contribution, setContribution] = useState(amountFromCents(defaultContributionCents));
  const [progressFrom, setProgressFrom] = useState(defaultProgressFrom);
  const [savedName, setSavedName] = useState(defaultName);
  const [savedTarget, setSavedTarget] = useState(amountFromCents(defaultTargetCents));
  const [savedDate, setSavedDate] = useState(defaultDate);
  const [savedContribution, setSavedContribution] = useState(amountFromCents(defaultContributionCents));
  const [savedProgressFrom, setSavedProgressFrom] = useState(defaultProgressFrom);
  const dirty =
    name.trim() !== savedName.trim() ||
    target !== savedTarget ||
    date !== savedDate ||
    contribution !== savedContribution ||
    progressFrom !== savedProgressFrom;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    const result = await saveGoalAction(new FormData(event.currentTarget));
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSavedName(name);
    setSavedTarget(target);
    setSavedDate(date);
    setSavedContribution(contribution);
    setSavedProgressFrom(progressFrom);
    setSaved(true);
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <p className="text-sm font-semibold text-kb-seal">The target</p>
      <label className="block">
        <span className="text-sm text-kb-muted">What do you call it?</span>
        <input
          name="name"
          required
          maxLength={80}
          value={name}
          placeholder="Emergency fund, a buffer, a home"
          className={fieldClass}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
          }}
        />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">How much, in ringgit?</span>
        <AmountField
          name="targetAmount"
          required
          value={target}
          placeholder="15,000.00"
          onChange={(next) => {
            setTarget(next);
            setSaved(false);
          }}
        />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">By when?</span>
        <input
          name="targetDate"
          type="date"
          required
          value={date}
          className={fieldClass}
          onChange={(event) => {
            setDate(event.target.value);
            setSaved(false);
          }}
        />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">Each month, if you can</span>
        <AmountField
          name="monthlyContribution"
          required
          value={contribution}
          placeholder="800.00"
          onChange={(next) => {
            setContribution(next);
            setSaved(false);
          }}
        />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">Measure against</span>
        <select
          name="progressFrom"
          value={progressFrom}
          className={fieldClass}
          onChange={(event) => {
            setProgressFrom(event.target.value as "net_worth" | "cash");
            setSaved(false);
          }}
        >
          <option value="net_worth">Everything you have</option>
          <option value="cash">Cash only</option>
        </select>
      </label>
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      {saved && !dirty ? <p className="text-sm text-kb-muted">Saved. This pace is fine. Not a race.</p> : null}
      {dirty ? (
        <button type="submit" className={buttonClass}>
          Save this goal
        </button>
      ) : null}
    </form>
  );
}

function amountFromCents(cents: number): string {
  return cents ? formatCentsGrouped(cents) : "";
}

"use client";

import { useState, type FormEvent } from "react";
import { saveGoalAction } from "@/app/(v2)/(app)/actions";
import { buttonClass, fieldClass } from "@/components/app/fields";
import { centsToMajor } from "@/lib/money";

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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    const result = await saveGoalAction(new FormData(event.currentTarget));
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <p className="text-sm font-semibold text-kb-seal">The target</p>
      <label className="block">
        <span className="text-sm text-kb-muted">What do you call it?</span>
        <input name="name" required maxLength={80} defaultValue={defaultName} placeholder="Emergency fund, a buffer, a home" className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">How much, in ringgit?</span>
        <input
          name="targetAmount"
          required
          inputMode="decimal"
          defaultValue={defaultTargetCents ? String(centsToMajor(defaultTargetCents)) : ""}
          placeholder="12000"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">By when?</span>
        <input name="targetDate" type="date" required defaultValue={defaultDate} className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">Each month, if you can</span>
        <input
          name="monthlyContribution"
          required
          inputMode="decimal"
          defaultValue={defaultContributionCents ? String(centsToMajor(defaultContributionCents)) : ""}
          placeholder="500"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">Measure against</span>
        <select name="progressFrom" defaultValue={defaultProgressFrom} className={fieldClass}>
          <option value="net_worth">Everything you have</option>
          <option value="cash">Cash only</option>
        </select>
      </label>
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      {saved ? <p className="text-sm text-kb-muted">Saved. This pace is fine. Not a race.</p> : null}
      <button type="submit" className={buttonClass}>
        Save this goal
      </button>
    </form>
  );
}

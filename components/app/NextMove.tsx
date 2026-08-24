"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { decideAction, saveOutcomeAction } from "@/app/(v2)/(app)/actions";
import { buttonClass, fieldClass, moneyClass } from "@/components/app/fields";
import type { MonthKeepContrast } from "@/lib/money";

type Rec = {
  id: string;
  type: string;
  title: string;
  happening: string;
  nextAction: string;
};

function hrefFor(type: string): string | null {
  if (
    type === "missing_picture" ||
    type === "empty_month" ||
    type === "thin_buffer" ||
    type === "nothing_stayed" ||
    type === "out_after_kept"
  ) {
    return "/money";
  }
  if (type === "goal_slipping") {
    return "/you";
  }
  return null;
}

export function NextMoveCard({
  recommendation,
  contrast,
}: {
  recommendation: Rec;
  contrast?: MonthKeepContrast | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const href = hrefFor(recommendation.type);

  async function onOkay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await decideAction(new FormData(event.currentTarget));
    if (result && "error" in result && result.error) {
      setError(result.error);
    }
  }

  return (
    <section className="rounded-2xl bg-kb-discovery px-5 py-6 text-[#f7efe4]">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-kb-seal">
        <svg className="h-3 w-7" viewBox="0 0 28 12" aria-hidden="true">
          <path d="M1 8c5-1 7-5 13-5s6 5 11 3" fill="none" stroke="#E04A30" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="25.5" cy="5.8" r="1.8" fill="#E04A30" />
        </svg>
        KIRABAKI found
      </p>
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight">{recommendation.title}</h2>
      <p className="mt-3 text-base leading-relaxed text-white/70">{recommendation.happening}</p>
      {contrast ? (
        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-kb-seal">Kept</p>
          <dl>
            <div className="mt-1 flex items-baseline justify-between gap-4 border-b border-white/15 py-3">
              <dt className="text-sm text-white/70">{contrast.lastLabel}</dt>
              <dd className={moneyClass}>{contrast.lastKept}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3">
              <dt className="text-sm text-white/70">{contrast.thisLabel}</dt>
              <dd className={moneyClass}>{contrast.thisKept}</dd>
            </div>
          </dl>
        </div>
      ) : null}
      {error ? <p className="mt-3 text-sm text-kb-seal">{error}</p> : null}
      {recommendation.type === "quiet_good" ||
      recommendation.type === "kept_after_out" ||
      recommendation.type === "saving_bottleneck" ||
      recommendation.type === "income_bottleneck" ? (
        <Link href="/money" className="mt-6 inline-flex h-11 items-center text-sm font-semibold text-[#f7efe4]/70">
          See the picture
        </Link>
      ) : href ? (
        <Link
          href={href}
          className={`${buttonClass} mt-6 flex items-center justify-center`}
        >
          {recommendation.nextAction}
        </Link>
      ) : (
        <form onSubmit={onOkay} className="mt-6">
          <input type="hidden" name="recommendationId" value={recommendation.id} />
          <input type="hidden" name="decision" value="accepted" />
          <button type="submit" className={buttonClass}>
            {recommendation.nextAction}
          </button>
        </form>
      )}
    </section>
  );
}

export function OutcomeForm({ actionId }: { actionId: string }) {
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const result = await saveOutcomeAction(new FormData(event.currentTarget));
    if (result && "error" in result && result.error) {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-2">
      <p className="text-sm font-semibold text-kb-seal">What happened</p>
      <input type="hidden" name="actionId" value={actionId} />
      <input name="note" required minLength={2} placeholder="A sentence is enough." className={fieldClass} />
      {error ? <p className="mt-2 text-sm text-kb-seal">{error}</p> : null}
      <button type="submit" className={`${buttonClass} mt-4`}>
        Remember this
      </button>
    </form>
  );
}

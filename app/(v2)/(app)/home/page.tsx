import Link from "next/link";
import { AppChrome } from "@/components/app/AppChrome";
import { moneyClass } from "@/components/app/fields";
import { NextMoveCard, OutcomeForm } from "@/components/app/NextMove";
import { latestDecision } from "@/domains/commitments/record";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { getPrinciple } from "@/domains/knowledge/ensure";
import { listRecentSnapshots } from "@/domains/snapshots/remember";
import { requireWorkspace } from "@/lib/auth/session";
import { formatMoney, formatMonths, monthPlainTalk, weekdayName } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function JourneyPage() {
  const { session, workspace } = await requireWorkspace();
  const { picture, nextMove } = await afterMoneyChange(workspace.id, workspace.currency);
  const arrived = picture.accounts.length === 0;
  const [decision, snapshots] = arrived
    ? [null, []]
    : await Promise.all([latestDecision(workspace.id), listRecentSnapshots(workspace.id, 3)]);
  const onboarding =
    nextMove?.type === "missing_picture" || nextMove?.type === "empty_month";
  const lesson =
    !arrived && !onboarding && nextMove?.principleId ? await getPrinciple(nextMove.principleId) : null;
  const firstName = session.user.name.trim().split(/\s+/)[0] ?? "there";
  const currency = workspace.currency;

  return (
    <AppChrome current="/home">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">
        {weekdayName(picture.asOf)}
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Hey, {firstName}.</h1>
      <p className="mt-3 text-base leading-relaxed text-kb-muted">
        {arrived ? "First, add where your money is — a bank, cash, or a wallet." : monthPlainTalk(picture.cashflow, currency)}
      </p>
      {!arrived && picture.buffer.months !== null ? (
        <p className="mt-2 text-sm text-kb-muted">
          Cash on hand covers about {formatMonths(picture.buffer.months)} months of this month’s spending.
        </p>
      ) : null}

      {!arrived && !picture.goal ? (
        <p className="mt-4 text-sm text-kb-muted">
          When you’re ready, name one savings target on You.
        </p>
      ) : null}

      {!arrived && picture.goal && picture.projection ? (
        <section className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Your goal</p>
          <p className="mt-2 text-xl font-extrabold tracking-tight">{picture.goal.name}</p>
          <p className="mt-2 text-sm text-kb-muted">
            Cash set aside for surprises.{" "}
            <span className={moneyClass}>
              {formatMoney(picture.projection.currentCents, currency)}
            </span>{" "}
            of{" "}
            <span className={moneyClass}>{formatMoney(picture.projection.targetCents, currency)}</span>
            {picture.projection.onTrack === false
              ? " — behind the date you named. The date can move."
              : picture.projection.onTrack
                ? " — on track."
                : " — add a monthly amount on You to see the pace."}
          </p>
        </section>
      ) : null}

      <div className="mt-8">
        {nextMove ? (
          <NextMoveCard recommendation={nextMove} />
        ) : arrived ? (
          <section className="rounded-2xl bg-kb-discovery px-5 py-6 text-[#f7efe4]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-kb-seal">KIRABAKI found</p>
            <p className="mt-4 text-2xl font-extrabold">Add a bank or wallet</p>
            <p className="mt-3 text-base text-white/70">Just one. You can add more later.</p>
            <Link
              href="/money"
              className="mt-6 flex h-12 items-center justify-center rounded-full bg-kb-seal text-sm font-semibold"
            >
              Add it
            </Link>
          </section>
        ) : null}
      </div>

      {decision && !decision.outcome ? (
        <div className="mt-6">
          <OutcomeForm actionId={decision.action.id} />
        </div>
      ) : null}

      {lesson ? (
        <Link href="/learn" className="mt-8 block rounded-2xl border border-kb-sand px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">A small lesson</p>
          <p className="mt-2 text-lg font-semibold tracking-tight">{lesson.principle.title}</p>
          <p className="mt-1 text-sm text-kb-muted">{lesson.principle.summary}</p>
        </Link>
      ) : null}

      {!arrived && picture.monthLines.length > 0 ? (
        <p className={`mt-8 text-sm text-kb-muted ${moneyClass}`}>
          This month {formatMoney(picture.cashflow.incomeCents, currency)} in,{" "}
          {formatMoney(picture.cashflow.expenseCents, currency)} out
          {picture.cashflow.savingsCents > 0
            ? `, ${formatMoney(picture.cashflow.savingsCents, currency)} kept.`
            : "."}
        </p>
      ) : null}

      {snapshots.length > 1 ? (
        <p className="mt-3 text-sm text-kb-muted">KIRABAKI remembers {snapshots.length} months.</p>
      ) : null}
    </AppChrome>
  );
}

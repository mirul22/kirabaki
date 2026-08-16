import Link from "next/link";
import { AppChrome } from "@/components/app/AppChrome";
import { moneyClass, summaryClass } from "@/components/app/fields";
import { MonthCloses } from "@/components/app/MonthCloses";
import { NextMoveCard, OutcomeForm } from "@/components/app/NextMove";
import { listRecentDecisions } from "@/domains/commitments/record";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { getPrinciple } from "@/domains/knowledge/ensure";
import { listRecentSnapshots } from "@/domains/snapshots/remember";
import { requireWorkspace } from "@/lib/auth/session";
import { formatMoney, monthPlainTalk, weekdayName } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function JourneyPage() {
  const { session, workspace } = await requireWorkspace();
  const { picture, nextMove } = await afterMoneyChange(workspace.id, workspace.currency);
  const arrived = picture.accounts.length === 0;
  const [snapshots, decisions] = arrived
    ? [[], []]
    : await Promise.all([listRecentSnapshots(workspace.id, 6), listRecentDecisions(workspace.id, 6)]);
  const onboarding = nextMove?.type === "missing_picture" || nextMove?.type === "empty_month";
  const lesson =
    !arrived && !onboarding && nextMove?.principleId ? await getPrinciple(nextMove.principleId) : null;
  const firstName = session.user.name.trim().split(/\s+/)[0] ?? "there";
  const currency = workspace.currency;
  const pendingOutcome =
    decisions.find((row) => row.action.decision === "accepted" && !row.outcome) ?? null;
  const remembered = decisions.filter((row) => row.outcome);
  const latest = remembered[0] ?? null;
  const earlier = remembered.slice(1);

  return (
    <AppChrome current="/home">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">
        {weekdayName(picture.asOf)}
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Hey, {firstName}.</h1>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-kb-muted">
        {arrived
          ? "First, add where your money is — a bank, cash, or a wallet."
          : monthPlainTalk(picture.cashflow, currency)}
      </p>

      {!arrived && picture.goal && picture.projection ? (
        <section className="mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Your goal</p>
          <p className="mt-3 text-2xl font-extrabold tracking-tight">{picture.goal.name}</p>
          <p className={`mt-3 text-base text-kb-muted ${moneyClass}`}>
            {formatMoney(picture.projection.currentCents, currency)} of{" "}
            {formatMoney(picture.projection.targetCents, currency)}
            {picture.projection.onTrack === false
              ? " — behind the date you named."
              : picture.projection.onTrack
                ? " — on track."
                : ""}
          </p>
        </section>
      ) : null}

      {!arrived && !picture.goal ? (
        <p className="mt-8 text-sm text-kb-muted">When you’re ready, name one savings target on You.</p>
      ) : null}

      <div className="mt-12">
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

      {pendingOutcome ? (
        <div className="mt-10">
          <OutcomeForm actionId={pendingOutcome.action.id} />
        </div>
      ) : null}

      {latest ? (
        <section className="mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">What you did</p>
          <p className="mt-4 text-base leading-relaxed">{latest.outcome?.note}</p>
          {earlier.length > 0 ? (
            <details className="mt-4">
              <summary className={summaryClass}>Earlier</summary>
              <ul className="mt-4">
                {earlier.map((row) => (
                  <li key={row.action.id} className="border-b border-kb-sand/70 py-3 text-sm text-kb-muted">
                    {row.outcome?.note}
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </section>
      ) : null}

      {lesson ? (
        <p className="mt-12">
          <Link href="/learn" className="text-sm font-semibold text-kb-seal">
            {lesson.principle.title}
          </Link>
          <span className="mt-2 block text-base text-kb-muted">{lesson.principle.summary}</span>
        </p>
      ) : null}

      <MonthCloses currency={currency} currentStart={picture.month.start} snapshots={snapshots} />
    </AppChrome>
  );
}

import { AppChrome } from "@/components/app/AppChrome";
import { moneyClass, rowClass } from "@/components/app/fields";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { getPrinciple, listPrinciples } from "@/domains/knowledge/ensure";
import { getOpenRecommendation } from "@/domains/recommendations/refresh";
import { requireWorkspace } from "@/lib/auth/session";
import { formatMoney, formatMonths, formatRate } from "@/lib/money";

export const dynamic = "force-dynamic";

function beats(text: string) {
  return text
    .split(/(?<=\.)\s+/)
    .map((row) => row.trim())
    .filter(Boolean);
}

export default async function LearnPage() {
  const { workspace } = await requireWorkspace();
  const { picture } = await afterMoneyChange(workspace.id, workspace.currency);
  const open = await getOpenRecommendation(workspace.id);
  const tied = open?.principleId ? await getPrinciple(open.principleId) : null;
  const all = tied ? [] : await listPrinciples();
  const lesson = tied ?? all[0] ?? null;
  const currency = workspace.currency;
  const inCents = picture.cashflow.incomeCents;
  const outCents = picture.cashflow.expenseCents;

  return (
    <AppChrome current="/learn">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Learn</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
        {picture.accounts.length === 0
          ? "After you add a place money sits."
          : lesson
            ? lesson.principle.title
            : "A small lesson"}
      </h1>

      {picture.accounts.length === 0 ? (
        <p className="mt-6 text-base leading-relaxed text-kb-muted">
          Then this will use your numbers. Start on Journey.
        </p>
      ) : lesson ? (
        <article className="mt-6 space-y-4 text-base leading-relaxed">
          <p className="font-semibold">{lesson.principle.summary}</p>
          <ol className="list-decimal space-y-3 pl-5">
            {beats(lesson.principle.explanation).map((row) => (
              <li key={row}>{row}</li>
            ))}
          </ol>
          <p className="text-sm text-kb-muted">
            {lesson.source.author}, <em>{lesson.source.title}</em>
            {lesson.principle.chapter ? ` — ${lesson.principle.chapter}` : ""}
            {lesson.source.year ? `, ${lesson.source.year}` : ""}.
          </p>
        </article>
      ) : null}

      {picture.accounts.length > 0 ? (
        <section className="mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">This month</p>
          <dl className="mt-2">
            <div className={rowClass}>
              <dt className="text-kb-muted">In</dt>
              <dd className={moneyClass}>{formatMoney(inCents, currency)}</dd>
            </div>
            <div className={rowClass}>
              <dt className="text-kb-muted">Out</dt>
              <dd className={moneyClass}>{formatMoney(outCents, currency)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-base leading-relaxed text-kb-muted">
            {picture.cashflow.savingsRateBps !== null
              ? `You kept ${formatRate(picture.cashflow.savingsRateBps)} of what came in.`
              : "Add pay in, then this can show the gap."}
            {picture.buffer.months !== null
              ? ` Cash covers ${formatMonths(picture.buffer.months)} months of this month’s spending.`
              : ""}
          </p>
        </section>
      ) : null}
    </AppChrome>
  );
}

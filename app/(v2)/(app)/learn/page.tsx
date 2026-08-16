import { AppChrome } from "@/components/app/AppChrome";
import { moneyClass } from "@/components/app/fields";
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
  const maxCents = Math.max(inCents, outCents, 1);

  return (
    <AppChrome current="/learn">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Learn</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
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
        <section className="mt-8 rounded-2xl bg-white/50 px-4 py-4">
          <p className="text-sm font-semibold text-kb-seal">This month, in numbers</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <div className="flex justify-between gap-3">
                <dt>In</dt>
                <dd className={moneyClass}>{formatMoney(inCents, currency)}</dd>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-kb-sand">
                <div className="h-2 rounded-full bg-kb-seal" style={{ width: `${Math.round((inCents / maxCents) * 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between gap-3">
                <dt>Out</dt>
                <dd className={moneyClass}>{formatMoney(outCents, currency)}</dd>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-kb-sand">
                <div className="h-2 rounded-full bg-kb-muted" style={{ width: `${Math.round((outCents / maxCents) * 100)}%` }} />
              </div>
            </div>
          </dl>
          <p className="mt-4 text-sm text-kb-muted">
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

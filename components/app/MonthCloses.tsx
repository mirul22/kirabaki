import { moneyClass, rowClass, summaryClass } from "@/components/app/fields";
import { formatMoney, formatMonth, monthAgainstLast } from "@/lib/money";

export type MonthCloseView = {
  id: string;
  periodStart: string;
  incomeCents: number;
  expenseCents: number;
  savingsCents: number;
};

function Close({
  row,
  currency,
  currentStart,
}: {
  row: MonthCloseView;
  currency: string;
  currentStart: string;
}) {
  const title = row.periodStart === currentStart ? "This month" : formatMonth(row.periodStart);
  return (
    <article>
      <p className="text-sm text-kb-muted">{title}</p>
      <dl className="mt-1">
        <div className={rowClass}>
          <dt className="text-kb-muted">In</dt>
          <dd className={moneyClass}>{formatMoney(row.incomeCents, currency)}</dd>
        </div>
        <div className={rowClass}>
          <dt className="text-kb-muted">Out</dt>
          <dd className={moneyClass}>{formatMoney(row.expenseCents, currency)}</dd>
        </div>
        <div className={rowClass}>
          <dt>Kept</dt>
          <dd className={moneyClass}>{formatMoney(row.savingsCents, currency)}</dd>
        </div>
      </dl>
    </article>
  );
}

export function MonthCloses({
  currency,
  currentStart,
  snapshots,
}: {
  currency: string;
  currentStart: string;
  snapshots: readonly MonthCloseView[];
}) {
  if (snapshots.length === 0) {
    return null;
  }
  const against = monthAgainstLast(snapshots[0], snapshots[1] ?? null);
  const recent = snapshots.slice(0, 3);
  const earlier = snapshots.slice(3);

  return (
    <section className="mt-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">The months</p>
      {against ? <p className="mt-4 max-w-sm text-base leading-relaxed text-kb-muted">{against}</p> : null}
      <div className="mt-6 space-y-10">
        {recent.map((row) => (
          <Close key={row.id} row={row} currency={currency} currentStart={currentStart} />
        ))}
      </div>
      {earlier.length > 0 ? (
        <details className="mt-8">
          <summary className={summaryClass}>Earlier months</summary>
          <div className="mt-6 space-y-10">
            {earlier.map((row) => (
              <Close key={row.id} row={row} currency={currency} currentStart={currentStart} />
            ))}
          </div>
        </details>
      ) : null}
    </section>
  );
}

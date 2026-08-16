import { ArrowDownLeft, ArrowUpRight, Star, Wallet } from "lucide-react";
import { AppChrome } from "@/components/app/AppChrome";
import { IconSubmit } from "@/components/app/IconSubmit";
import { AddAccountForm, AddLineForm, AddPositionForm } from "@/components/app/MoneyForms";
import { moneyClass } from "@/components/app/fields";
import {
  removeAccountAction,
  removeAssetAction,
  removeLiabilityAction,
  removeTransactionAction,
  setPrimaryAccountAction,
} from "@/app/(v2)/(app)/actions";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { requireWorkspace } from "@/lib/auth/session";
import { formatDay, formatMoney, monthPlainTalk } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function MoneyPage() {
  const { workspace } = await requireWorkspace();
  const { picture } = await afterMoneyChange(workspace.id, workspace.currency);
  const currency = workspace.currency;
  const firstPlace = picture.accounts.length === 0;
  const hasMonth = picture.monthLines.length > 0;
  const primary = picture.accounts.find((row) => row.isPrimary) ?? picture.accounts[0];

  return (
    <AppChrome current="/money">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Money</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
        {firstPlace
          ? "Add a place money sits."
          : hasMonth
            ? monthPlainTalk(picture.cashflow, currency)
            : "In or out this month."}
      </h1>
      <p className="mt-3 text-base text-kb-muted">
        {firstPlace
          ? "A bank, cash, or a wallet. One is enough for now."
          : hasMonth
            ? `What you have, net: ${formatMoney(picture.netWorth.netWorthCents, currency)}.`
            : "One line is enough. The list can wait."}
      </p>

      <div className="mt-8 space-y-8">
        {firstPlace ? <AddAccountForm first /> : null}

        {!firstPlace ? (
          <>
            <AddLineForm
              accounts={picture.accounts.map((row) => ({
                id: row.id,
                name: row.name,
                isPrimary: row.isPrimary,
              }))}
            />

            {hasMonth ? (
              <div className="space-y-6">
                {Object.entries(
                  picture.monthLines.reduce<Record<string, typeof picture.monthLines>>((groups, row) => {
                    const day = row.occurredOn;
                    groups[day] = groups[day] ? [...groups[day], row] : [row];
                    return groups;
                  }, {}),
                ).map(([day, rows]) => (
                  <section key={day}>
                    <p className="text-sm font-semibold text-kb-muted">{formatDay(day)}</p>
                    <ul className="mt-2 space-y-3">
                      {rows.map((row) => {
                        const place = picture.accounts.find((item) => item.id === row.accountId);
                        const incoming = row.type === "income";
                        return (
                          <li
                            key={row.id}
                            className="flex items-center justify-between gap-3 rounded-2xl bg-white/50 px-4 py-3"
                          >
                            <div className="flex min-w-0 items-start gap-3">
                              {incoming ? (
                                <ArrowDownLeft className="mt-0.5 h-5 w-5 shrink-0 text-kb-seal" strokeWidth={1.75} />
                              ) : (
                                <ArrowUpRight className="mt-0.5 h-5 w-5 shrink-0 text-kb-muted" strokeWidth={1.75} />
                              )}
                              <div className="min-w-0">
                                <p className="font-semibold">{row.name}</p>
                                <p className="text-sm text-kb-muted">
                                  {incoming ? "In" : "Out"} ·{" "}
                                  <span className={moneyClass}>{formatMoney(row.amountCents, currency)}</span>
                                  {place ? ` · ${place.name}` : ""}
                                  {row.category && row.category !== "kirabaki.seed" ? ` · ${row.category}` : ""}
                                </p>
                              </div>
                            </div>
                            <IconSubmit
                              id={row.id}
                              action={removeTransactionAction}
                              label={`Remove ${row.name}`}
                              icon="remove"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}

            <details className="rounded-2xl border border-kb-sand px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-kb-muted [&::-webkit-details-marker]:hidden">
                <Wallet className="h-4 w-4 text-kb-seal" strokeWidth={1.75} />
                {picture.accounts.length === 1
                  ? `${primary?.name ?? "One place"} · ${formatMoney(primary?.currentCents ?? 0, currency)}`
                  : `${picture.accounts.length} places · ${formatMoney(picture.netWorth.accountCents, currency)}`}
              </summary>
              <ul className="mt-4 space-y-2">
                {picture.accounts.map((row) => (
                  <li key={row.id} className="flex items-center justify-between gap-2 rounded-xl bg-white/50 px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{row.name}</p>
                      <p className="text-sm text-kb-muted">{formatMoney(row.currentCents, currency)}</p>
                    </div>
                    <div className="flex shrink-0 items-center">
                      {row.isPrimary ? (
                        <span className="inline-flex h-11 w-11 items-center justify-center text-kb-seal">
                          <span className="sr-only">Primary</span>
                          <Star className="h-5 w-5" strokeWidth={1.75} fill="currentColor" />
                        </span>
                      ) : (
                        <IconSubmit
                          id={row.id}
                          action={setPrimaryAccountAction}
                          label={`Make ${row.name} primary`}
                          icon="primary"
                        />
                      )}
                      <IconSubmit
                        id={row.id}
                        action={removeAccountAction}
                        label={`Remove ${row.name}`}
                        icon="remove"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <AddAccountForm />
              </div>
            </details>

            {hasMonth ? (
              <details
                className="rounded-2xl border border-kb-sand px-4 py-4"
                open={picture.assets.length > 0 || picture.liabilities.length > 0}
              >
                <summary className="cursor-pointer text-sm font-semibold text-kb-muted [&::-webkit-details-marker]:hidden">
                  What you own and owe
                </summary>
                <p className="mt-3 text-sm text-kb-muted">
                  Own{" "}
                  <span className={moneyClass}>
                    {formatMoney(
                      picture.assets.reduce((sum, row) => sum + row.amountCents, 0),
                      currency,
                    )}
                  </span>
                  . Owe{" "}
                  <span className={moneyClass}>
                    {formatMoney(
                      picture.liabilities.reduce((sum, row) => sum + row.amountCents, 0),
                      currency,
                    )}
                  </span>
                  .
                </p>
                <div className="mt-6 space-y-8">
                  <AddPositionForm kind="asset" />
                  {picture.assets.length > 0 ? (
                    <ul className="space-y-3">
                      {picture.assets.map((row) => (
                        <li
                          key={row.id}
                          className="flex items-center justify-between gap-3 rounded-2xl bg-white/50 px-4 py-3"
                        >
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-kb-seal">You own</p>
                            <p className="font-semibold">{row.name}</p>
                            <p className={`text-sm text-kb-muted ${moneyClass}`}>
                              {formatMoney(row.amountCents, currency)}
                            </p>
                          </div>
                          <IconSubmit
                            id={row.id}
                            action={removeAssetAction}
                            label={`Remove ${row.name}`}
                            icon="remove"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <AddPositionForm kind="liability" />
                  {picture.liabilities.length > 0 ? (
                    <ul className="space-y-3">
                      {picture.liabilities.map((row) => (
                        <li
                          key={row.id}
                          className="flex items-center justify-between gap-3 rounded-2xl bg-white/50 px-4 py-3"
                        >
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-kb-seal">You owe</p>
                            <p className="font-semibold">{row.name}</p>
                            <p className={`text-sm text-kb-muted ${moneyClass}`}>
                              {formatMoney(row.amountCents, currency)}
                            </p>
                          </div>
                          <IconSubmit
                            id={row.id}
                            action={removeLiabilityAction}
                            label={`Remove ${row.name}`}
                            icon="remove"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </details>
            ) : null}
          </>
        ) : null}
      </div>
    </AppChrome>
  );
}

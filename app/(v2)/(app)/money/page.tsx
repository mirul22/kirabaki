import { AppChrome } from "@/components/app/AppChrome";
import { AddAccountForm } from "@/components/app/MoneyForms";
import { MoneyView } from "@/components/app/MoneyView";
import { afterMoneyChange } from "@/domains/finance/refresh";
import { requireWorkspace } from "@/lib/auth/session";
import { monthRange } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function MoneyPage() {
  const { workspace } = await requireWorkspace();
  const { picture } = await afterMoneyChange(workspace.id, workspace.currency);
  const firstPlace = picture.accounts.length === 0;
  const earlier = picture.transactions.filter((row) => row.occurredOn < picture.month.start);
  const earlierByMonth = earlier.reduce<Record<string, typeof earlier>>((groups, row) => {
    const start = monthRange(row.occurredOn).start;
    groups[start] = groups[start] ? [...groups[start], row] : [row];
    return groups;
  }, {});

  return (
    <AppChrome current="/money">
      {firstPlace ? (
        <>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Money</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Add a place money sits.</h1>
          <p className="mt-3 text-base text-kb-muted">A bank, cash, or a wallet. One is enough for now.</p>
          <div className="mt-10">
            <AddAccountForm first />
          </div>
        </>
      ) : (
        <MoneyView
          currency={workspace.currency}
          netWorthCents={picture.netWorth.netWorthCents}
          ownCents={picture.netWorth.accountCents + picture.netWorth.assetsCents}
          oweCents={picture.netWorth.liabilitiesCents}
          incomeCents={picture.cashflow.incomeCents}
          expenseCents={picture.cashflow.expenseCents}
          savingsCents={picture.cashflow.savingsCents}
          accounts={picture.accounts.map((row) => ({
            id: row.id,
            name: row.name,
            currentCents: row.currentCents,
            isPrimary: row.isPrimary,
          }))}
          assets={picture.assets.map((row) => ({
            id: row.id,
            name: row.name,
            amountCents: row.amountCents,
          }))}
          liabilities={picture.liabilities.map((row) => ({
            id: row.id,
            name: row.name,
            amountCents: row.amountCents,
          }))}
          days={Object.entries(
            picture.monthLines.reduce<Record<string, typeof picture.monthLines>>((groups, row) => {
              groups[row.occurredOn] = groups[row.occurredOn] ? [...groups[row.occurredOn], row] : [row];
              return groups;
            }, {}),
          ).map(([day, lines]) => ({ day, lines }))}
          earlierMonths={Object.keys(earlierByMonth)
            .sort()
            .reverse()
            .map((start) => ({ start, lines: earlierByMonth[start] ?? [] }))}
        />
      )}
    </AppChrome>
  );
}

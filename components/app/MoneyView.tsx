"use client";

import { useState } from "react";
import {
  removeAccountAction,
  removeAssetAction,
  removeLiabilityAction,
  setPrimaryAccountAction,
} from "@/app/(v2)/(app)/actions";
import { EditButton, EditScope, WhenEditing, useEdit } from "@/components/app/EditScope";
import { TextSubmit } from "@/components/app/TextSubmit";
import { AddAccountForm, AddLineForm, AddPositionForm, LineRow } from "@/components/app/MoneyForms";
import { moneyClass, rowClass, summaryClass } from "@/components/app/fields";
import { formatDay, formatMoney, formatMonth } from "@/lib/money";

export type MoneyLine = {
  id: string;
  name: string;
  type: "income" | "expense";
  amountCents: number;
  occurredOn: string;
  accountId: string | null;
  category: string | null;
};

export type MoneyViewProps = {
  currency: string;
  netWorthCents: number;
  ownCents: number;
  oweCents: number;
  incomeCents: number;
  expenseCents: number;
  savingsCents: number;
  accounts: { id: string; name: string; currentCents: number; isPrimary: boolean }[];
  assets: { id: string; name: string; amountCents: number }[];
  liabilities: { id: string; name: string; amountCents: number }[];
  days: { day: string; lines: MoneyLine[] }[];
  earlierMonths: { start: string; lines: MoneyLine[] }[];
};

export function MoneyView(props: MoneyViewProps) {
  return (
    <EditScope>
      <MoneyInner {...props} />
    </EditScope>
  );
}

function MoneyInner(props: MoneyViewProps) {
  const { editing } = useEdit();
  const [adding, setAdding] = useState(false);
  const places = props.accounts.map((row) => ({
    id: row.id,
    name: row.name,
    isPrimary: row.isPrimary,
  }));
  const hasMonth = props.days.length > 0;
  const showAdd = adding || !hasMonth;

  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Money</p>
        <EditButton />
      </div>
      <h1 className={`mt-4 text-4xl font-extrabold tracking-tight ${moneyClass}`}>
        {formatMoney(props.netWorthCents, props.currency)}
      </h1>
      <p className="mt-3 text-base text-kb-muted">What you have, net. Own minus owe.</p>

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Own</p>
          <p className={`text-sm ${moneyClass}`}>{formatMoney(props.ownCents, props.currency)}</p>
        </div>
        <ul>
          {props.accounts.map((row) => (
            <li key={row.id} className={rowClass}>
              <div className="min-w-0">
                <p className="font-semibold">{row.name}</p>
                {row.isPrimary ? <p className="mt-0.5 text-sm text-kb-muted">Primary</p> : null}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <p className={`text-right ${moneyClass}`}>{formatMoney(row.currentCents, props.currency)}</p>
                <WhenEditing>
                  {row.isPrimary ? null : (
                    <TextSubmit id={row.id} action={setPrimaryAccountAction} label="Use" />
                  )}
                  <TextSubmit id={row.id} action={removeAccountAction} label="Remove" />
                </WhenEditing>
              </div>
            </li>
          ))}
          {props.assets.map((row) => (
            <li key={row.id} className={rowClass}>
              <p className="font-semibold">{row.name}</p>
              <div className="flex shrink-0 items-center gap-1">
                <p className={`text-right ${moneyClass}`}>{formatMoney(row.amountCents, props.currency)}</p>
                <WhenEditing>
                  <TextSubmit id={row.id} action={removeAssetAction} label="Remove" />
                </WhenEditing>
              </div>
            </li>
          ))}
        </ul>
        <WhenEditing>
          <details className="mt-6">
            <summary className={summaryClass}>Add to what you own</summary>
            <div className="mt-4 space-y-8">
              <AddAccountForm />
              <AddPositionForm kind="asset" />
            </div>
          </details>
        </WhenEditing>
      </section>

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">Owe</p>
          <p className={`text-sm ${moneyClass}`}>{formatMoney(props.oweCents, props.currency)}</p>
        </div>
        {props.liabilities.length === 0 ? (
          <p className="mt-4 text-sm text-kb-muted">Nothing recorded yet.</p>
        ) : (
          <ul>
            {props.liabilities.map((row) => (
              <li key={row.id} className={rowClass}>
                <p className="font-semibold">{row.name}</p>
                <div className="flex shrink-0 items-center gap-1">
                  <p className={`text-right ${moneyClass}`}>{formatMoney(row.amountCents, props.currency)}</p>
                  <WhenEditing>
                    <TextSubmit id={row.id} action={removeLiabilityAction} label="Remove" />
                  </WhenEditing>
                </div>
              </li>
            ))}
          </ul>
        )}
        <WhenEditing>
          <details className="mt-6">
            <summary className={summaryClass}>Add something you owe</summary>
            <div className="mt-4">
              <AddPositionForm kind="liability" />
            </div>
          </details>
        </WhenEditing>
      </section>

      <section className="mt-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-seal">This month</p>
        <dl className="mt-2">
          <div className={rowClass}>
            <dt className="text-kb-muted">In</dt>
            <dd className={moneyClass}>{formatMoney(props.incomeCents, props.currency)}</dd>
          </div>
          <div className={rowClass}>
            <dt className="text-kb-muted">Out</dt>
            <dd className={moneyClass}>{formatMoney(props.expenseCents, props.currency)}</dd>
          </div>
          <div className={rowClass}>
            <dt>Kept</dt>
            <dd className={moneyClass}>{formatMoney(props.savingsCents, props.currency)}</dd>
          </div>
        </dl>

        {showAdd ? (
          <div className="mt-8">
            <AddLineForm accounts={places} />
            {hasMonth && !editing ? (
              <button
                type="button"
                className="mt-4 h-11 w-full text-sm font-semibold text-kb-muted"
                onClick={() => setAdding(false)}
              >
                Close
              </button>
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            className="mt-6 h-11 text-sm font-semibold text-kb-seal"
            onClick={() => setAdding(true)}
          >
            Add in or out
          </button>
        )}

        {hasMonth ? (
          <div className="mt-10 space-y-8">
            {props.days.map((group) => (
              <section key={group.day}>
                <p className="text-sm text-kb-muted">{formatDay(group.day)}</p>
                <ul>
                  {group.lines.map((row) => (
                    <LineRow key={row.id} line={row} accounts={places} currency={props.currency} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : null}
      </section>

      {props.earlierMonths.length > 0 ? (
        <details className="mt-12">
          <summary className={summaryClass}>Earlier months</summary>
          <div className="mt-6 space-y-10">
            {props.earlierMonths.map((group) => (
              <section key={group.start}>
                <p className="text-sm text-kb-muted">{formatMonth(group.start)}</p>
                <ul>
                  {group.lines.map((row) => (
                    <LineRow key={row.id} line={row} accounts={places} currency={props.currency} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </details>
      ) : null}
    </>
  );
}

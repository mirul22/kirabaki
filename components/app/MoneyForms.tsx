"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Star } from "lucide-react";
import {
  addAccountAction,
  addAssetAction,
  addLiabilityAction,
  addTransactionAction,
  removeTransactionAction,
  updateTransactionAction,
} from "@/app/(v2)/(app)/actions";
import { useEdit } from "@/components/app/EditScope";
import { TextSubmit } from "@/components/app/TextSubmit";
import { AmountField } from "@/components/app/AmountField";
import { buttonClass, fieldClass, ghostButtonClass, moneyClass, rowClass } from "@/components/app/fields";
import { formatCentsGrouped, formatMoney, todayIso } from "@/lib/money";

type Result = { error?: string; ok?: true } | void;

async function runAction(
  action: (data: FormData) => Promise<Result>,
  data: FormData,
  setError: (value: string | null) => void,
) {
  setError(null);
  const result = await action(data);
  if (result && "error" in result && result.error) {
    setError(result.error);
  }
}

export function AddAccountForm({ first = false }: { first?: boolean }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <form action={(data) => runAction(addAccountAction, data, setError)} className="space-y-3">
      {first ? null : <p className="text-sm font-semibold text-kb-seal">Another place</p>}
      <label className="block">
        <span className="text-sm text-kb-muted">What do you call it?</span>
        <input name="name" required maxLength={80} placeholder="Maybank, cash, wallet" className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">What kind?</span>
        <select name="kind" defaultValue="bank" className={fieldClass}>
          <option value="bank">Bank</option>
          <option value="cash">Cash</option>
          <option value="ewallet">Wallet</option>
          <option value="investment">Investment</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">How much is there?</span>
        <AmountField name="statedBalance" required placeholder="0.00" />
      </label>
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      <button type="submit" className={buttonClass}>
        {first ? "Add it" : "Add this place"}
      </button>
    </form>
  );
}

export function AddLineForm({
  accounts,
}: {
  accounts: { id: string; name: string; isPrimary: boolean }[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [category, setCategory] = useState("");
  const defaultPlace = accounts.find((row) => row.isPrimary) ?? accounts[0];
  const [accountId, setAccountId] = useState(defaultPlace?.id ?? "");
  const kinds = ["food", "rent", "pay", "ride", "groceries"];
  return (
    <form action={(data) => runAction(addTransactionAction, data, setError)} className="space-y-4">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="accountId" value={accountId} />
      <input type="hidden" name="category" value={category} />
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className={`flex h-14 items-center justify-center gap-2 rounded-full text-base font-semibold ${type === "income" ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"}`}
          onClick={() => setType("income")}
        >
          <ArrowDownLeft className="h-5 w-5" strokeWidth={1.75} />
          In
        </button>
        <button
          type="button"
          className={`flex h-14 items-center justify-center gap-2 rounded-full text-base font-semibold ${type === "expense" ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"}`}
          onClick={() => setType("expense")}
        >
          <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
          Out
        </button>
      </div>
      {accounts.length > 1 ? (
        <div>
          <p className="text-sm text-kb-muted">To which place?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {accounts.map((row) => (
              <button
                key={row.id}
                type="button"
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold ${
                  accountId === row.id ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"
                }`}
                onClick={() => setAccountId(row.id)}
              >
                {row.name}
                {row.isPrimary ? <Star className="h-3.5 w-3.5" strokeWidth={1.75} fill="currentColor" /> : null}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-kb-muted">Goes to {defaultPlace?.name ?? "this place"}.</p>
      )}
      <label className="block">
        <span className="text-sm text-kb-muted">What was it?</span>
        <input name="name" required maxLength={80} placeholder="Pay, rent, food" className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-sm text-kb-muted">How much?</span>
        <AmountField name="amount" required placeholder="0.00" />
      </label>
      <div>
        <p className="text-sm text-kb-muted">Kind — optional</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {kinds.map((row) => (
            <button
              key={row}
              type="button"
              className={`min-h-10 rounded-full px-3 text-sm font-semibold ${
                category === row ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"
              }`}
              onClick={() => setCategory(category === row ? "" : row)}
            >
              {row}
            </button>
          ))}
        </div>
      </div>
      <label className="block">
        <span className="text-sm text-kb-muted">When?</span>
        <input name="occurredOn" type="date" required defaultValue={todayIso()} className={fieldClass} />
      </label>
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      <button type="submit" className={buttonClass}>
        Add it
      </button>
    </form>
  );
}

export function AddPositionForm({ kind }: { kind: "asset" | "liability" }) {
  const [error, setError] = useState<string | null>(null);
  const action = kind === "asset" ? addAssetAction : addLiabilityAction;
  return (
    <form action={(data) => runAction(action, data, setError)} className="space-y-3">
      <p className="text-sm font-semibold text-kb-seal">{kind === "asset" ? "Something you own" : "Something you owe"}</p>
      <input
        name="name"
        required
        maxLength={80}
        placeholder={kind === "asset" ? "EPF, a car, jewellery" : "PTPTN, a card, a loan"}
        className={fieldClass}
      />
      <AmountField name="amount" required placeholder="0.00" />
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      <button type="submit" className={buttonClass}>
        Add
      </button>
    </form>
  );
}

const LINE_KINDS = ["food", "rent", "pay", "ride", "groceries"];

export function LineRow({
  line,
  accounts,
  currency,
}: {
  line: {
    id: string;
    name: string;
    type: "income" | "expense";
    amountCents: number;
    occurredOn: string;
    accountId: string | null;
    category: string | null;
  };
  accounts: { id: string; name: string; isPrimary: boolean }[];
  currency: string;
}) {
  const { editing } = useEdit();
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<"income" | "expense">(line.type);
  const [accountId, setAccountId] = useState(line.accountId ?? accounts[0]?.id ?? "");
  const [category, setCategory] = useState(line.category && line.category !== "kirabaki.seed" ? line.category : "");
  if (!editing && changing) {
    setChanging(false);
  }
  const incoming = line.type === "income";
  const place = accounts.find((row) => row.id === line.accountId);
  const kind = line.category && !line.category.startsWith("kirabaki.") ? line.category : null;
  const detail = [incoming ? "In" : "Out", place?.name, kind].filter(Boolean).join(" · ");

  if (editing && changing) {
    return (
      <li className="border-b border-kb-sand/70 py-4">
        <form
          action={async (data) => {
            setError(null);
            const result = await updateTransactionAction(data);
            if (result && "error" in result && result.error) {
              setError(result.error);
              return;
            }
            setChanging(false);
          }}
          className="space-y-3"
        >
          <input type="hidden" name="id" value={line.id} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="accountId" value={accountId} />
          <input type="hidden" name="category" value={category} />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`flex h-11 items-center justify-center rounded-full text-sm font-semibold ${type === "income" ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"}`}
              onClick={() => setType("income")}
            >
              In
            </button>
            <button
              type="button"
              className={`flex h-11 items-center justify-center rounded-full text-sm font-semibold ${type === "expense" ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"}`}
              onClick={() => setType("expense")}
            >
              Out
            </button>
          </div>
          {accounts.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {accounts.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  className={`min-h-10 rounded-full px-3 text-sm font-semibold ${
                    accountId === row.id ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"
                  }`}
                  onClick={() => setAccountId(row.id)}
                >
                  {row.name}
                </button>
              ))}
            </div>
          ) : null}
          <input name="name" required maxLength={80} defaultValue={line.name} className={fieldClass} />
          <AmountField name="amount" required defaultValue={formatCentsGrouped(line.amountCents)} />
          <input name="occurredOn" type="date" required defaultValue={line.occurredOn} className={fieldClass} />
          <div className="flex flex-wrap gap-2">
            {LINE_KINDS.map((row) => (
              <button
                key={row}
                type="button"
                className={`min-h-10 rounded-full px-3 text-sm font-semibold ${
                  category === row ? "bg-kb-seal text-[#fff8f4]" : "border border-kb-sand"
                }`}
                onClick={() => setCategory(category === row ? "" : row)}
              >
                {row}
              </button>
            ))}
          </div>
          {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
          <div className="flex gap-2">
            <button type="submit" className={buttonClass}>
              Save
            </button>
            <button type="button" className={ghostButtonClass} onClick={() => setChanging(false)}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={rowClass}>
      <div className="min-w-0">
        <p className="font-semibold">{line.name}</p>
        <p className="mt-0.5 text-sm text-kb-muted">{detail}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <p className={`text-right ${moneyClass}`}>{formatMoney(line.amountCents, currency)}</p>
        {editing ? (
          <>
            <button
              type="button"
              className="h-11 px-2 text-sm font-semibold text-kb-seal"
              onClick={() => setChanging(true)}
            >
              Change
            </button>
            <TextSubmit id={line.id} action={removeTransactionAction} label="Remove" />
          </>
        ) : null}
      </div>
    </li>
  );
}

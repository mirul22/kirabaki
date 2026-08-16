"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Star } from "lucide-react";
import {
  addAccountAction,
  addAssetAction,
  addLiabilityAction,
  addTransactionAction,
} from "@/app/(v2)/(app)/actions";
import { buttonClass, fieldClass } from "@/components/app/fields";
import { todayIso } from "@/lib/money";

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
        <input name="statedBalance" required inputMode="decimal" placeholder="0" className={fieldClass} />
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
        <input name="amount" required inputMode="decimal" placeholder="0.00" className={`${fieldClass} font-mono tabular-nums`} />
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
      <input name="amount" required inputMode="decimal" placeholder="Amount" className={fieldClass} />
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      <button type="submit" className={buttonClass}>
        Add
      </button>
    </form>
  );
}

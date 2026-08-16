"use client";

import { useState, type FormEvent } from "react";
import { updateWorkspaceAction } from "@/app/(v2)/actions";
import { CurrencySelect } from "@/components/workspace/CurrencySelect";
import type { WorkspaceCurrency } from "@/domains/identity/currency";

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-kb-sand bg-white/60 px-4 text-base text-kb-ink outline-none focus:border-kb-seal";

type Props = {
  defaultName: string;
  defaultCurrency: WorkspaceCurrency;
};

export function WorkspaceSettingsForm({ defaultName, defaultCurrency }: Props) {
  const [name, setName] = useState(defaultName);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [savedName, setSavedName] = useState(defaultName);
  const [savedCurrency, setSavedCurrency] = useState(defaultCurrency);
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [pending, setPending] = useState(false);

  const trimmedName = name.trim();
  const isDirty = trimmedName !== savedName.trim() || currency !== savedCurrency;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isDirty || pending) {
      return;
    }

    setError(null);
    setJustSaved(false);
    setPending(true);

    try {
      const result = await updateWorkspaceAction(new FormData(event.currentTarget));
      if (result?.error) {
        setError(result.error);
        return;
      }
      setSavedName(trimmedName);
      setSavedCurrency(currency);
      setJustSaved(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="text-sm text-kb-muted">Workspace name</span>
        <input
          name="name"
          value={name}
          required
          maxLength={80}
          className={fieldClass}
          onChange={(event) => {
            setName(event.target.value);
            setJustSaved(false);
          }}
        />
      </label>
      <CurrencySelect
        value={currency}
        onChange={(next) => {
          setCurrency(next);
          setJustSaved(false);
        }}
      />
      {error ? <p className="text-sm text-kb-seal">{error}</p> : null}
      {justSaved && !isDirty ? <p className="text-sm text-kb-muted">Saved.</p> : null}
      {isDirty ? (
        <button
          type="submit"
          disabled={pending || trimmedName.length === 0}
          className="h-12 w-full rounded-xl bg-kb-seal text-sm font-semibold text-[#fff8f4] disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      ) : null}
    </form>
  );
}

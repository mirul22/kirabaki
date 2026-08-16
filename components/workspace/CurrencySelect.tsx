import type { ChangeEvent } from "react";
import { WORKSPACE_CURRENCY_OPTIONS, type WorkspaceCurrency } from "@/domains/identity/currency";

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-kb-sand bg-white/60 px-4 text-base text-kb-ink outline-none focus:border-kb-seal";

type Props = {
  value?: WorkspaceCurrency;
  defaultValue?: WorkspaceCurrency;
  onChange?: (value: WorkspaceCurrency) => void;
};

export function CurrencySelect({ value, defaultValue = "MYR", onChange }: Props) {
  return (
    <label className="block">
      <span className="text-sm text-kb-muted">Currency</span>
      <select
        name="currency"
        required
        className={fieldClass}
        {...(value !== undefined
          ? {
              value,
              onChange: (event: ChangeEvent<HTMLSelectElement>) =>
                onChange?.(event.target.value as WorkspaceCurrency),
            }
          : { defaultValue })}
      >
        {WORKSPACE_CURRENCY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

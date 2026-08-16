"use client";

import { useState } from "react";
import { fieldClass, moneyClass } from "@/components/app/fields";
import { formatAmountComplete, formatAmountTyping } from "@/lib/money";

type Props = {
  name: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function AmountField({
  name,
  required,
  placeholder = "0.00",
  value,
  defaultValue,
  onChange,
}: Props) {
  const controlled = value !== undefined;
  const [inner, setInner] = useState(() => (defaultValue ? formatAmountComplete(defaultValue) : ""));
  const shown = controlled ? value : inner;

  function setShown(next: string) {
    if (!controlled) {
      setInner(next);
    }
    onChange?.(next);
  }

  return (
    <input
      name={name}
      required={required}
      inputMode="decimal"
      autoComplete="off"
      value={shown}
      placeholder={placeholder}
      className={`${fieldClass} ${moneyClass}`}
      onChange={(event) => setShown(formatAmountTyping(event.target.value))}
      onBlur={() => {
        if (shown.trim()) {
          setShown(formatAmountComplete(shown));
        }
      }}
    />
  );
}

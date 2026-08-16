import { centsToMajor, type Cents } from "./cents";

const PREFIX: Record<string, string> = {
  MYR: "RM",
  SGD: "S$",
  USD: "$",
  IDR: "Rp",
};

export function formatMoney(cents: Cents, currency = "MYR"): string {
  const prefix = PREFIX[currency] ?? `${currency} `;
  const major = centsToMajor(cents);
  const formatted = Math.abs(major).toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return major < 0 ? `−${prefix}${formatted}` : `${prefix}${formatted}`;
}

export function formatMonths(months: number): string {
  const rounded = Math.round(months * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function formatRate(bps: number): string {
  return `${(bps / 100).toFixed(0)}%`;
}

export function formatDay(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) {
    return isoDate;
  }
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "short",
  });
}

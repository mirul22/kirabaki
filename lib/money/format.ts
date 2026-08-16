import { majorToCents, type Cents } from "./cents";

const PREFIX: Record<string, string> = {
  MYR: "RM",
  SGD: "S$",
  USD: "$",
  IDR: "Rp",
};

function groupThousands(digits: string): string {
  const stripped = digits.replace(/^0+(?=\d)/, "");
  const normalized = stripped.length > 0 ? stripped : digits.length > 0 ? "0" : "";
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCentsGrouped(cents: Cents): string {
  const abs = Math.abs(Math.round(cents));
  const whole = Math.floor(abs / 100);
  const frac = abs % 100;
  return `${groupThousands(String(whole))}.${String(frac).padStart(2, "0")}`;
}

export function formatMoney(cents: Cents, currency = "MYR"): string {
  const prefix = PREFIX[currency] ?? `${currency} `;
  const digits = formatCentsGrouped(cents);
  return cents < 0 ? `−${prefix}${digits}` : `${prefix}${digits}`;
}

export function formatAmountTyping(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  if (!cleaned) {
    return "";
  }
  const dot = cleaned.indexOf(".");
  const hasDot = dot !== -1;
  const integerRaw = hasDot ? cleaned.slice(0, dot) : cleaned;
  const decimalRaw = hasDot ? cleaned.slice(dot + 1).replace(/\./g, "").slice(0, 2) : "";
  const grouped = groupThousands(integerRaw);
  if (hasDot) {
    return `${grouped || "0"}.${decimalRaw}`;
  }
  return grouped;
}

export function formatAmountComplete(raw: string): string {
  const typed = formatAmountTyping(raw);
  if (!typed) {
    return "";
  }
  const [whole, frac = ""] = typed.split(".");
  return `${whole}.${frac.padEnd(2, "0").slice(0, 2)}`;
}

export function parseAmountToCents(raw: string): Cents | null {
  const cleaned = raw.trim().replace(/,/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    return null;
  }
  return majorToCents(Number(cleaned));
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

export function formatMonth(isoDate: string): string {
  const [year, month] = isoDate.split("-").map(Number);
  if (!year || !month) {
    return isoDate;
  }
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-MY", {
    month: "long",
    year: "numeric",
  });
}

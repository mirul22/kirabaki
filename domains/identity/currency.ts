export const WORKSPACE_CURRENCIES = ["MYR", "SGD", "USD", "IDR"] as const;

export type WorkspaceCurrency = (typeof WORKSPACE_CURRENCIES)[number];

export const WORKSPACE_CURRENCY_OPTIONS: { value: WorkspaceCurrency; label: string }[] = [
  { value: "MYR", label: "MYR — Malaysian ringgit" },
  { value: "SGD", label: "SGD — Singapore dollar" },
  { value: "USD", label: "USD — US dollar" },
  { value: "IDR", label: "IDR — Indonesian rupiah" },
];

const JURISDICTION_BY_CURRENCY: Record<WorkspaceCurrency, string> = {
  MYR: "MY",
  SGD: "SG",
  USD: "US",
  IDR: "ID",
};

export function isWorkspaceCurrency(value: string): value is WorkspaceCurrency {
  return (WORKSPACE_CURRENCIES as readonly string[]).includes(value);
}

export function jurisdictionFor(currency: WorkspaceCurrency): string {
  return JURISDICTION_BY_CURRENCY[currency];
}

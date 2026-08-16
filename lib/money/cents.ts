export type Cents = number;

export function majorToCents(major: number): Cents {
  if (!Number.isFinite(major)) {
    throw new Error("Amount must be a finite number.");
  }
  return Math.round(major * 100);
}

export function centsToMajor(cents: Cents): number {
  return cents / 100;
}

export function sumCents(values: readonly Cents[]): Cents {
  return values.reduce((total, value) => total + value, 0);
}

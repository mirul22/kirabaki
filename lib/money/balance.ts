import type { Cents } from "./cents";

export function currentBalanceCents(
  statedCents: Cents,
  lines: readonly { type: "income" | "expense"; amountCents: Cents }[],
): Cents {
  return lines.reduce((sum, line) => {
    return line.type === "income" ? sum + line.amountCents : sum - line.amountCents;
  }, statedCents);
}

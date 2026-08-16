import { sumCents, type Cents } from "./cents";

export type NetWorthInput = {
  cashAccountCents: readonly Cents[];
  otherAccountCents: readonly Cents[];
  assetCents: readonly Cents[];
  liabilityCents: readonly Cents[];
};

export type NetWorth = {
  calculation: "net_worth";
  cashCents: Cents;
  accountCents: Cents;
  assetsCents: Cents;
  liabilitiesCents: Cents;
  netWorthCents: Cents;
};

export function netWorth(input: NetWorthInput): NetWorth {
  const cashCents = sumCents(input.cashAccountCents);
  const otherAccountCents = sumCents(input.otherAccountCents);
  const accountCents = cashCents + otherAccountCents;
  const assetsCents = sumCents(input.assetCents);
  const liabilitiesCents = sumCents(input.liabilityCents);

  return {
    calculation: "net_worth",
    cashCents,
    accountCents,
    assetsCents,
    liabilitiesCents,
    netWorthCents: accountCents + assetsCents - liabilitiesCents,
  };
}

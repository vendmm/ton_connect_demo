import { getFormattedBalance } from "./getFormattedBalance";

export function Balance({ amount }: { amount: bigint }) {
  return <div>{getFormattedBalance(amount)} TON</div>;
}

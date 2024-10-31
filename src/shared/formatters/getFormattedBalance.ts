import { fromNano } from "@ton/core";

export function getFormattedBalance(balance: bigint) {
  return Number(fromNano(balance)).toPrecision(3);
}

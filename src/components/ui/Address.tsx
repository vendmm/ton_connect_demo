"use client";

import { getShortAddress } from "@/shared/formatters";

export function Address({ address }: { address: string }) {
  return <div>{getShortAddress(address)}</div>;
}

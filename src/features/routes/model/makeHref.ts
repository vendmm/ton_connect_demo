export function makeHomePageHref(): string {
  return `/`;
}

export function makeSendTxPageHref(address: string): string {
  return `/send-tx/${address}`;
}

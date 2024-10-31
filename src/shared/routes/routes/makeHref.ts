export function makeHomePageHref(): string {
  return `/`;
}

export function makeSendTxPageHref(address: string): string {
  return `/send-tx/${address}`;
}

export function isHomePage(segments: string[]): boolean {
  return segments.length === 0;
}

export function isSendTxPage(segments: string[]): boolean {
  return segments.length === 2 && segments[0] === "send-tx";
}

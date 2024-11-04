export function isHomePage(segments: string[]): boolean {
  return segments.length === 0;
}

export function isSendTxPage(segments: string[] | null): boolean {
  return segments ? segments.length === 2 && segments[0] === "send-tx" : false;
}

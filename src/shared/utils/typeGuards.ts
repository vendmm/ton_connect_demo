// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUnknownObject(x: unknown): x is Record<keyof any, unknown> {
  return x !== null && typeof x === "object";
}

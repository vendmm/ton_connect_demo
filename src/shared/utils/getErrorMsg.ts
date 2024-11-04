import { isUnknownObject } from "./isUnknownObject";

/**
 * @summary
 * Checks error, caught in try/catch block and returns correct error representation of that
 */
export function getErrorMsg(error: unknown): string {
  return String((isUnknownObject(error) && error.message) || error);
}

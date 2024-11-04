import { getShortAddress } from "./getShortAddress";

export function Address({
  address,
  isShort = true,
}: {
  address: string;
  isShort?: boolean;
}) {
  return isShort ? <div>{getShortAddress(address)}</div> : <div>{address}</div>;
}

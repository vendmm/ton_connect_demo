export function getShortAddress(
  address: string,
  lengthBeforeEllipsis: number = 10,
  lengthAfterEllipsis: number = 6
) {
  return `${address.slice(0, lengthBeforeEllipsis)}...${
    lengthAfterEllipsis ? address.slice(-lengthAfterEllipsis) : ""
  }`;
}

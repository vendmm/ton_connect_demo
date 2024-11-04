import { useQuery } from "@tanstack/react-query";
import { Address, TonClient } from "@ton/ton";

export function useBalance({
  address,
  client,
}: {
  address: string | null;
  client: TonClient | null;
}) {
  return useQuery({
    queryKey: ["data:user-balance", address],
    queryFn: async () =>
      address && client && (await client.getBalance(Address.parse(address))),
    refetchInterval: 10000,
    enabled: !!address && !!client,
  });
}

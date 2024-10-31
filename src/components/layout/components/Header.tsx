"use client";

import { Button } from "@/components/ui";
import { getFormattedBalance } from "@/shared/formatters";
import { useTonClient } from "@/shared/hooks";
import { isSendTxPage } from "@/shared/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { Address } from "@ton/core";
import {
  TonConnectButton,
  toUserFriendlyAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useMemo } from "react";

export function Header() {
  const wallet = useTonWallet();
  const routeSegments = useSelectedLayoutSegments();
  const router = useRouter();
  const { client } = useTonClient();

  const address = useMemo(
    () => (wallet ? wallet.account.address : ""),
    [wallet]
  );

  const balanceRequest = useQuery({
    queryKey: ["data:user-balance", address],
    queryFn: async () =>
      client &&
      (await client.getBalance(Address.parse(toUserFriendlyAddress(address)))),
    refetchInterval: 10000,
    enabled: !!client,
  });

  return (
    <header className="flex items-center p-3">
      {isSendTxPage(routeSegments) ? (
        <Button text="←" onClick={router.back} />
      ) : (
        ""
      )}

      <div className="ml-auto flex items-center gap-3">
        {!!address && typeof balanceRequest.data === "bigint" ? (
          <div>{getFormattedBalance(balanceRequest.data)} TON</div>
        ) : (
          <></>
        )}
        <TonConnectButton />
      </div>
    </header>
  );
}

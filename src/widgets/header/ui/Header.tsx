"use client";

import { useBalance, useTonClient, useTonConnect } from "@/entities/user";
import { Balance } from "@/entities/user/ui";
import { isSendTxPage } from "@/features/routes";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useSelectedLayoutSegments } from "next/navigation";
import { PrevPageButton } from "./PrevPageButton";

export function Header() {
  const { userFriendlyAddress } = useTonConnect();
  const routeSegments = useSelectedLayoutSegments();
  const { client } = useTonClient();

  const { data } = useBalance({ address: userFriendlyAddress, client });

  return (
    <header className="flex items-center p-3">
      {isSendTxPage(routeSegments) ? <PrevPageButton /> : <></>}

      <div className="ml-auto flex items-center gap-3">
        {!!userFriendlyAddress && typeof data === "bigint" ? (
          <Balance amount={data} />
        ) : (
          <></>
        )}
        <TonConnectButton />
      </div>
    </header>
  );
}

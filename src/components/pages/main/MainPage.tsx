"use client";

import { Address, Button } from "@/components/ui";
import { toUserFriendlyAddress, useTonWallet } from "@tonconnect/ui-react";
import Link from "next/link";
import { useMemo } from "react";

export function MainPage() {
  const wallet = useTonWallet();

  const address = useMemo(
    () => (wallet ? toUserFriendlyAddress(wallet.account.address, true) : ""),
    [wallet]
  );

  return (
    <div className="w-full flex grow flex-col items-center justify-center gap-5">
      {!!address ? (
        <>
          <Address address={address} />

          <Link href={`/send-tx/${address}`}>
            <Button text="Send TON" />
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

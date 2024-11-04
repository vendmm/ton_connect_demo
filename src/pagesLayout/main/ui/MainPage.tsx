"use client";

import { Address, useTonConnect } from "@/entities/user";
import { makeSendTxPageHref } from "@/features/routes";
import { Button } from "@/shared/ui";
import Link from "next/link";

export function MainPage() {
  const { userFriendlyAddress } = useTonConnect();

  return (
    <div className="w-full flex grow flex-col items-center justify-center gap-5">
      {!!userFriendlyAddress ? (
        <>
          <Address address={userFriendlyAddress} />

          <Link href={makeSendTxPageHref(userFriendlyAddress)}>
            <Button text="Send TON" />
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

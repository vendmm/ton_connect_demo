"use client";

import { emitNotification } from "@/entities/notification";
import { useBalance, useTonClient, useTonConnect } from "@/entities/user";
import { Transaction } from "@ton/core";
import { useEffect, useState } from "react";
import { TxForm } from "./TxForm";

export function SendTxPage({ address }: { address: string }) {
  const [tx, setTx] = useState<Transaction | null>(null);
  const { userFriendlyAddress } = useTonConnect();
  const { client } = useTonClient();

  const { data: balance, refetch: refetchBalance } = useBalance({
    address: userFriendlyAddress,
    client,
  });

  function handleFormSuccess(tx: Transaction | null) {
    setTx(tx);
  }

  useEffect(() => {
    if (tx) {
      emitNotification("Your transaction has been executed");
      setTx(null);
      refetchBalance();
    }
  }, [tx, refetchBalance]);

  return (
    <div className="flex grow gap-10 items-center justify-center">
      {client && (
        <>
          <TxForm
            address={address}
            currentBalance={balance ? balance : BigInt(0)}
            onSuccess={handleFormSuccess}
            client={client}
          />
        </>
      )}
    </div>
  );
}

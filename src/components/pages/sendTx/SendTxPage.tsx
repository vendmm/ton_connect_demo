"use client";

import { useTonClient } from "@/shared/hooks";
import { useQuery } from "@tanstack/react-query";
import { Address, Transaction } from "@ton/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TxForm } from "./components";

export function SendTxPage({ address }: { address: string }) {
  const [tx, setTx] = useState<Transaction | null>(null);
  const { client } = useTonClient();

  const balanceRequest = useQuery({
    queryKey: ["data:user-balance", address],
    queryFn: async () =>
      client && (await client.getBalance(Address.parse(address))),
    enabled: !!client,
  });

  function handleFormSuccess(tx: Transaction | null) {
    setTx(tx);
  }

  useEffect(() => {
    if (tx) {
      toast.info("Your transaction has been executed");
      setTx(null);
      balanceRequest.refetch();
    }
  }, [tx, balanceRequest]);

  return (
    <div className="flex grow gap-10 items-center justify-center">
      {client && (
        <>
          <TxForm
            address={address}
            currentBalance={
              balanceRequest.data ? balanceRequest.data : BigInt(0)
            }
            onSuccess={handleFormSuccess}
            client={client}
          />
        </>
      )}
    </div>
  );
}

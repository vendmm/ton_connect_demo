import { useAsyncInitialize } from "@/shared/hooks/useAsyncInitialize";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { CHAIN } from "@tonconnect/ui-react";
import { useState } from "react";
import { useTonConnect } from "./useTonConnect";

export const useTonClient = () => {
  const { network } = useTonConnect();
  const [client, setClient] = useState<TonClient | null>(null);

  useAsyncInitialize(async () => {
    if (!network) return;

    const endpoint = await getHttpEndpoint({
      network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
    });

    const tonClient = new TonClient({ endpoint });
    setClient(tonClient);
  }, [network]);

  return {
    client,
  };
};

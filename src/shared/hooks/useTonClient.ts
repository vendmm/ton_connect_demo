import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "@ton/ton";
import { CHAIN } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useTonConnect } from "./useTonConnect";

export const useAsyncInitialize = <T>(
  func: () => Promise<T>,
  deps: unknown[] = []
) => {
  const [state, setState] = useState<T | undefined>();

  useEffect(() => {
    (async () => {
      setState(await func());
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};

export const useTonClient = () => {
  const { network } = useTonConnect();
  const [client, setClient] = useState<TonClient>();

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

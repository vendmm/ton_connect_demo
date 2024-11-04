import {
  Address,
  beginCell,
  Sender,
  SenderArguments,
  storeStateInit,
} from "@ton/core";
import { TonConnectUI, toUserFriendlyAddress } from "@tonconnect/ui";
import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

export const useTonConnect = (): {
  sender: Sender;
  connected: boolean;
  walletAddress: Address | null;
  userFriendlyAddress: string | null;
  network: CHAIN | null;
  tonConnectUI: TonConnectUI;
} => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const walletAddress = wallet?.account?.address
    ? Address.parse(wallet.account.address)
    : undefined;
  return {
    sender: {
      send: async (args: SenderArguments) => {
        await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc()?.toString("base64"),
              stateInit: args.init
                ? beginCell()
                    .storeWritable(storeStateInit(args.init))
                    .endCell()
                    .toBoc()
                    .toString("base64")
                : undefined,
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
      address: walletAddress,
    },
    connected: !!wallet?.account?.address,
    walletAddress: walletAddress ?? null,
    userFriendlyAddress: walletAddress
      ? toUserFriendlyAddress(walletAddress.toRawString(), !!CHAIN.TESTNET)
      : null,
    network: wallet?.account?.chain ?? null,
    tonConnectUI,
  };
};

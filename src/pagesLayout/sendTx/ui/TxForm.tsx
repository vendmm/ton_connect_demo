import { useTonConnect } from "@/entities/user";
import { Button } from "@/shared/ui";
import { getErrorMsg } from "@/shared/utils";
import { useForm } from "@tanstack/react-form";
import {
  Address,
  beginCell,
  Cell,
  storeMessage,
  toNano,
  Transaction,
} from "@ton/core";
import { TonClient } from "@ton/ton";
import { SendTransactionRequest } from "@tonconnect/ui-react";

type Props = {
  address: string;
  currentBalance: bigint;
  onSuccess: (tx: Transaction | null) => void;
  client: TonClient;
};

export function TxForm({ address, onSuccess, currentBalance, client }: Props) {
  const { tonConnectUI } = useTonConnect();
  const form = useForm({
    defaultValues: {
      toAddress: "",
      amount: "",
    },
    onSubmit: async ({ value }) => {
      function setRootError(errorMsg: string) {
        form.store.setState((state) => ({
          ...state,
          errorMap: {
            onSubmit: errorMsg,
          },
        }));
      }

      const tx: SendTransactionRequest = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        from: address,
        messages: [
          {
            address: value.toAddress,
            amount: toNano(value.amount).toString(),
          },
        ],
      };

      try {
        const txResponse = await tonConnectUI.sendTransaction(tx);
        form.reset();
        const executedTx = await waitForTransaction(
          {
            address,
            hash: Cell.fromBase64(txResponse.boc).hash().toString("base64"),
          },
          client
        );
        onSuccess(executedTx);
      } catch (error) {
        setRootError(getErrorMsg(error));
      }
    },
  });

  const isSubmitting = form.useStore((state) => state.isSubmitting);

  return (
    <form
      className="w-full max-w-md flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="toAddress">
        {(field) => (
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Address"
            value={field.state.value}
            onChange={(e) => {
              field.handleChange(e.target.value);
            }}
          />
        )}
      </form.Field>

      <form.Field
        name="amount"
        validators={{
          onChange: ({ value }) =>
            toNano(value) > currentBalance ? "Insufficient balance" : undefined,
        }}
      >
        {(field) => (
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Amount"
            value={field.state.value}
            onChange={(e) => {
              field.handleChange(e.target.value);
            }}
          />
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => ({
          ...state.values,
          fieldMeta: state.fieldMeta,
        })}
      >
        {({ amount, fieldMeta, toAddress }) => {
          const hasError =
            !!fieldMeta.amount?.errors.length ||
            !!fieldMeta.toAddress?.errors.length;

          return (
            <Button
              text="Send Transaction"
              type="submit"
              isDisabled={isSubmitting || !amount || !toAddress || hasError}
            />
          );
        }}
      </form.Subscribe>

      <form.Subscribe
        selector={(state) => ({
          errorMap: state.errorMap,
          fieldMeta: state.fieldMeta,
        })}
      >
        {({ errorMap, fieldMeta }) => {
          const { onSubmit: onSubmitError } = errorMap;
          const errorMsg = fieldMeta.amount?.errors
            .concat(fieldMeta.toAddress?.errors)
            .concat(onSubmitError?.toString())
            .filter(Boolean)
            .join("; ");

          return !!errorMsg ? (
            <p className="text-center text-red-500 text-sm">{errorMsg}</p>
          ) : (
            <></>
          );
        }}
      </form.Subscribe>
    </form>
  );
}

async function waitForTransaction(
  options: {
    address: string;
    hash: string;
    refetchInterval?: number;
    refetchLimit?: number;
  },
  client: TonClient
): Promise<Transaction | null> {
  const { hash, refetchInterval = 1000, refetchLimit, address } = options;

  return new Promise((resolve) => {
    let refetches = 0;
    const walletAddress = Address.parse(address);
    const interval = setInterval(async () => {
      refetches++;

      const state = await client.getContractState(walletAddress);
      if (!state || !state.lastTransaction) {
        clearInterval(interval);
        resolve(null);
        return;
      }

      const { hash: lastHash, lt: lastLt } = state.lastTransaction;
      const lastTx = await client.getTransaction(
        walletAddress,
        lastLt,
        lastHash
      );

      if (lastTx && lastTx.inMessage) {
        const msgCell = beginCell()
          .store(storeMessage(lastTx.inMessage))
          .endCell();

        const inMsgHash = msgCell.hash().toString("base64");
        if (inMsgHash === hash) {
          clearInterval(interval);
          resolve(lastTx);
        }
      }
      if (refetchLimit && refetches >= refetchLimit) {
        clearInterval(interval);
        resolve(null);
      }
    }, refetchInterval);
  });
}

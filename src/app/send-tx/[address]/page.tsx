import { MakePageProps } from "@/features/routes";
import { SendTxPage } from "@/pagesLayout/sendTx";
import { notFound } from "next/navigation";

type PageProps = MakePageProps<"address">;

export default async function Page(props: PageProps) {
  const address = props.params.address;

  if (!address) {
    notFound();
  }

  return <SendTxPage address={address} />;
}

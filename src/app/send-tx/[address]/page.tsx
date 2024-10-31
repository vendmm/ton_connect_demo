import { SendTxPage } from "@/components/pages/sendTx";
import { MakePageProps } from "@/shared/routes/routes";
import { notFound } from "next/navigation";

export const revalidate = 0;

type PageProps = MakePageProps<"address">;

export default async function Page(props: PageProps) {
  const address = props.params.address;

  if (!address) {
    notFound();
  }

  return <SendTxPage address={address} />;
}

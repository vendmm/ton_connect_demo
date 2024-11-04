import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

export function PrevPageButton() {
  const router = useRouter();

  return <Button text="←" onClick={router.back} />;
}

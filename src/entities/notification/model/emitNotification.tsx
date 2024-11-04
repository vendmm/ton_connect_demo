import { toast } from "sonner";

export function emitNotification(text: string) {
  toast.info(text);
}

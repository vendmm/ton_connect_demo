import { Notification } from "@/entities/notification";
import { Header } from "@/widgets/header";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col grow">
      <Header />
      <main className="flex flex-col grow w-full p-3 m-auto">{children}</main>
      <Notification />
    </div>
  );
}

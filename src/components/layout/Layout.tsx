import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Header } from "./components";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col grow">
      <Header />
      <main className="flex flex-col grow w-full p-3 m-auto">{children}</main>
      <Toaster />
    </div>
  );
}

"use client";

import {
  QueryClientProvider,
  QueryClient as TanstackQueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new TanstackQueryClient();

export function QueryClient({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

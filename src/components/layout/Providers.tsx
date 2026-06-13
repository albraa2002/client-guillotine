"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1a1a2e",
            border: "1px solid rgba(148, 56, 255, 0.2)",
            color: "#e2e2e6",
          },
        }}
      />
    </SessionProvider>
  );
}

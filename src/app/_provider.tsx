import { ReactNode } from "react";
import RQProvider from "@/app/config/RQ_Provider";
import { SessionProvider } from "next-auth/react";

export default function ProviderContext({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <RQProvider>{children}</RQProvider>
      </SessionProvider>
    </>
  );
}

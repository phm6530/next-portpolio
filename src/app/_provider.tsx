import { ReactNode } from "react";
import RQProvider from "@/config/RQ_Provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function ProviderContext({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider refetchOnWindowFocus={true}>
      <RQProvider>{children}</RQProvider>
    </SessionProvider>
  );
}

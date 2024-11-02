import { ReactNode } from "react";
import RQProvider from "@/config/RQ_Provider";

export default async function ProviderContext({
  children,
}: {
  children: ReactNode;
}) {
  return <RQProvider>{children}</RQProvider>;
}

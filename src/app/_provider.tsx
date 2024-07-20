import { ReactNode } from "react";
import RQProvider from "@/app/config/RQ_Provider";

export default function ProviderContext({ children }: { children: ReactNode }) {
  return <RQProvider>{children}</RQProvider>;
}

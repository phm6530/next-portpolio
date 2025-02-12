import { ReactNode } from "react";
import LoadingSpiner from "./LoadingSpiner";
import { cn } from "@/lib/utils";

export default function LoadingSpinnerWrapper({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <div style={{ position: "relative" }}>
      {loading && <LoadingSpiner />}
      <div className={cn(loading && "opacity-50 pointer-events-none")}>
        {children}
      </div>
    </div>
  );
}

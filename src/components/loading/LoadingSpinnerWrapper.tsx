import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import LoadingSpiner from "../ui/LoadingSpiner";

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

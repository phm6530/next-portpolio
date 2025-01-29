import { ReactNode } from "react";
import LoadingSpiner from "./LoadingSpiner";

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
      {children}
    </div>
  );
}

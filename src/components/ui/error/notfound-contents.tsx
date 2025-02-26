import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function NotFoundContents({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex justify-center gap-2 items-center text-center p-14 text-xl animate-fadein",
        className
      )}
    >
      {children}
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function TabRounded({
  active,
  onClick,
  children,
  Icon,
}: {
  active: boolean;
  onClick: (...arg: any) => void;
  children: ReactNode;
  Icon?: React.ComponentType;
}) {
  return (
    <div
      className={cn(
        "border py-2.5 text-muted-foreground px-4 text-sm rounded-full cursor-pointer",
        active && "border-zinc-500 text-foreground"
      )}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {children}
    </div>
  );
}

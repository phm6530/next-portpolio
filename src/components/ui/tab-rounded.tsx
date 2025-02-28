import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function TabRounded({
  active,
  onClick,
  children,
  Icon,
  className,
}: {
  active: boolean;
  onClick: (..._arg: any) => void;
  children: ReactNode;
  Icon?: React.ComponentType;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `border  text-muted-foreground py-3 px-3 flex gap-1 text-[12px] items-center 
        md:text-sm md:px-4 md:py-2.5 md:gap-2 rounded-full cursor-pointer`,
        active && "border-zinc-500 text-foreground ",
        className
      )}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {children}
    </div>
  );
}

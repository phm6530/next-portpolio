import { cn } from "@/lib/utils";

export default function TabRounded({
  active,
  onClick,
  children,
  Icon,
}: {
  active: boolean;
  onClick: (...arg: any) => void;
  children: string;
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

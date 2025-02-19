import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { InputHTMLAttributes, ReactNode } from "react";

export default function CustomCheckbox({
  active,
  label,
  children,
  ...rest
}: {
  children: ReactNode;
  active: boolean;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label
        className={cn(
          "grid grid-cols opacity-80 p-3 border border-muted-foreground/30 transition-all items-center rounded-lg cursor-pointer",
          active && "opacity-100 scale-105 border-primary bg-primary/10 "
        )}
      >
        <input type="checkbox" className="hidden" checked={active} {...rest} />
        <div className={"flex gap-2 items-center"}>
          <CheckCheck className="w-7 h-7" /> {label}
        </div>
        {children}
      </label>
    </>
  );
}

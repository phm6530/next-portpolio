import { cn } from "@/lib/utils";
import { CheckSquare2 } from "lucide-react";
import { InputHTMLAttributes, ReactNode } from "react";

export default function CustomRadio({
  active,
  label,
  onChange,
  children,
  ...rest
}: {
  label: string;
  onChange: () => void;
  active: boolean;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label
        className={cn(
          "grid grid-cols opacity-80 p-3 border border-muted-foreground/30 transition-all items-center rounded-lg cursor-pointer",
          active && "opacity-100 scale-105 border-primary bg-primary/10 "
        )}
      >
        <input
          type="radio"
          className="hidden"
          onChange={onChange}
          checked={active}
          {...rest}
        />
        <div className={"flex gap-2 items-center"}>
          <CheckSquare2 className="w-7 h-7" /> {label}
        </div>
        {children}
      </label>
    </>
  );
}

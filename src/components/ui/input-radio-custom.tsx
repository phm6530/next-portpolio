import { cn } from "@/lib/utils";
import { CheckCircle, CheckSquare2, Circle } from "lucide-react";
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
          "flex flex-col opacity-80 p-3 border border-muted-foreground/30 transition-all items-start rounded-lg cursor-pointer",
          active && "opacity-100 scale-105 border-primary bg-primary/20 "
        )}
      >
        <input
          type="radio"
          className="hidden"
          onChange={onChange}
          checked={active}
          {...rest}
        />
        <div className={"flex gap-2 items-center text-sm md:text-base"}>
          {active ? (
            <CheckCircle className="w-5 h-5  [&>path]:text-point" />
          ) : (
            <Circle className="w-5 h-5 opacity-70" />
          )}

          {label}
        </div>
        {children}
      </label>
    </>
  );
}

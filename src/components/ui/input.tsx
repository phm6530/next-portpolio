import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `w-full bg-transparent dark:bg-custom-input border rounded-lg px-3.5 py-4 overflow-hidden focus-within:border-primary
       focus-within:focus-within:bg-[hsl(var(--custom-color))] flex flex-1`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

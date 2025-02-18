import { ReactNode } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export default function CustomButton({
  className,
  children,
  ...props
}: {
  className?: string;
  children: ReactNode;
} & ButtonProps) {
  return (
    <>
      <Button
        {...props}
        variant={"outline"}
        className={cn(
          `border-[#8d94af] text-[#495057] shadow-[0px_2px_8px_0px_rgba(73,80,87,0.06)]
            dark:text-white
            dark:hover:text-[#907ad8]
            hover:text-[#b67ad8] hover:border-[#907ad8] !bg-transparent 
            [&:hover>svg]:fill-[#907ad8]  svg-button
              
          `,
          className
        )}
      >
        {children}
      </Button>
    </>
  );
}

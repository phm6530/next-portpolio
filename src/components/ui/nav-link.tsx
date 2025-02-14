import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export default function NavLink({
  href,
  children,
  active,
  className,
  border = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  active: ((href: string) => boolean) | boolean;
  border?: boolean;
}) {
  const isActive = active instanceof Function ? active(href) : active;

  return (
    <Link
      href={href}
      className={cn(
        "hover:text-primary",
        {
          "text-primary": isActive,
          "border-primary": isActive && border,
          "border-zinc-400": border && !isActive,
        },
        className
      )}
    >
      {children}
    </Link>
  );
}

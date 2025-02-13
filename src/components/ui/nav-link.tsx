import Link from "next/link";
import { ReactNode } from "react";

export default function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  active: ((href: string) => boolean) | boolean;
}) {
  const isActive = active instanceof Function ? active(href) : active;

  return (
    <Link
      href={href}
      className={`hover:text-primary ${isActive ? "text-primary" : undefined}`}
    >
      {children}
    </Link>
  );
}

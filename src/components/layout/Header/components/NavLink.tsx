import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import classes from "./NavLink.module.scss";

export default function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link href={href} className={`${classes.link} ${isActive ? classes.active : undefined}`}>
      {children}
    </Link>
  );
}

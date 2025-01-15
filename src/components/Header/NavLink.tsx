import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import classes from "./NavLink.module.scss";
import useStore from "@/store/store";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  const store = useStore();

  return (
    <Link
      href={href}
      onClick={() => store.setClose()}
      className={`${classes.link} ${
        isActive ? classes.active : undefined
      }`}
    >
      {children}
    </Link>
  );
}

import classes from "./GlobalNav.module.scss";
import Link from "next/link";

export default function GlobalNav() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>about</Link>
        <Link href={"/survey"}>진행중 설문조사</Link>
        <Link href={"/admin"}>Admin</Link>
      </nav>
    </header>
  );
}

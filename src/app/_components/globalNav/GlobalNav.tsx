"use client";
import classes from "./GlobalNav.module.scss";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface GlobalNavProps {
  isLogin: boolean;
}

export default function GlobalNav({ isLogin: initialIsLogin }: GlobalNavProps) {
  const { data: session } = useSession();

  const pathname = usePathname();

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>사용법</Link>
          <Link href={"/template"}>리스트</Link>
          <Link href={"/admin"}>Admin</Link>
          <Link href={"/contact"}>문의하기</Link>
          {session?.user.role === "admin" ? (
            <button onClick={() => signOut()}>로그아웃</button>
          ) : (
            <Link href={`/auth/login?redirect=${pathname}`}>로그인</Link>
          )}
        </nav>
      </header>
    </>
  );
}

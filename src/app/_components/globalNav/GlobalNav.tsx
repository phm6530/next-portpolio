"use client";

import { useEffect, useState } from "react";
import classes from "./GlobalNav.module.scss";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface GlobalNavProps {
  isLogin: boolean;
}

export default function GlobalNav({ isLogin: initialIsLogin }: GlobalNavProps) {
  const { data: session } = useSession();

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/survey"}>진행중 설문조사</Link>
          <Link href={"/admin"}>Admin</Link>
          <Link href={"/contact"}>contact</Link>
          {session ? (
            <button onClick={() => signOut()}>로그아웃</button>
          ) : (
            <Link href={"/auth/login"}>로그인</Link>
          )}
        </nav>
      </header>
    </>
  );
}

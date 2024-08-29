"use client";
import classes from "./GlobalNav.module.scss";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Grid from "@/app/_components/ui/Grid";

interface GlobalNavProps {
  isLogin: boolean;
}

export default function GlobalNav({ isLogin: initialIsLogin }: GlobalNavProps) {
  const { data: session } = useSession();

  const pathname = usePathname();

  return (
    <>
      <header className={classes.header}>
        <Grid.center>
          <nav className={classes.nav}>
            <div className="logo">
              <Link href={"/"}>Project..D</Link>
            </div>
            <div className={classes.contentsLink}>
              <Link href={"/about"}>사용법</Link>
              <Link href={"/template"}>
                설문조사 리스트
                <span className={classes.new}>NEW</span>
              </Link>
              {session?.user.role === "admin" && (
                <Link href={"/admin"}>마이페이지</Link>
              )}{" "}
              <Link href={"/contact"}>문의하기</Link>
            </div>
            <div>
              {session?.user.role === "admin" ? (
                <button onClick={() => signOut()}>로그아웃</button>
              ) : (
                <Link href={`/auth/login?redirect=${pathname}`}>로그인</Link>
              )}
            </div>
          </nav>
        </Grid.center>
      </header>
    </>
  );
}

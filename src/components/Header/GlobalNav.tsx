"use client";
import classes from "./GlobalNav.module.scss";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/Grid";
import useStore from "@/store/store";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";

export default function GlobalNav({ token }: { token?: boolean }) {
  const store = useStore();
  const pathname = usePathname();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      return requestHandler(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/logout`, {
          credentials: "include",
        });
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

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
              <Link href={"/list"}>
                설문조사 리스트
                <span className={classes.new}>NEW</span>
              </Link>
              {/* {session?.user.role === "admin" && (
                <Link href={"/admin"}>마이페이지</Link>
              )}{" "} */}
              <Link href={"/contact"}>문의하기</Link>
            </div>
            <div>
              {token ? (
                <button onClick={() => logout()}>로그아웃</button>
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

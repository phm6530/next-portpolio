"use client";
import classes from "./GlobalNav.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/Grid";
import useStore from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import NavUserProfile from "@/components/Header/components/NavUserProfile";

export default function GlobalNav({ token }: { token: string | null }) {
  const store = useStore();
  const pathname = usePathname();
  const router = useRouter();

  /** 로그아웃 */
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      return requestHandler(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/logout`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Content-Type 설정 필요
          },
          credentials: "include", // HttpOnly 리프래시  토큰 삭제
        });
      });
    },
    onSuccess: () => {
      // alert("로그아웃 되었습니다.");
      store.setRemoveUser(); // 유저 정보 삭제
      router.refresh(); // 서버 컴포넌트 새로고침
    },
    onError: () => {
      router.refresh();
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

              <Link href={"/contact"}>문의하기</Link>
            </div>

            <div>
              {token ? (
                <>
                  <NavUserProfile />

                  <button className={classes.logOut} onClick={() => logout()}>
                    로그아웃
                  </button>
                </>
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

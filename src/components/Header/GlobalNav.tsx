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
import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import { SessionStorage } from "@/utils/sessionStorage-token";
import { useEffect } from "react";

// type ExtendNumber<T extends number> = T;
// type ExtendLiteral<T extends 0> = T;
// type Example1 = string | never; // Example1은 string으로 축소됨
// type Example2 = number | never; // Example2는 number로 축소됨

// type SubTypeliteral = 0;
// type SuperTypeNumber = number;

// type isNumber = ExtendNumber<SuperTypeNumber | SubTypeliteral>;
// type isLiteral = ExtendLiteral<SuperTypeNumber>; // Error

// let myAny: any;
// let num: number = myAny;
// myAny = num;

// type Func1 = (a: number, b: number) => void;
// type Func2 = (a: number) => void;

// let func1: Func1 = (a, b) => {};
// let func2: Func2 = (a) => {};

// func1 = func2; // ✅
// func2 = func1; // ❌

export default function GlobalNav({ token }: { token: string | null }) {
  const store = useStore();
  const pathname = usePathname();
  const router = useRouter();

  //리프래시는 없는데 엑세스는 남았을떄 정리해버리기
  useEffect(() => {
    if (!token && SessionStorage.getAccessToken()) {
      SessionStorage.removeAccessToken();
    }
  }, [token]);

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
      SessionStorage.removeAccessToken();
      queryClient.removeQueries({
        queryKey: [QUERY_KEY.USER_DATA],
      }); //유저데이터 삭제
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
              <Link href={"/list"}>Project..D</Link>
            </div>
            <div className={classes.contentsLink}>
              {/* <Link href={"/about"}>사용법</Link> */}
              <Link href={"/list"}>
                템플릿 리스트
                <span className={classes.new}>NEW</span>
              </Link>
              <Link href={"/made"}>템플릿 만들기</Link>
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

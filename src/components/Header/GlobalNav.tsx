"use client";
import classes from "./GlobalNav.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/Grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import NavUserProfile from "@/components/Header/components/NavUserProfile";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import Logo from "../logo/logo";
import { useQueryReset } from "@/utils/queryClientReset";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BackDrop from "../modal/BackDrop";

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

export default function GlobalNav() {
  const pathname = usePathname();
  const router = useRouter();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  useEffect(() => {
    setView(false);
  }, [pathname]);

  const [view, setView] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { resetUserQueries } = useQueryReset();

  /** 로그아웃 */
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      return requestHandler(async () => {
        return await fetch(`${BASE_NEST_URL}/auth/logout`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Content-Type 설정 필요
          },
          credentials: "include", // HttpOnly 리프래시  토큰 삭제를 위해 설정했음
        });
      });
    },
    onSuccess: async () => {
      resetUserQueries();
      alert("로그아웃 되었습니다.");
      router.refresh();
    },
    onError: () => {
      router.refresh();
    },
  });

  useEffect(() => {
    setMount(true);

    // 모바일 여부 판단
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px 이하일 경우 모바일로 판단
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className={classes.header}>
        <Grid.center>
          <div className={classes.grid}>
            {/* Burger Menu */}
            <div
              className={classes.burgerMenu}
              onClick={() => setView((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <nav
              className={`${classes.nav} ${
                view ? classes.view : classes.noneView
              }`}
            >
              <div className={classes.logoWrapper}>
                <Logo link />
              </div>
              <div className={classes.contentsLink}>
                {/* <Link href={"/about"}>사용법</Link> */}
                <Link href={"/list"}>
                  템플릿 리스트
                  <span className={classes.new}>NEW</span>
                </Link>
                <Link href={"/made"}>템플릿 만들기</Link>
                <Link href={"/community"}>커뮤니티</Link>
              </div>

              {isMobile && user && (
                <div className={classes.mobileMypage}>마이페이지</div>
              )}
            </nav>

            <div className={classes.loginWrapper}>
              {user ? (
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
          </div>
        </Grid.center>
      </header>
      {mount &&
        view &&
        isMobile && // 모바일 환경에서만 렌더링
        createPortal(
          <BackDrop onClick={() => setView((prev) => !prev)} />,
          document.getElementById("backdrop-portal") as HTMLDivElement
        )}
    </>
  );
}

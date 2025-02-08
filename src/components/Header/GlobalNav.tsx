"use client";
import classes from "./GlobalNav.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/Grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import NavUserProfile from "@/components/Header/components/NavUserProfile";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import Logo from "../logo/logo";
import { useQueryReset } from "@/utils/queryClientReset";
import { createPortal } from "react-dom";
import BackDrop from "../modal/BackDrop";
import NavLink from "./components/NavLink";
import useMediaQuery from "@/_hook/useMediaQuery";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function GlobalNav() {
  const pathname = usePathname();
  const router = useRouter();

  // 모바일 여부
  const isMobile = useMediaQuery(`(min-width:${768}px)`);
  const [navView, setNavView] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const { resetUserQueries } = useQueryReset();

  const prevPath = useRef<string | null>(null);

  // 닫기
  const mobileNavClose = () => setNavView(false);

  // 그냥 store 안만들고 path변경 시 닫아버리기
  useEffect(() => {
    if (prevPath.current && prevPath.current !== pathname) {
      mobileNavClose();
    }
    prevPath.current = pathname;
  }, [pathname]);

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
      toast.success("로그아웃 되었습니다.");
      router.refresh();
    },
    onError: () => {
      router.refresh();
    },
  });

  return (
    <>
      <header className={classes.header}>
        <Grid.center>
          <div className={classes.grid}>
            {/* Burger Menu */}
            <div className={classes.burgerMenu} onClick={() => setNavView(true)}>
              <Menu />
            </div>

            {/* Store에 따라 모바일 뷰 */}
            <nav className={`${classes.nav} ${navView ? classes.view : classes.noneView}`}>
              <div className={classes.logoWrapper}>
                <Logo link />
              </div>

              <div className={classes.contentsLink}>
                <NavLink href={"/list"}>
                  템플릿 리스트
                  <span className={classes.new}>NEW</span>
                </NavLink>
                <NavLink href={"/made"}>템플릿 만들기</NavLink>
                <NavLink href={"/community"}>커뮤니티</NavLink>
              </div>
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
      {!isMobile &&
        navView && // 모바일 환경에서만 렌더링
        createPortal(
          <BackDrop onClick={mobileNavClose} />,
          document.getElementById("backdrop-portal") as HTMLDivElement
        )}
    </>
  );
}

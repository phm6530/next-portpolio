"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/Grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useRouter } from "next/navigation";
import HeaderNavProfile from "./header-nav-profile";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import Logo from "../../logo/logo";
import { useQueryReset } from "@/utils/queryClientReset";

import BackDrop from "../../modal/BackDrop";
import NavLink from "@/components/ui/nav-link";
import useMediaQuery from "@/_hook/useMediaQuery";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import { BREAKPOINT } from "@/types/ui.type";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { createPortal } from "react-dom";

export enum PATHNAME {
  LIST = "list",
  MADE = "made",
  COMMUNITY = "community",
}

const PATH = [
  { label: "템플릿 리스트", path: PATHNAME.LIST, new: true },
  { label: "템플릿 만들기", path: PATHNAME.MADE },
  { label: "커뮤니티", path: PATHNAME.COMMUNITY },
];

export default function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();

  // 모바일 여부
  const isMobile = useMediaQuery(`(min-width:${BREAKPOINT.MD}px)`);
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
            "Content-Type": "application/json",
          },
          credentials: "include", // HttpOnly 리프래시  토큰 삭제를 위해 설정했음
        });
      });
    },
    onSuccess: async () => {
      resetUserQueries();
      toast.success("로그아웃 되었습니다.");
      router.refresh(); // refresh 해버리기
    },
    onError: () => {
      router.refresh(); // refresh 해버리기
    },
  });

  const pathActive = (path: PATHNAME) => {
    if (pathname === "/" && path === "list") {
      return true;
    }
    return pathname.startsWith(`/${path}`);
  };

  return (
    <>
      <header className="bg-white/70 dark:bg-background/90 fixed w-full flex items-center z-10 border-b h-[60px] backdrop-blur-sm">
        <Grid.center>
          <div className="flex w-full justify-between items-center md:grid md:grid-cols-[2fr_3fr_2fr] ">
            {/* Store에 따라 모바일 뷰 */}

            <div className="max-w-[80px] w-full">
              <Logo link />
            </div>

            <nav
              className={cn(
                " flex-col pt-5 md:pt-0  top-[59px] dark:bg-background/90 backdrop-blur-sm  fixed md:static right-[-80%] w-[80%] md:w-auto md:h-auto md:bg-transparent h-screen bg-card/90 md:flex-row flex md:gap-7 text-sm md:justify-center justify-start",
                !isMobile && navView && "right-0",
                !isMobile && "transition-all ease-in "
              )}
            >
              {" "}
              {!isMobile && (
                <>
                  {user ? (
                    <div className="ml-5 border-l  flex mb-5 bg-card border">
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        asChild
                        className="text-[12px] mr-3 "
                      >
                        <Link href={"/mypage"}>마이페이지</Link>
                      </Button>
                      <HeaderNavProfile />
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className="text-[12px] ml-4"
                        onClick={() => logout()}
                      >
                        로그아웃
                      </Button>
                    </div>
                  ) : (
                    <Link href={`/auth/login?redirect=${pathname}`}>
                      로그인
                    </Link>
                  )}
                </>
              )}
              {PATH.map((obj) => {
                return (
                  <div
                    className="flex items-start justify-start px-5 py-3 md:p-0"
                    key={`link-${obj.path}`}
                  >
                    <NavLink
                      href={`/${obj.path}`}
                      active={() => pathActive(obj.path)}
                      className="h-5 items-start"
                    >
                      {obj.label}
                    </NavLink>
                    {obj.new && (
                      <div className="text-[11px] px-2 ml-2  bg-[rgb(255,218,218)] rounded-full text-red-500 ">
                        new
                      </div>
                    )}
                  </div>
                );
              })}
              {!isMobile && (
                <Button
                  className="mx-5 max-w-[150px] mt-10 text-[12px]"
                  asChild
                >
                  <Link href={"/made"} className="text-[12px]">
                    + 템플릿 만들기
                  </Link>
                </Button>
              )}
            </nav>

            {!isMobile ? (
              <Menu
                className="cursor-pointer"
                onClick={() => setNavView((prev) => !prev)}
              />
            ) : (
              <div className="flex items-center justify-end ">
                {user ? (
                  <div className="ml-5 border-l  flex ">
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      asChild
                      className="text-[12px] mr-3 "
                    >
                      <Link href={"/mypage"}>마이페이지</Link>
                    </Button>
                    <HeaderNavProfile />
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="text-[12px] ml-4"
                      onClick={() => logout()}
                    >
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <Link href={`/auth/login?redirect=${pathname}`}>로그인</Link>
                )}
              </div>
            )}
          </div>
        </Grid.center>
      </header>

      {!isMobile && navView && <BackDrop onClick={mobileNavClose} />}
    </>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/Grid";
import LogoWrapper from "../../ui/logo-wrapper";

import NavLink from "@/components/ui/nav-link";
import useMediaQuery from "@/_hook/useMediaQuery";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { BREAKPOINT } from "@/types/ui.type";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import HeaderAuthController from "./header-auth-controller";
import BackDropPortal from "@/components/ui/backdrop-portal";

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

  // 모바일 여부
  const isDesktop = useMediaQuery(`(min-width:${BREAKPOINT.MD}px)`);
  const [navView, setNavView] = useState<boolean>(false);

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
          <div className="flex w-full justify-between items-center md:grid md:grid-cols-[1fr_3fr_auto] ">
            {/* Store에 따라 모바일 뷰 */}

            <LogoWrapper link maxWidth={80} />

            <nav
              className={cn(
                "md:pt-0 top-[59px] md:static md:px-0 md:border-none md:w-auto md:h-auto md:bg-transparent dark:md:bg-transparent md:flex-row md:gap-7 md:justify-center",
                "fixed flex flex-col border-l px-5 gap-5 pt-5 right-[-100%] items-start dark:bg-background/90 w-calc-80 h-screen bg-card/90 justify-start text-sm transition-[right] ease-in-out duration-500",
                !isDesktop && navView && "right-[0%]"
              )}
            >
              {" "}
              {/* Desktop */}
              <HeaderAuthController className="rounded-sm md:hidden block  w-full border p-2" />
              {PATH.map((obj) => {
                return (
                  <div
                    className="flex items-start justify-start md:p-0"
                    key={`link-${obj.path}`}
                  >
                    <NavLink
                      href={`/${obj.path}`}
                      active={() => pathActive(obj.path)}
                      className="h-5 items-start w-full flex p-3 md:p-0"
                    >
                      {obj.label}
                      {obj.new && (
                        <div className="text-[11px] px-2 ml-2  bg-[rgb(255,218,218)] rounded-full text-red-500 ">
                          new
                        </div>
                      )}
                    </NavLink>
                  </div>
                );
              })}
              <Button asChild className="md:hidden mt-6 !text-sm">
                <Link href={"/made"} style={{ fontSize: "12px !important" }}>
                  + 템플릿 만들기
                </Link>
              </Button>
            </nav>

            {/* Mobile menu */}
            <Menu
              className="cursor-pointer md:hidden"
              onClick={() => setNavView((prev) => !prev)}
            />

            {/* Desktop */}
            <HeaderAuthController className="md:!flex hidden" />
          </div>
        </Grid.center>
      </header>

      {!isDesktop && navView && <BackDropPortal onClick={mobileNavClose} />}
    </>
  );
}

import { serverSession } from "@/utils/serverSession";
import { NextRequest, NextResponse } from "next/server";
import { ERROR_CODE } from "./codeMsg";

const PATH = {
  LOGIN: "/auth/login",
} as const;

const AUTH_REQUIRED_PATHS = ["/made", "/mypage"] as const;

export async function middleware(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname;
  const qs = req.nextUrl.searchParams;

  // get Token
  const token = serverSession();

  //로그인 페이지인데 로그인 되어있을때 ReDirect 시켜버리기
  if (pathname.startsWith(PATH.LOGIN) && token) {
    const path = qs.get("redirect") || "/";
    return NextResponse.redirect(new URL(path, req.nextUrl.origin));
  }

  const authPath = AUTH_REQUIRED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (authPath && !token) {
    const path = `/auth/login?redirect=${pathname}&code=${ERROR_CODE.AUTH_001}`;
    return NextResponse.redirect(new URL(path, req.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/auth/login", ...AUTH_REQUIRED_PATHS.map((e) => `${e}/:path*`)],
};

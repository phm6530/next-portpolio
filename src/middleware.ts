import { NextRequest, NextResponse } from "next/server";
import { ERROR_CODE } from "./config/codeMsg";
import withAuthFetch from "./utils/withAuthFetch";

const AUTH_REDIRECT_PATHS = [
  "/auth/login",
  "/auth/signup",
  "/auth/pin",
] as const;
const AUTH_REQUIRED_PATHS = ["/made", "/mypage"] as const;

type Pathname = (typeof AUTH_REDIRECT_PATHS)[number];

export async function middleware(req: NextRequest, res: NextResponse) {
  const pathname = req.nextUrl.pathname as Pathname;

  // get Token
  const token = req.cookies.get("token")?.value;

  //로그인 페이지인데 로그인 되어있을때 ReDirect 시켜버리기
  if (AUTH_REDIRECT_PATHS.includes(pathname) && token) {
    const path = "/";
    return NextResponse.redirect(new URL(path, req.nextUrl.origin));
  }

  const authPath = AUTH_REQUIRED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (authPath) {
    const encodedPath = encodeURIComponent(pathname);
    const redirectPath = `/auth/login?redirect=${encodedPath}&code=${ERROR_CODE.UNAUTHORIZED}`;
    //권한이 필요 한페이지인데 TOken이 없을떄 ,
    if (!token)
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));

    try {
      const isAuthenticated = await withAuthFetch("auth/verify", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!isAuthenticated) {
        return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
      }
    } catch (error) {
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl.origin));
    }
  }
}

export const config = {
  matcher: [
    ...AUTH_REDIRECT_PATHS,
    ...AUTH_REQUIRED_PATHS.map((e) => `${e}/:path*`),
  ],
};

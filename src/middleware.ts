import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl;
  const urlKey = url.pathname.split("/").pop();

  const session = await auth(); // req를 전달하여 쿠키를 확인

  // 어드민일 때는 인증 절차를 건너뜀
  if (session && session.user.role === "admin") {
    return NextResponse.next();
  }

  //로그인할떄
  if (url.pathname.startsWith("/admin")) {
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(
        new URL(`/auth/login?redirect=${url.pathname}`, url.origin)
      );
    }
  }
  //핀번호 리다이렉트
  else if (url.pathname.startsWith("/template/admin")) {
    if (!session) {
      return NextResponse.redirect(
        new URL(`/auth/pin?redirect=${url.pathname}`, url.origin)
      );
    }

    // 현재 URL의 key와 세션의 template_key가 일치하지 않으면 리디렉션
    if (
      session.user.role === "anonymous" &&
      urlKey !== session.user.template_key
    ) {
      return NextResponse.redirect(
        new URL(`/auth/pin?redirect=${url.pathname}`, url.origin)
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/template/admin/:template_key*"],
};

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  console.log(`미들웨어 실행 for ${req.url}`);

  const session = await auth(); // req를 전달하여 쿠키를 확인

  if (!session) {
    const currentUrl = new URL(req.url);
    const redirectPath = currentUrl.pathname;

    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${redirectPath}`, currentUrl.origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

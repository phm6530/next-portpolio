import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  // const accessToken = req.cookies.get("access_token");
  // if (!accessToken) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url)); // 절대 경로 사용
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/made/:path*"],
};

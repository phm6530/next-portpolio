import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(req: NextRequest) {
  console.log(`Middleware is running for ${req.url}`);

  const session = await auth(); // req를 전달하여 쿠키를 확인

  console.log("Session:", session);

  const currentUrl = new URL(req.url);
  const redirectPath = currentUrl.pathname;

  if (!session) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirect=${redirectPath}`, currentUrl.origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/contact/:path*"],
};

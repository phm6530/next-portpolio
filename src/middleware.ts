import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
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

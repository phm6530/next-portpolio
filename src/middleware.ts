import { redirect } from "next/navigation";
import { serverSession } from "@/utils/serverSession";
import { NextRequest, NextResponse } from "next/server";

enum PATH {
  login = "/auth/login",
}

export async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;
  const qs = req.nextUrl.searchParams;
  const token = serverSession();

  //로그인 페이지인데 로그인 되어있을때 ReDirect 시켜버리기
  if (path === PATH.login && token) {
    console.log("토큰있음 안와도됨");
    console.log(qs.get("redirect"));
  }
}

export const config = {
  matcher: ["/auth/login"],
};

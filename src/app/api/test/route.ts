import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const request = req.headers.get("x-id");
  console.log("첫번쨰 요청");
  console.log("header : ", request);
  return NextResponse.json({ message: "success!" });
}

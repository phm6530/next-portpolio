import { ApiError, apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      throw new ApiError("인증 에러", 401);
    }

    // JSON 응답
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return apiErrorHandler(error); // 에러를 처리하고 클라이언트로 응답
  }
}

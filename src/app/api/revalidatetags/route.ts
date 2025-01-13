import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Next는 Return 꼭해야함 그만좀 까먹자 ㅠ
export async function POST(req: NextRequest) {
  try {
    const { tag } = await req.json();

    // 요청 검증
    if (!tag) {
      return NextResponse.json(
        { error: "누락된 값이 있습니다." },
        { status: 400 }
      );
    }

    // 캐시 태그 갱신
    revalidateTag(tag);

    return NextResponse.json({
      message: "Cache revalidated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 } // 500 Internal Server Error
    );
  }
}

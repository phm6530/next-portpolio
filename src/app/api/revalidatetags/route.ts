import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Next는 Return 꼭해야함 그만좀 까먹자 ㅠ
export async function POST(req: NextRequest) {
  try {
    const { tags } = await req.json();
    console.log(tags);

    // 요청 검증
    if (!Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: "누락된 값이 있습니다." },
        { status: 400 } // 400 Bad Request
      );
    }

    // 반복처리
    tags.forEach((tag) => revalidateTag(tag));

    // 캐시 태그 갱신
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

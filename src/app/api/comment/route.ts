import {
  getCommentList,
  postComment,
} from "@/app/api/_service/template/commentService";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

//초기 Comment 가져오기
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    //get할 template Id
    const templateId = searchParams.get("templateId");

    if (!templateId) {
      throw new Error("template 값 누락");
    }

    const result = await getCommentList(+templateId);

    console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    return apiErrorHandler(error);
  }
}

// Post 가져오기
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    const data = await req.json();

    if (session) {
      // 아직 미 개발, ,,
    } else {
      //익명 댓글
      await postComment(data);
    }
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function DELETE() {
  try {
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

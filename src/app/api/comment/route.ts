import {
  chkPasswordMatch,
  chkUserMessage,
  getCommentList,
  postComment,
  removeMessage,
} from "@/app/api/_service/template/commentService";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { withRequest } from "@/app/lib/helperServer";

//초기 Comment 가져오기
export async function GET(req: NextRequest) {
  return withRequest(async () => {
    const searchParams = req.nextUrl.searchParams;

    //get할 template Id
    const templateId = searchParams.get("templateId");
    if (!templateId) {
      throw new Error("template 값 누락");
    }
    return getCommentList(+templateId);
  });
}

// Post 가져오기
export async function POST(req: NextRequest) {
  return withRequest(async () => {
    const data = await req.json();

    // 댓글
    const rows = await postComment(data);

    if (rows.affectedRows === 0) {
      throw new Error("서버 오류");
    }
    return { message: "success" };
  });
}

//Comment 삭제로직
export async function DELETE(req: NextRequest) {
  const session = await auth();

  try {
    const {
      comment_id,
      reply_id,
      msgPassword: password,
      msgRole,
    } = await req.json();

    //result_comment - 댓글
    //result_reply - 대댓글
    const targetTable = comment_id
      ? "result_comment"
      : reply_id
      ? "result_reply"
      : (null as never);

    // 세션이 있는 경우 (회원 및 관리자)
    if (session && msgRole !== "visitor") {
      const { user_id, role } = session.user;

      // 운영자
      if (role === "admin" && msgRole === "admin") {
        //세션의 오너가 맞는지 확인
        const isOnwer = await chkUserMessage(
          targetTable,
          user_id,
          comment_id || reply_id
        );
        if (!isOnwer) throw new Error("관리자 댓글은 삭제할 수 없습니다.");
      }

      // 일반 회원
      else if (role === "user") {
        //유저 아직 없음
      }
    }

    // 세션이 있거나 세션이 있어도 익명자는 패스워드 넣어야함
    else if (!session || session.user.role === "anonymous") {
      //익명이면 password 받음
      await chkPasswordMatch(targetTable, password, comment_id || reply_id);
    }

    //공통 삭제
    const result = await removeMessage(targetTable, comment_id || reply_id);
    if (result.affectedRows === 0) {
      throw new Error("이미 삭제 되었거나 존재하지 않는 댓글입니다.");
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

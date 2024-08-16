import bcrypt from "bcrypt";
import {
  getCommentList,
  postComment,
} from "@/app/api/_service/template/commentService";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { withConnection } from "@/app/lib/helperServer";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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

export async function DELETE(req: NextRequest) {
  try {
    const { comment_id, reply_id, msgPassword: password } = await req.json();

    const targetTable = comment_id
      ? "result_comment"
      : reply_id
      ? "result_reply"
      : (null as never);

    const { password: getPassword } = await withConnection<RowDataPacket>(
      async (conn) => {
        const sql = `
        SELECT password FROM ${targetTable} rc
        JOIN 
          user_visitor uv
        ON 
          rc.visitor_id = uv.id
        where 
          rc.id = ?;
      `;
        const [rows] = await conn.query<RowDataPacket[]>(sql, [
          comment_id || reply_id,
        ]);
        return rows[0];
      }
    );

    if (!getPassword || !password) {
      throw new Error("비밀번호 또는 저장된 비밀번호가 없습니다.");
    }

    //비밀번호 매치 확인
    const match = await bcrypt.compare(password, getPassword);

    if (!match) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const [result] = await withConnection(async (conn) => {
      const sql = `
        DELETE FROM ${targetTable} where id = ?;
      `;
      return conn.query<ResultSetHeader>(sql, [comment_id || reply_id]);
    });
    if (result.affectedRows === 0) {
      throw new Error("이미 삭제 되었거나 존재하지 않는 댓글입니다.");
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

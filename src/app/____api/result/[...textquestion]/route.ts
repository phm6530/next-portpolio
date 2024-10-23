import { selectTextCnt } from "@/app/api/_dao/template/SurveyRepository";
import { apiErrorHandler } from "@/util/apiErrorHandler";
import { withTransaction } from "@/util/server/serverUtill";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { textquestion: string[] } }
) {
  const [templateId, questionId, page] = params.textquestion;

  try {
    const offset = (+page - 1) * 10;

    const [rows, responseCnt] = await withTransaction(async (conn) => {
      //댓글 가져오기
      const sql = `
            SELECT pr.gender , pr.age_group as age , sa.answer_value as value FROM survey_answers as sa 
            join 
                survey_question as sq ON sq.id = sa.question_id 
            join 
                participants_recodes as pr on pr.id = sa.participants_id
            where 
                sa.template_meta_id = ? AND sq.id = ? 
            order by 
                sa.id desc 
            limit 10 offset ?;
      `;
      const [rows] = await conn.query<RowDataPacket[]>(sql, [
        templateId,
        questionId,
        offset,
      ]);

      const responseCnt = await selectTextCnt(conn, templateId, questionId);

      return [rows, responseCnt];
    });

    const nextPage = +offset + rows.length > responseCnt.cnt;

    console.log(nextPage);

    //형변환
    const results = rows.map((e) => {
      return { ...e, age: +e.age };
    });

    return NextResponse.json({
      results,
      nextPage: nextPage ? +page + 1 : false,
    });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

import {
  getSurveyDetail,
  postSurveyDetail,
} from "@/app/api/_service/template/surveySerivce";
import { ApiError, apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { withConnection, withRequest } from "@/app/lib/helperServer";
import { auth } from "@/auth";
import { PostAddsurveyDetailProps, TemplateTypeProps } from "@/types/template";
import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

// GET Detail Survey
export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: { detail: [TemplateTypeProps, string] };
  }
) {
  try {
    const [templateType, DetailId] = params.detail;
    if (templateType === "survey") {
      const result = await getSurveyDetail(DetailId);

      return NextResponse.json(result);
    } else {
      throw new Error("잘못된 경로 입니다.");
    }
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: { detail: [TemplateTypeProps, string] };
  }
) {
  const [templateType, DetailId] = params.detail;

  try {
    if (templateType === "survey") {
      //Data
      const data: PostAddsurveyDetailProps = await req.json();
      await postSurveyDetail(data, DetailId);
      // JSON 응답

      return NextResponse.json({ suceess: 1 });
    } else {
      throw new Error("잘못된 경로 입니다.");
    }
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { detail: [string] } }
) {
  return withRequest(async () => {
    const session = await auth();
    console.log(session);

    if (!params.detail[0]) {
      throw new ApiError("필요한 정보가 누락되었습니다.", 403);
    }

    await withConnection(async (conn) => {
      const sql = `DELETE FROM template_meta WHERE template_key = ?`;
      const [rows] = await conn.query<ResultSetHeader>(sql, [params.detail[0]]);
    });

    return { message: "delete" };
  });
}

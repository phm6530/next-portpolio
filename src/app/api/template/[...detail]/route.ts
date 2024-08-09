import { getSurveyDetail } from "@/app/api/_service/template/surveySerivce";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { TemplateProps } from "@/types/template";
import { NextResponse } from "next/server";

// GET Detail Survey
export async function GET(
  _: NextResponse,
  {
    params,
  }: {
    params: { detail: [TemplateProps, string] };
  }
) {
  try {
    const [templateType, DetailId] = params.detail;
    if (templateType === "survey") {
      const result = await getSurveyDetail(DetailId);
      // JSON 응답
      return NextResponse.json(result);
    } else {
      throw new Error("잘못된 경로 입니다.");
    }
  } catch (error) {
    return apiErrorHandler(error);
  }
}

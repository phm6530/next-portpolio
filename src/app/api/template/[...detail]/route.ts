import {
  getSurveyDetail,
  postSurveyDetail,
} from "@/app/api/_service/template/surveySerivce";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { PostAddsurveyDetailProps, TemplateProps } from "@/types/template";
import { NextRequest, NextResponse } from "next/server";

// GET Detail Survey
export async function GET(
  _: NextRequest,
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
    params: { detail: [TemplateProps, string] };
  }
) {
  const [templateType, DetailId] = params.detail;

  try {
    if (templateType === "survey") {
      //Data
      const data: PostAddsurveyDetailProps = await req.json();
      await postSurveyDetail(data, DetailId);
      // JSON 응답
      console.log("Post 성공");
      return NextResponse.json({ suceess: 1 });
    } else {
      throw new Error("잘못된 경로 입니다.");
    }
  } catch (error) {
    return apiErrorHandler(error);
  }
}

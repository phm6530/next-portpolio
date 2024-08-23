import {
  postAddTemplate,
  getTemplateList,
  getTemplateAllCnt,
} from "@/app/api/_service/template/templateSerivce";
import { ApiError, apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { RequestSurveyFormProps } from "@/types/templateSurvey";
import { NextRequest, NextResponse } from "next/server";
import { QUERY_STRING } from "@/types/constans";
import { auth } from "@/auth";

// template List Get
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const pageParams = searchParams.get(QUERY_STRING.PAGE);

    const page = pageParams !== null ? parseInt(pageParams, 10) : 1;

    const search = searchParams.get(QUERY_STRING.SEARCH) || "";
    const sort = searchParams.get(QUERY_STRING.SORT) || null;

    const result = await getTemplateList(page, search, sort);
    const listCnt = await getTemplateAllCnt(search, sort);

    // JSON 응답
    return NextResponse.json({ result, cnt: listCnt });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

//Template Post Controller
export async function POST(req: NextRequest) {
  const session = await auth();
  try {
    const data: RequestSurveyFormProps = await req.json();

    console.log(data);

    if (!session) {
      await postAddTemplate(data);
    } else if (session && session.user.role === "admin") {
      throw new ApiError("아직 미완료", 400);
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

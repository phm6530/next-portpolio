import {
  postAddTemplate,
  getTemplateList,
  getTemplateAllCnt,
} from "@/app/api/_service/template/templateSerivce";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import { templateMetaProps } from "@/types/template";
import { NextRequest, NextResponse } from "next/server";
import { QUERY_STRING } from "@/types/constans";

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
  try {
    const data: AddSurveyFormProps & templateMetaProps = await req.json();
    await postAddTemplate(data);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

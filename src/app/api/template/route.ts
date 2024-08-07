import {
  postAddTemplate,
  getTemplateList,
} from "@/app/api/_service/template/templateSerivce";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import { templateMetaProps } from "@/types/template";
import { NextRequest, NextResponse } from "next/server";

// template List Get
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const pageParams = searchParams.get("page");
    const page = pageParams !== null ? parseInt(pageParams, 10) : 1;

    const result = await getTemplateList(page);

    // JSON 응답
    return NextResponse.json(result);
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
    console.log(error.message);
    return apiErrorHandler(error);
  }
}

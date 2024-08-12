import { selectTotalCnt } from "@/app/api/_dao/template/templateRepository";
import { selectResultDetail } from "@/app/api/result/_dao";
import { apiErrorHandler } from "@/app/lib/apiErrorHandler";
import { withTransition } from "@/app/lib/helperServer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // TemplateId
    const templateId = searchParams.get("templateId");
    if (!templateId || !!isNaN(Number(templateId))) {
      throw new Error("잘못된 경로 ...");
    }

    //Transtion
    const result = await withTransition(async (conn) => {
      //Detail
      const rows = await selectResultDetail(conn, templateId);

      //Template 수
      const cnt = await selectTotalCnt(conn, templateId);
      return { rows, cnt: cnt.user_cnt as number };
    });

    return NextResponse.json({ result });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

import { selectTemlateDetail } from "@/app/api/_dao/template/templateRepository";
import { withConnection } from "@/app/lib/helperServer";
import { surveyDetailProps } from "@/types/templateSurvey";
import { RowDataPacket } from "mysql2";

export async function getSurveyDetail(
  DetailId: string
): Promise<surveyDetailProps> {
  const result = await withConnection<RowDataPacket[]>(async (conn) => {
    return selectTemlateDetail(conn, DetailId);
  });

  const returnData: surveyDetailProps = {
    id: result[0].id,
    title: result[0].title,
    description: result[0].description,
    created_at: result[0].created_at,
    template: result[0].template,
  };

  return returnData;
}

import { BASE_NEST_URL } from "@/config/base";
import { SurveyResult } from "@/types/surveyResult.type";
import requestHandler from "@/utils/withFetch";

//Survey Result Data
export async function fetchSurveyData(id: string): Promise<SurveyResult> {
  return requestHandler(async () => {
    return await fetch(`${BASE_NEST_URL}/answer/survey/${id}`, {
      cache: "no-store",
      next: { revalidate: 60 },
    });
  });
}

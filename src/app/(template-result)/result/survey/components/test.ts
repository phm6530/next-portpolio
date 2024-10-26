import { BASE_NEST_URL } from "@/config/base";
import { SurveyResult } from "@/types/surveyResult.type";
import requestHandler from "@/utils/withFetch";

//Survey Result Data
export async function fetchSurveyData<T>(id: string): Promise<T> {
  return requestHandler(async () => {
    return await fetch(`${BASE_NEST_URL}/answer/survey/${id}`, {
      cache: "no-store",
    });
  });
}

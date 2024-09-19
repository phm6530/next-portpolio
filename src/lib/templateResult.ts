import { withFetch } from "@/util/clientUtil";
import { GetTemplateDetailMetaProps } from "@/types/template";
import { ResultQuestion } from "@/types/templateSurvey";
import { BASE_URL } from "@/config/base";

export async function fetchDetailResult(id: number) {
  return withFetch<{
    templateResult: { questions: ResultQuestion[] };
    templateMeta: GetTemplateDetailMetaProps;
  }>(() => {
    return fetch(`${BASE_URL}/api/result?templateId=${id}`, {
      cache: "force-cache",
    });
  });
}

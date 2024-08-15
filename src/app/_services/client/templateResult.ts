import { withFetch } from "@/app/lib/helperClient";
import { GetTemplateDetail } from "@/types/template";
import { ResultQuestion } from "@/types/templateSurvey";

export async function fetchDetailResult(id: number) {
  return withFetch<{
    templateResult: { questions: ResultQuestion[] };
    templateMeta: GetTemplateDetail;
  }>(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/result?templateId=${id}`,
      {
        cache: "no-cache",
      }
    );
  });
}

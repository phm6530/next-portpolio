import { withFetch } from "@/app/lib/helperClient";
import { SurveyItemProps, TemplateProps } from "@/types/survey";

//getList
export function getList(): Promise<SurveyItemProps[]> {
  return withFetch<SurveyItemProps[]>(() => {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/template`, {
      next: {
        revalidate: 10,
      },
    });
  });
}

//Template 디테일
export function getTemplateDetail(
  templateType: TemplateProps,
  id: string
): Promise<SurveyItemProps> {
  return withFetch<SurveyItemProps>(() => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${templateType}/${id}`,
      {
        next: {
          revalidate: 10,
          tags: ["surveyItem", id],
        },
      }
    );
  });
}

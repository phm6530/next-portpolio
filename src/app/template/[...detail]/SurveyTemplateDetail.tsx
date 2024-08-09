"use client";

import LoadingSpier from "@/app/_components/ui/loading/LoadingSpiner";
import { fetchTemplateDetail } from "@/app/_services/surveySerivce";
import { TemplateUnionType } from "@/app/template/[...detail]/page";
import { surveyDetailProps } from "@/types/templateSurvey";
import { useQuery } from "@tanstack/react-query";

export default function SurveyTemplateDetail({
  templateType,
  surveyId,
}: {
  templateType: TemplateUnionType;
  surveyId: number;
}) {
  const { isLoading, data } = useQuery({
    queryKey: [templateType, surveyId],
    queryFn: () =>
      fetchTemplateDetail<surveyDetailProps>(templateType, +surveyId),
    staleTime: 10000,
  });

  if (isLoading) {
    return <LoadingSpier />;
  }

  if (data) {
    return (
      <>
        <h1>{data.title}</h1>

        {data.questions.map((qs) => {
          return (
            <div>
              <div>{qs.id}</div>
              <div>
                {qs.options?.map((e) => {
                  return 1;
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

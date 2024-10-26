"use client";

import ResponseSelect from "@/app/(template-result)/result/survey/components/ResponseSelect";
import { ResponseTexts } from "@/app/(template-result)/result/survey/components/ResponseTexts";

import { fetchSurveyData } from "@/app/(template-result)/result/survey/components/test";
import { QUERY_KEY } from "@/types/constans";
import { QUESTION_TYPE } from "@/types/survey.type";
import { SurveyResult } from "@/types/surveyResult.type";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default function ResultSurveyCharts({ id }: { id: string }) {
  console.log("id:::", id);

  const { data } = useQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => await fetchSurveyData<SurveyResult>(id),
    staleTime: 10000,
  });

  //데이터없으면 notFOund로
  if (!data) {
    return notFound();
  }

  const { questions, respondents } = data;
  const allCnt = respondents.allCnt;

  return (
    <>
      {questions.map((qs, idx) => {
        return (
          <div key={idx}>
            {(() => {
              if (qs.type === QUESTION_TYPE.SELECT) {
                // 객관식 차트
                return <ResponseSelect allCnt={allCnt} {...qs} />;
              } else if (qs.type === QUESTION_TYPE.TEXT) {
                // 주관식 답글
                return <ResponseTexts allCnt={allCnt} {...qs} />;
              } else {
                return null as never;
              }
            })()}
          </div>
        );
      })}
    </>
  );
}

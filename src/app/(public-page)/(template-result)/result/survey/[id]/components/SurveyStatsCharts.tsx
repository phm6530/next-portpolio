"use client";

import ResponseSelect from "@/app/(public-page)/(template-result)/result/survey/[id]/components/ResponseSelect";
import { ResponseTexts } from "./ResponseTexts";
import SurveyGroupFilter, {
  AgeOptions,
  GenderOptions,
} from "@/app/(public-page)/(template-result)/result/survey/[id]/components/SurveyGroupFilter";
import { QUERY_KEY } from "@/types/constans";
import { QUESTION_TYPE } from "@/types/survey.type";
import { ResultSelectOption, SurveyResult } from "@/types/surveyResult.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useState } from "react";
import { fetchSurveyData } from "./test";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResultSurveyCharts({
  templateId,
}: {
  templateId: string;
}) {
  //초깃값
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<{
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  }>({
    genderGroup: "all",
    ageGroup: "all",
  });

  const filterGenderAndAgeGroup = (
    option: ResultSelectOption["response"],
    gender: GenderOptions,
    age: AgeOptions
  ) => {
    //성별 전체 +
    if (gender === "all") {
      return {
        female:
          age === "all" ? option.female : { [age]: option.female![age] ?? 0 },
        male: age === "all" ? option.male : { [age]: option.male![age] ?? 0 },
      };
    } else {
      if (age === "all") {
        return { [gender]: option[gender] };
      } else {
        return { [gender]: { [age]: option[gender]![age] ?? 0 } };
      }
    }
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, templateId],
    queryFn: async () => await fetchSurveyData<SurveyResult>(templateId),
    staleTime: 10000,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.SURVEY_RESULTS, templateId]);
    },
    select: (data) => {
      return {
        ...data,
        questions: data.questions.map((question) => {
          switch (question.type) {
            case QUESTION_TYPE.SELECT:
              return {
                ...question,
                options: question.options.map((option) => {
                  return {
                    ...option,
                    response: {
                      selectUserCnt: option.response.selectUserCnt,
                      ...filterGenderAndAgeGroup(
                        option.response,
                        filter.genderGroup,
                        filter.ageGroup
                      ),
                    },
                  };
                }),
              };
            case QUESTION_TYPE.TEXT:
              // TEXT 질문의 경우 textAnswers 필터링
              return {
                ...question,
              };
            default:
              throw new Error("알 수 없는 질문 유형입니다.") as never;
          }
        }),
      };
    },
  });

  //데이터없으면 notFOund로
  if (!data) {
    return notFound();
  }

  const { questions, respondents, isAgeCollected, isGenderCollected } = data;
  const allCnt = respondents.allCnt;

  return (
    <>
      <div

      //  className="fixed bottom-0 right-0 max-w-[800px] w-[90%] left-[50%] -translate-x-[50%] bg-background z-10 p-5 border rounded-t-lg"
      >
        {/* 필터 */}
        {isAgeCollected && isGenderCollected && (
          <SurveyGroupFilter
            curFilter={filter}
            setFilter={setFilter}
            respondents={data?.respondents}
          />
        )}
      </div>

      <div className="flex flex-col gap-10 mt-6 mb-9">
        {questions.map((qs, idx) => {
          return (
            <Card
              key={`${idx}-card`}
              className="py-5 rounded-3xl border-border"
            >
              <CardHeader>
                <CardTitle>
                  <div className="flex gap-2 items-center">
                    <span className="text-lg md:text-2xl font-Paperlogy text-primary dark:text-indigo-400">
                      Q{idx + 1}.{" "}
                    </span>
                  </div>

                  <div className="mt-10 mb-10">
                    <span>{qs.label}</span>
                    {qs.type === QUESTION_TYPE.TEXT && (
                      <CardDescription className="mt-3 font-normal">
                        해당 문항에 응답입니다. <br />
                        하단의 버튼을 클릭하여 10개씩 추가로 메세지를 가져올 수
                        있습니다.
                      </CardDescription>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              {(() => {
                if (qs.type === QUESTION_TYPE.SELECT) {
                  // 객관식 차트
                  return (
                    <ResponseSelect
                      isAgeCollected={data.isAgeCollected}
                      isGenderCollected={data.isGenderCollected}
                      idx={idx}
                      allCnt={allCnt}
                      {...qs}
                    />
                  );
                } else if (qs.type === QUESTION_TYPE.TEXT) {
                  // 주관식 답글
                  return (
                    <ResponseTexts
                      idx={idx}
                      templateId={templateId}
                      filter={filter}
                      allCnt={allCnt}
                      {...qs}
                    />
                  );
                } else {
                  return null as never;
                }
              })()}
            </Card>
          );
        })}
      </div>
    </>
  );
}

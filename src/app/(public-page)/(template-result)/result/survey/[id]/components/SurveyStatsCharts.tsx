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
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useState } from "react";
import { fetchSurveyData } from "./test";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultSurveyCharts({ id }: { id: string }) {
  //초깃값
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
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => await fetchSurveyData<SurveyResult>(id),
    staleTime: 10000,
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

  const { questions, respondents } = data;
  const allCnt = respondents.allCnt;

  return (
    <>
      {/* 필터 */}
      <SurveyGroupFilter
        curFilter={filter}
        setFilter={setFilter}
        respondents={data?.respondents}
      />

      <div className="flex flex-col gap-10 mt-6">
        {questions.map((qs, idx) => {
          return (
            <Card key={`${idx}-card`} className="py-5">
              <CardHeader>
                <CardTitle>
                  <span className="font-Paperlogy text-indigo-400">
                    Q. {idx + 1}
                  </span>
                  <div className="my-10">{qs.label}</div>
                </CardTitle>
              </CardHeader>
              {(() => {
                if (qs.type === QUESTION_TYPE.SELECT) {
                  // 객관식 차트
                  return (
                    <ResponseSelect
                      idx={idx}
                      selectAgeGroup={filter.ageGroup}
                      selectGenderGroup={filter.genderGroup}
                      allCnt={allCnt}
                      {...qs}
                    />
                  );
                } else if (qs.type === QUESTION_TYPE.TEXT) {
                  // 주관식 답글
                  return (
                    <ResponseTexts
                      idx={idx}
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

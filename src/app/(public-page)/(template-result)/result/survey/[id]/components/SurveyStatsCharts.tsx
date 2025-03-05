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
import { useEffect, useState } from "react";
import { fetchSurveyData } from "./test";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Import, MessageCircleWarning } from "lucide-react";

// 성별 및 나이 필터 함수
const filterGenderAndAgeGroup = (
  option: ResultSelectOption["response"],
  gender: GenderOptions,
  age: AgeOptions
) => {
  if (gender === "all") {
    return {
      female:
        age === "all" ? option.female : { [age]: option?.female?.[age] ?? 0 },
      male: age === "all" ? option.male : { [age]: option?.male?.[age] ?? 0 },
    };
  } else {
    return age === "all"
      ? { [gender]: option[gender] }
      : { [gender]: { [age]: option[gender]?.[age] ?? 0 } };
  }
};

export default function ResultSurveyCharts({
  templateId,
}: {
  templateId: string;
}) {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<{
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  }>({
    genderGroup: "all",
    ageGroup: "all",
  });

  // Query 데이터 가져오기
  const { data, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, templateId, filter],
    queryFn: () => fetchSurveyData<SurveyResult>(templateId),
    staleTime: 10000,
    initialData: () =>
      queryClient.getQueryData([QUERY_KEY.SURVEY_RESULTS, templateId]),
  });

  // 데이터가 없으면 notFound 처리
  if (!data) {
    return notFound();
  }

  const { questions, respondents, isAgeCollected, isGenderCollected } = data;
  const allCnt = respondents.allCnt;

  // 필터된 데이터 반환
  const filterDatas = (
    lists: SurveyResult["questions"]
  ): SurveyResult["questions"] => {
    return lists.map((question) => {
      if (question.type === QUESTION_TYPE.SELECT) {
        console.log(question.options);
        return {
          ...question,
          options: question.options.map((option) => ({
            ...option,
            response: {
              selectUserCnt: option.response.selectUserCnt,
              ...filterGenderAndAgeGroup(
                option.response,
                filter.genderGroup,
                filter.ageGroup
              ),
            },
          })),
        };
      }
      return question;
    });
  };

  return (
    <>
      <div>
        {/* 필터 컴포넌트 */}
        {isAgeCollected && isGenderCollected && (
          <SurveyGroupFilter
            curFilter={filter}
            setFilter={setFilter}
            respondents={data?.respondents}
          />
        )}
      </div>

      <div className="flex flex-col gap-10 mt-6 mb-9">
        {/* 질문을 필터링한 데이터로 렌더링 */}
        {filterDatas(questions).map((qs, idx) => (
          <Card key={`${idx}-card`} className="py-5 rounded-3xl border-border">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-2 items-start justify-between">
                  <span className="text-lg md:text-2xl font-Paperlogy text-primary dark:text-indigo-400">
                    Q{idx + 1}.{" "}
                  </span>{" "}
                </div>
                <div className="mt-10 mb-10 flex flex-col items-start">
                  <span>{qs.label}</span>{" "}
                  {!qs.required && (
                    <p className="flex  rounded-full mt-3 gap-2 text-[12px] items-center  font-normal leading-7  dark:text-indigo-300 ">
                      <Check className="w-5 h-5" />
                      선택 항목으로 전체 수와 상이 할 수 있습니다
                    </p>
                  )}
                </div>
              </CardTitle>
            </CardHeader>

            {/* 객관식 차트 또는 주관식 답글 렌더링 */}
            {qs.type === QUESTION_TYPE.SELECT ? (
              <ResponseSelect
                isAgeCollected={data.isAgeCollected}
                isGenderCollected={data.isGenderCollected}
                idx={idx}
                allCnt={allCnt}
                {...qs}
              />
            ) : qs.type === QUESTION_TYPE.TEXT ? (
              <ResponseTexts
                idx={idx}
                templateId={templateId}
                filter={filter}
                allCnt={allCnt}
                {...qs}
              />
            ) : null}
          </Card>
        ))}
      </div>
    </>
  );
}

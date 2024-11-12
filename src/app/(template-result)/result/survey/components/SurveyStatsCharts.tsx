"use client";

import ResponseSelect from "@/app/(template-result)/result/survey/components/ResponseSelect";
import { ResponseTexts } from "@/app/(template-result)/result/survey/components/ResponseTexts";
import SurveyGroupFilter, {
  AgeOptions,
  GenderOptions,
} from "@/app/(template-result)/result/survey/components/SurveyGroupFilter";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";
import { QUESTION_TYPE } from "@/types/survey.type";
import {
  ResultSelect,
  ResultSelectOption,
  SurveyResult,
} from "@/types/surveyResult.type";
import { GENDER_GROUP } from "@/types/user";
import requestHandler from "@/utils/withFetch";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function ResultSurveyCharts({ id }: { id: string }) {
  //초깃값
  const [filter, setFilter] = useState<{
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  }>({
    genderGroup: "all",
    ageGroup: "all",
  });

  //Filter Group...
  const filterAge = filter.ageGroup === "all" ? false : filter.ageGroup;

  const filterGenderAndAgeGroup = (
    option: ResultSelectOption["response"],
    gender: GENDER_GROUP,
    age: typeof filterAge
  ) => {
    return age && option[gender]![age] !== undefined
      ? {
          [age]: option[gender]![age] ?? 0,
        }
      : option[gender];
  };

  const { data } = useQuery({
    queryKey: [QUERY_KEY.SURVEY_RESULTS, id],
    queryFn: async () => {
      return requestHandler<SurveyResult>(async () => {
        return await fetch(`${BASE_NEST_URL}/answer/survey/${id}`, {
          cache: "no-store",
        });
      });
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
                  if (filter.genderGroup === GENDER_GROUP.FEMALE) {
                    return {
                      ...option,
                      response: {
                        selectUserCnt: option.response.selectUserCnt,
                        female: filterGenderAndAgeGroup(
                          option.response,
                          GENDER_GROUP.FEMALE,
                          filterAge
                        ),
                      },
                    };
                  } else if (filter.genderGroup === GENDER_GROUP.MALE) {
                    return {
                      ...option,
                      response: {
                        selectUserCnt: option.response.selectUserCnt,
                        male: filterGenderAndAgeGroup(
                          option.response,
                          GENDER_GROUP.MALE,
                          filterAge
                        ),
                      },
                    };
                  } else {
                    return {
                      ...option,
                      response: {
                        selectUserCnt: option.response.selectUserCnt,
                        female: filterGenderAndAgeGroup(
                          option.response,
                          GENDER_GROUP.FEMALE,
                          filterAge
                        ),
                        male: filterGenderAndAgeGroup(
                          option.response,
                          GENDER_GROUP.MALE,
                          filterAge
                        ),
                      },
                    };
                  }
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

  console.log("data:", data?.questions);

  //데이터없으면 notFOund로
  if (!data) {
    return notFound();
  }

  const { questions, respondents } = data;
  const allCnt = respondents.allCnt;

  return (
    <>
      {/* 필터 */}
      <SurveyGroupFilter curFilter={filter} setFilter={setFilter} />
      {questions.map((qs, idx) => {
        return (
          <div key={idx}>
            {(() => {
              if (qs.type === QUESTION_TYPE.SELECT) {
                // 객관식 차트
                return <ResponseSelect allCnt={allCnt} {...qs} />;
              } else if (qs.type === QUESTION_TYPE.TEXT) {
                // 주관식 답글
                return (
                  <ResponseTexts filter={filter} allCnt={allCnt} {...qs} />
                );
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

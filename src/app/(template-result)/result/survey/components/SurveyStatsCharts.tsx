"use client";

import ResponseSelect from "@/app/(template-result)/result/survey/components/ResponseSelect";
import { ResponseTexts } from "@/app/(template-result)/result/survey/components/ResponseTexts";
import SurveyGroupFilter, {
  AgeOptions,
  GenderOptions,
} from "@/app/(template-result)/result/survey/components/SurveyGroupFilter";
import { QUERY_KEY } from "@/types/constans";
import { QUESTION_TYPE } from "@/types/survey.type";
import {
  ResultSelectOption,
  SurveyResult,
} from "@/types/surveyResult.type";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useState } from "react";
import classes from "./SuveyStatusCharts.module.scss";
import QuestionDetailWrapper from "@/components/ui/templateUi/QuestionDetailWrapper";
import { fetchSurveyData } from "./test";
// type logger<T> = (arg: T) => void;

// let logNumber: logger<number> = (a) => {
//   console.log(a);
// };

// let logUnion: logger<number | string> = (a) => {
//   console.log(a);
// };

// logNumber = logUnion;
// logUnion = logNumber;

type MyPick<T, K extends keyof T> = {
  [P in K]: T[];
};

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
          age === "all"
            ? option.female
            : { [age]: option.female![age] ?? 0 },
        male:
          age === "all"
            ? option.male
            : { [age]: option.male![age] ?? 0 },
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
      <div className={classes.wrapper}>
        {questions.map((qs, idx) => {
          return (
            <QuestionDetailWrapper key={`${idx}`}>
              {(() => {
                console.log(qs);
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
            </QuestionDetailWrapper>
          );
        })}
      </div>
    </>
  );
}

"use client";
import QuestionTitle from "@/app/(template-result)/components/ui/Queston-title.ui";
import { ResultText } from "@/types/surveyResult.type";
import classes from "./ResponseTexts.module.scss";
// import Female30 from "/public/asset/icon/female_30.svg";
// import Male30 from "/public/asset/icon/male_30.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useEffect, useState } from "react";
import {
  AgeOptions,
  GenderOptions,
} from "@/app/(template-result)/result/survey/components/SurveyGroupFilter";

export function ResponseTexts({
  allCnt,
  id: questionId,
  label,
  filter,
  textAnswers,
  isNextPage,
}: {
  allCnt: number;
  filter: {
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  };
} & ResultText) {
  // useEffect(() => {
  //   if (!resultAnswers || !filter) return;

  //   const { genderGroup, ageGroup } = filter;
  //   const filteredData = resultAnswers.filter((respon) => {
  //     const { gender, age } = respon.respondent;

  //     // 성별 필터
  //     if (genderGroup !== "all") {
  //       if (genderGroup === "female" && gender !== "female") return false;
  //       if (genderGroup === "male" && gender !== "male") return false;
  //     }

  //     // 나이 필터
  //     if (ageGroup) {
  //       switch (ageGroup) {
  //         case 10:
  //           if (age < 10 || age >= 20) return false;
  //         case 20:
  //           if (age < 20 || age >= 30) return false;
  //           break;
  //         case 30:
  //           if (age < 30 || age >= 40) return false;
  //           break;
  //         case 40:
  //           if (age < 40 || age >= 50) return false;
  //           break;
  //         case 50:
  //           if (age < 50 || age >= 60) return false;
  //           break;
  //         case 60:
  //           if (age < 60 || age >= 70) return false;
  //           break;
  //         default:
  //           break;
  //       }
  //     }

  //     // 모든 조건을 만족하면 true 반환
  //     return true;
  //   });

  //   setResult(filteredData);
  // }, [filter, resultAnswers]);

  //초기 length 세팅

  const {
    data: textQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery<{
    isNextPage: number | null;
    answers: ResultText["textAnswers"];
  }>({
    queryKey: [QUERY_KEY.QUESTION_TEXT, questionId],
    queryFn: ({ pageParam }) => {
      return requestHandler(
        async () =>
          await fetch(
            `${BASE_NEST_URL}/answer/question/${questionId}/${pageParam}`,
            {
              cache: "no-store",
            }
          )
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.isNextPage;
    }, // 다음 페이지 결정
    initialPageParam: 1,
    enabled: false,
    initialData: {
      pages: [{ isNextPage, answers: textAnswers }],
      pageParams: [1],
    },
  });

  console.log("isPending:", isPending);
  // useEffect(() => {
  //   if (textQuestions) {
  //     const totalAnswers = textQuestions.pages.reduce((sum, page) => {
  //       return (sum += page.answers.length);
  //     }, 0);
  //     setCurrentCount(totalAnswers);
  //   }
  // }, [textQuestions]);

  //하나로합치기
  const flagList = textQuestions.pages.flatMap((e) => e.answers);

  const getGenderClass = (gender: string) =>
    gender === "female" ? classes.female : classes.male;

  const getGenderText = (gender: string) =>
    gender === "female" ? "여성" : "남성";

  return (
    <>
      <QuestionTitle>{label}</QuestionTitle>
      <div className={classes.textQuestionList}>
        {flagList.map((as, idx) => {
          const { id, respondent, answer } = as;
          const { gender, age } = respondent;
          return (
            <div key={`${id}-${idx}`} className={classes.responseContainer}>
              <div className={classes.anonymous}>
                <div className={classes.iconWrap}>
                  {/* {gender === "female" && <Female30 />}
                  {gender === "male" && <Male30 />} */}
                </div>

                <div className={classes.age}>{age}대 </div>
                <span className={getGenderClass(gender)}>
                  {getGenderText(gender)}
                </span>
              </div>

              <div className={classes.anonymousResponse}>{answer}</div>
            </div>
          );
        })}
      </div>
      {hasNextPage && (
        <>
          <div
            className={classes.moreButtonWrap}
            onClick={() => {
              fetchNextPage();
            }}
          >
            {isFetchingNextPage ? "로딩 중..." : "+ 10개 씩 가져오기"}
          </div>
        </>
      )}
    </>
  );
}

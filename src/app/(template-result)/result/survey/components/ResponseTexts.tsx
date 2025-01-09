"use client";
import { ResultText } from "@/types/surveyResult.type";
import classes from "./ResponseTexts.module.scss";
// import Female30 from "/public/asset/icon/female_30.svg";
// import Male30 from "/public/asset/icon/male_30.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  AgeOptions,
  GenderOptions,
} from "@/app/(template-result)/result/survey/components/SurveyGroupFilter";
import dynamic from "next/dynamic";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";

import LoadingTextSkeleton from "@/components/loading/LoadingTextSkeleton";
import Male from "/public/asset/icon/man.png";
import Female from "/public/asset/icon/woman.png";
import Image from "next/image";
import { queryClient } from "@/config/queryClient";

const DynamicMasonryLayout = dynamic(() => import("@/utils/MasonryLayout"), {
  ssr: false,
  loading: () => (
    <div>
      <LoadingTextSkeleton />
    </div>
  ),
});

export function ResponseTexts({
  idx,
  allCnt,
  id: questionId,
  label,
  filter,
  textAnswers,
  isNextPage,
}: {
  idx: number;
  allCnt: number;
  filter: {
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  };
} & ResultText) {
  const isFirstMount = useRef<boolean>(false);

  useEffect(() => {
    if (!isFirstMount.current) {
      isFirstMount.current = true;
    }
  }, [isFirstMount]);

  const {
    data: textQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isLoading,
  } = useInfiniteQuery<{
    isNextPage: number | null;
    answers: ResultText["textAnswers"];
  }>({
    queryKey: [
      QUERY_KEY.QUESTION_TEXT,
      questionId + "",
      filter.ageGroup,
      filter.genderGroup,
    ],

    queryFn: ({ pageParam }) => {
      return requestHandler(
        async () =>
          await fetch(
            `${BASE_NEST_URL}/answer/question/${questionId}/${pageParam}`,
            {
              cache: "no-store",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                genderGroup: filter.genderGroup,
                ageGroup: filter.ageGroup,
              }),
            }
          )
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.isNextPage;
    }, // 다음 페이지 결정
    initialPageParam: 1,
    enabled:
      isFirstMount.current &&
      (filter.ageGroup !== "all" || filter.genderGroup !== "all"), // 초기 패칭 방지..
    staleTime: 10000,
  });

  useEffect(() => {
    console.log("한번만 실행하지?");
    queryClient.setQueryData(
      [
        QUERY_KEY.QUESTION_TEXT,
        questionId + "",
        "all", // 초기 데이터 기준
        "all", // 초기 데이터 기준
      ],
      {
        pages: [{ isNextPage, answers: textAnswers }],
        pageParams: [1],
      }
    );
  }, [questionId, textAnswers, isNextPage]);

  const getGenderClass = (gender: string) =>
    gender === "female" ? classes.female : classes.male;

  const getGenderText = (gender: string) =>
    gender === "female" ? "여성" : "남성";

  const resultList = textQuestions?.pages.flatMap((page) => page.answers);

  return (
    <>
      <div className={classes.container}>
        <QuestionTitle idx={idx}>{label}</QuestionTitle>
        {resultList?.length === 0 && (
          <div className={classes.answerWrapper}>
            <div className={classes.emptyRespondents}>
              {filter.ageGroup}대 {getGenderText(filter.genderGroup)} 참여자가
              없어요!
            </div>
          </div>
        )}
        <DynamicMasonryLayout pending={isPending} loading={isLoading}>
          {resultList?.map((as, idx) => {
            const { id, respondent, answer } = as;
            const { gender, age } = respondent;

            return (
              <div key={`${id}-${idx}`} className={classes.answerWrapper}>
                <div className={classes.respondent}>
                  <div className={classes.iconWrap}>
                    {gender === "female" && (
                      <Image
                        src={Female}
                        alt="logo"
                        fill
                        priority
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw"
                      />
                    )}
                    {gender === "male" && (
                      <Image
                        src={gender === "male" ? Male : Female}
                        alt="logo"
                        fill
                        priority
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw"
                      />
                    )}
                  </div>

                  <div className={classes.age}>{age}대 </div>
                  <span className={getGenderClass(gender)}>
                    {getGenderText(gender)}
                  </span>
                </div>

                <div className={classes.respondentText}>{answer}</div>
              </div>
            );
          })}
        </DynamicMasonryLayout>
      </div>

      {hasNextPage && (
        <>
          <div
            className={classes.moreButtonWrap}
            onClick={() => {
              fetchNextPage();
            }}
          >
            <button type="button">
              {isFetchingNextPage ? "로딩 중..." : "+ 10개 씩 가져오기"}
            </button>
          </div>
        </>
      )}
    </>
  );
}

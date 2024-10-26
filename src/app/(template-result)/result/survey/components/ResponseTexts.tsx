"use client";
import QuestionTitle from "@/app/(template-result)/components/ui/Queston-title.ui";
import { ResultText } from "@/types/surveyResult.type";
import classes from "./ResponseTexts.module.scss";
import Female30 from "/public/asset/icon/female_30.svg";
import Male30 from "/public/asset/icon/male_30.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useEffect, useState } from "react";

export function ResponseTexts({
  allCnt,
  id: questionId,
  label,
  textAnswers,
}: { allCnt: number } & ResultText) {
  /** 초기에는 database에서 가져옴 */
  const [resultAnswers, setResultTextAnswers] =
    useState<ResultText["textAnswers"]>(textAnswers);

  const {
    data: textQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery<{
    isNextPage: number;
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
    initialPageParam: 2,
    enabled: false,
  });

  useEffect(() => {
    const addTextAnswers = textQuestions?.pages.at(-1);
    if (addTextAnswers) {
      setResultTextAnswers((prev) => {
        return [...prev, ...addTextAnswers.answers];
      });
    }
  }, [textQuestions]);

  const moreButton = () => {
    return allCnt > resultAnswers.length;
  };
  return (
    <>
      <QuestionTitle>{label}</QuestionTitle>
      <div className={classes.textQuestionList}>
        {resultAnswers.map((e, txtIdx) => {
          const { respondent, answer } = e;
          const { gender, age } = respondent;
          return (
            <div key={txtIdx} className={classes.responseContainer}>
              <div className={classes.anonymous}>
                <div className={classes.iconWrap}>
                  {gender === "female" && <Female30 />}
                  {gender === "male" && <Male30 />}
                </div>

                <div className={classes.age}>{age}대 </div>
                <span
                  className={
                    gender === "female" ? classes.female : classes.male
                  }
                >
                  {gender === "female" ? "여성" : "남성"}
                </span>
              </div>

              <div className={classes.anonymousResponse}>{answer}</div>
            </div>
          );
        })}
      </div>{" "}
      {moreButton() && (
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

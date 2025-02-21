"use client";
import { ResultText } from "@/types/surveyResult.type";
import classes from "./ResponseTexts.module.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useEffect, useRef } from "react";
import {
  AgeOptions,
  GenderOptions,
} from "@/app/(public-page)/(template-result)/result/survey/[id]/components/SurveyGroupFilter";
import { queryClient } from "@/config/queryClient";
import { CardContent } from "@/components/ui/card";
import NotthingUser from "./notthing-user";
import MasonryLayout from "@/utils/MasonryLayout";

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
    <CardContent>
      <div>
        {resultList?.length === 0 && (
          <NotthingUser
            ageGroup={filter.ageGroup}
            genderGroup={filter.genderGroup}
          />
        )}
        <MasonryLayout pending={isPending} loading={isLoading}>
          {resultList?.map((as, idx) => {
            const { id, respondent, answer } = as;
            const { gender, age } = respondent;

            return (
              <div
                key={`${id}-${idx}`}
                className="border p-2 bg-third rounded-xl"
              >
                <div className="flex">
                  <div className=" w-10 h-10 flex relative  flex-col overflow-hidden [&>svg]:w-5 [&>svg]:h-5 [&>svg]:fill-[#000000] dark:[&>svg]:fill-[#ffffff] ">
                    {/* {gender === "female" && (
                      <Image
                        src={Female}
                        alt="logo"
                        fill
                        priority
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 50vw"
                      />
                    )}

                    {gender === "male" && (
                      <Image
                        src={Female}
                        alt="logo"
                        fill
                        priority
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 50vw"
                      />
                    )} */}
                  </div>

                  <div className={classes.age}>{age}대 </div>
                  <span className={getGenderClass(gender)}>
                    {getGenderText(gender)}
                  </span>
                </div>

                <div className="rounded-md text-foreground b">{answer}</div>
              </div>
            );
          })}
        </MasonryLayout>
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
    </CardContent>
  );
}

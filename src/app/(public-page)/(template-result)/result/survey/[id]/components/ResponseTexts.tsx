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
import { CardContent, CardDescription } from "@/components/ui/card";
import NotthingUser from "./notthing-user";
import MasonryLayout from "@/components/layout/masonry-layout";
import Image from "next/image";
import Male from "/public/asset/3d/male.png";
import Female from "/public/asset/3d/female.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ResponseTexts({
  id: questionId,
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
        <MasonryLayout pending={isPending} loading={isLoading} gutter={10}>
          {resultList?.map((as, idx) => {
            const { id, respondent, answer } = as;
            const { gender, age } = respondent;

            return (
              <div
                key={`${id}-${idx}`}
                className="border p-3 bg-third rounded-xl  hover:border-primary"
              >
                <div className="flex items-center gap-2">
                  <div className=" w-10 h-10 border-foreground/30 bg-black/50 border-2 rounded-full flex relative  flex-col overflow-hidden [&>svg]:w-5 [&>svg]:h-5 [&>svg]:fill-[#000000] dark:[&>svg]:fill-[#ffffff] ">
                    {gender === "female" && (
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
                        src={Male}
                        alt="logo"
                        fill
                        priority
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 50vw"
                      />
                    )}
                  </div>

                  <div className="text-[13px]">{age} 대 </div>
                  <span
                    className={cn(
                      "text-sm",
                      gender === "female" ? "text-pink-400" : "text-blue-300"
                    )}
                  >
                    {gender === "female" ? "여성" : "남성"}
                  </span>
                </div>

                <div className="rounded-md  mt-3 text-foreground text-sm leading-6">
                  {answer}
                </div>
              </div>
            );
          })}
        </MasonryLayout>
      </div>
      {hasNextPage && (
        <>
          <div
            className="mt-5"
            onClick={() => {
              fetchNextPage();
            }}
          >
            <Button className="w-full" variant={"outline"}>
              {isFetchingNextPage ? "로딩 중..." : "+ 답변 더 가져오기"}
            </Button>
          </div>
        </>
      )}{" "}
      <CardDescription className="mt-3 font-normal">
        * 추가 응답이 없을 경우 버튼은 노출되지 않습니다.
      </CardDescription>
    </CardContent>
  );
}

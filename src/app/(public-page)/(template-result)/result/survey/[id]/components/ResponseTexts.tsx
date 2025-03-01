"use client";
import {
  ResultText,
  SurveyResult,
  TextAnswer,
} from "@/types/surveyResult.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { useEffect, useRef, useState } from "react";
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
import Anonymous from "/public/asset/3d/anonymous.png";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User2, User2Icon } from "lucide-react";

export function ResponseTexts({
  idx,
  id: questionId,
  templateId,
  filter,
}: {
  idx: number;
  templateId: string;
  allCnt: number;
  filter: {
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  };
} & ResultText) {
  const mountRef = useRef<boolean>(false);

  const cacheData = queryClient.getQueryData<SurveyResult>([
    QUERY_KEY.SURVEY_RESULTS,
    templateId,
  ]);

  const findTextQuestion = cacheData?.questions.find(
    (e) => e.id === questionId
  );

  const initalCachingData = () => {
    if (cacheData?.questions[idx].type === "text") {
      return cacheData?.questions[idx].textAnswers;
    } else {
      return [];
    }
  };

  const [list, setList] = useState<TextAnswer[]>(() => initalCachingData());

  const {
    data: textQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
    isPending,
  } = useInfiniteQuery<{
    isNextPage: number | null;
    answers: ResultText["textAnswers"];
  }>({
    queryKey: [QUERY_KEY.QUESTION_TEXT, questionId + ""],

    queryFn: ({ pageParam }) => {
      return requestHandler(
        async () =>
          await fetch(
            `${BASE_NEST_URL}/answer/question/${questionId}/${pageParam}`
          )
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.isNextPage;
    }, // 다음 페이지 결정
    initialPageParam: 1,

    initialData: () => {
      return {
        // 캐싱재사용으로 변경
        pages: [
          {
            isNextPage: (findTextQuestion as ResultText).isNextPage,
            answers: (findTextQuestion as ResultText).textAnswers,
          },
        ],
        pageParams: [1],
      };
    },
  });

  useEffect(() => {
    // 마운트안됐을때는 리턴
    if (!mountRef.current) {
      mountRef.current = true;
      return;
    }

    if (isSuccess) {
      setList((prev) => [
        ...prev,
        ...(textQuestions.pages.at(-1)?.answers as TextAnswer[]),
      ]);
    }
  }, [isSuccess, textQuestions]);

  const filterList = (list: TextAnswer[]): TextAnswer[] => {
    return list.filter((e) => {
      // 필터가 모두 "all"인 경우 모든 항목 표시
      if (filter.ageGroup === "all" && filter.genderGroup === "all") {
        return true;
      }

      // age만 필터링할 때
      if (filter.ageGroup !== "all" && filter.genderGroup === "all") {
        return filter.ageGroup === e.respondent.age;
      }

      // gender만 필터링할 때
      if (filter.ageGroup === "all" && filter.genderGroup !== "all") {
        return filter.genderGroup === e.respondent.gender;
      }

      // 두 필터 모두 "all"이 아닐 때 (둘 다 필터링)
      if (filter.ageGroup !== "all" && filter.genderGroup !== "all") {
        return (
          filter.genderGroup === e.respondent.gender &&
          filter.ageGroup === e.respondent.age
        );
      }

      // 기본적으로 포함하지 않음 (위의 조건에 해당하지 않는 경우)
      return false;
    });
  };

  return (
    <CardContent>
      <div>
        {filterList(list)?.length === 0 && (
          <NotthingUser
            ageGroup={filter.ageGroup}
            genderGroup={filter.genderGroup}
          />
        )}
        <MasonryLayout pending={isPending} gutter={10}>
          {filterList(list)?.map((as, idx) => {
            const { id, respondent, answer } = as;
            const { gender, age } = respondent;

            return (
              <div
                key={`${id}-${idx}`}
                className=" p-3 bg-third rounded-xl border hover:border-primary animate-fadein"
              >
                <div className="flex items-center gap-2">
                  <div className="items-center justify-center w-10 h-10 border-foreground/10  border  rounded-full flex relative  flex-col overflow-hidden [&>svg]:w-5 [&>svg]:h-5 [&>svg]:fill-[#000000] ">
                    {(() => {
                      switch (gender) {
                        case "female":
                          return (
                            <Image
                              src={Female}
                              alt="logo"
                              fill
                              priority
                              style={{ objectFit: "contain" }}
                              sizes="(max-width: 768px) 50vw"
                            />
                          );
                        case "male":
                          return (
                            <Image
                              src={Male}
                              alt="logo"
                              fill
                              priority
                              style={{ objectFit: "contain" }}
                              sizes="(max-width: 768px) 50vw"
                            />
                          );
                        default:
                          return (
                            <Image
                              src={Anonymous}
                              alt="logo"
                              fill
                              priority
                              style={{ objectFit: "contain" }}
                              sizes="(max-width: 768px) 50vw"
                            />
                          );
                      }
                    })()}

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
                  {age && <div className="text-[13px]">{age} 대</div>}

                  {(() => {
                    switch (gender) {
                      case "female":
                        return (
                          <span className="text-pink-400 text-sm">여성</span>
                        );
                      case "male":
                        return (
                          <span className="text-blue-300 text-sm">남성</span>
                        );
                      default:
                        return (
                          <span className="text-point text-sm">
                            익명의 응답자
                          </span>
                        );
                    }
                  })()}
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
      <CardDescription className="mt-3 text-[12px] font-normal">
        * 추가 응답이 없을 경우 버튼은 노출되지 않습니다.
      </CardDescription>
    </CardContent>
  );
}

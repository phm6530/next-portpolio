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
import {
  AgeOptions,
  GenderOptions,
} from "@/app/(public-page)/(template-result)/result/survey/[id]/components/SurveyGroupFilter";
import { queryClient } from "@/config/queryClient";
import { CardContent, CardDescription } from "@/components/ui/card";
import MasonryLayout from "@/components/layout/masonry-layout";
import Image from "next/image";
import Male from "/public/asset/3d/male.png";
import Female from "/public/asset/3d/female.png";
import Anonymous from "/public/asset/3d/anonymous.png";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import NotthingUser from "./notthing-user";

export function ResponseTexts({
  idx: _,
  questionId,
  templateId,
  filter,
  hasNextPage,
  initalTextAnswers,
}: {
  idx: number;
  questionId: number;
  templateId: string;
  allCnt: number;
  filter: {
    genderGroup: GenderOptions;
    ageGroup: AgeOptions;
  };
  hasNextPage: number | null;
  initalTextAnswers: TextAnswer[];
}) {
  const mountRef = useRef<boolean>(false);
  const [list, setList] = useState<
    {
      isNextPage: number | null;
      answers: ResultText["textAnswers"];
    }[]
  >([]);

  const {
    data: textQuestions,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    isSuccess,
  } = useInfiniteQuery<{
    isNextPage: number | null;
    answers: ResultText["textAnswers"];
  }>({
    queryKey: [QUERY_KEY.QUESTION_TEXT, templateId, questionId + "", filter],
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
    },
    enabled: false, // 캐시 재사용하려고 false 해버림
    initialPageParam: 2,
  });

  //최초 마운트에만 실행 될것,
  useEffect(() => {
    if (!mountRef.current) {
      setList([
        {
          isNextPage: hasNextPage,
          answers: initalTextAnswers,
        },
      ]);

      mountRef.current = true;
    }

    return () => {
      mountRef.current = false;
      setList([]); // 정리
    };
  }, [initalTextAnswers, hasNextPage]);

  //마운트 이후 Infinity 요청에만
  useEffect(() => {
    if (mountRef.current && isSuccess) {
      const newData = textQuestions.pages.at(-1);
      if (newData) {
        setList((prev) => {
          return [...prev, newData];
        });
      }
    }
  }, [isSuccess, textQuestions]);

  const filterList = useCallback(
    (answers: TextAnswer[]): TextAnswer[] => {
      return answers.filter((e) => {
        if (filter.ageGroup === "all" && filter.genderGroup === "all") {
          return true;
        }

        if (filter.ageGroup !== "all" && filter.genderGroup === "all") {
          return filter.ageGroup === e.respondent.age;
        }

        if (filter.ageGroup === "all" && filter.genderGroup !== "all") {
          return filter.genderGroup === e.respondent.gender;
        }

        if (filter.ageGroup !== "all" && filter.genderGroup !== "all") {
          return (
            filter.genderGroup === e.respondent.gender &&
            filter.ageGroup === e.respondent.age
          );
        }
        return false;
      });
    },
    [filter.ageGroup, filter.genderGroup]
  );

  const allAnswers = list.flatMap((page) => page.answers);
  const filteredAnswers = filterList(allAnswers);

  return (
    <CardContent>
      <div>
        {mountRef.current && filteredAnswers?.length === 0 && (
          <NotthingUser
            ageGroup={filter.ageGroup}
            genderGroup={filter.genderGroup}
          />
        )}

        <MasonryLayout pending={isPending || !mountRef.current} gutter={10}>
          {filteredAnswers.map((res, questionsIdx) => {
            const { id, respondent, answer } = res;
            const { gender, age } = respondent;

            return (
              <div
                key={`${res.id}-${questionsIdx}`}
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

                <div className="rounded-md mt-3 text-foreground text-sm leading-6 overflow-wrap break-all whitespace-pre-wrap">
                  {answer}
                </div>
              </div>
            );
          })}
        </MasonryLayout>
      </div>
      {list.at(-1)?.isNextPage && (
        <div className="mt-5" onClick={() => fetchNextPage()}>
          <Button className="w-full" variant={"outline"}>
            {isFetchingNextPage ? "로딩 중..." : "+ 답변 더 가져오기"}
          </Button>
        </div>
      )}
      <CardDescription className="mt-3 text-[12px] font-normal leading-5 ">
        * 버튼 클릭 시 전체 데이터 기준 10개씩 가져오며, 추가 응답이 없을 경우
        버튼은 노출되지 않습니다.
      </CardDescription>
    </CardContent>
  );
}

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
  const [mount, setMount] = useState<boolean>(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false; // 초기 마운트 이후로 상태 변경
      return;
    }

    refetch();
  }, [filter.ageGroup, filter.genderGroup]);

  const {
    data: textQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
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
      console.count("실행되지 않아야함...");
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
    enabled: false, // 초기 패칭 방지..
    initialData: {
      pages: [{ isNextPage, answers: textAnswers }],
      pageParams: [1],
    },
  });

  // 초기 마운트 방지
  useEffect(() => {
    if (!mount) {
      console.log(mount);
      setMount(true);
      return;
    }

    refetch();
  }, [filter.ageGroup, filter.genderGroup]);

  const flagList = textQuestions.pages.flatMap((e) => e.answers);

  const getGenderClass = (gender: string) =>
    gender === "female" ? classes.female : classes.male;

  const getGenderText = (gender: string) =>
    gender === "female" ? "여성" : "남성";

  return (
    <>
      <div className={classes.container}>
        <QuestionTitle idx={idx}>{label}</QuestionTitle>

        <Suspense fallback={<>loading......</>}>
          <DynamicMasonryLayout>
            {flagList.map((as, idx) => {
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
        </Suspense>
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

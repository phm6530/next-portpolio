import QuestionTitle from "@/app/_components/ui/templateUi/QuestionTitle";
import classes from "./ResponseText.module.scss";
import { ageGroupProps, Gender } from "@/types/template";
import Female30 from "/public/asset/icon/female_30.svg";
import Male30 from "/public/asset/icon/male_30.svg";

import { useEffect, useState, useMemo } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import { withFetch } from "@/app/lib/helperClient";

type FilterDataProps = {
  gender: Gender;
  age: 10 | 20 | 30 | 40 | 50 | 60;
  value: string;
};

export default function ResponseText({
  questionTitle,
  answers,
  genderGroup,
  ageGroup,
  questionId,
  templateId,
}: {
  questionTitle: string;
  answers: FilterDataProps[];
  genderGroup: "all" | Gender;
  ageGroup: ageGroupProps;
  questionId: number;
  templateId: number;
}) {
  const [allResponses, setAllResponses] = useState<FilterDataProps[]>(
    answers || []
  );
  console.log(allResponses);

  // 필터링 로직을 useMemo로 최적화
  const filteredData = useMemo(() => {
    return allResponses?.filter((e) => {
      if (genderGroup === "all") {
        return ageGroup === "all" || e.age === ageGroup;
      } else {
        return (
          e.gender === genderGroup && (ageGroup === "all" || e.age === ageGroup)
        );
      }
    });
  }, [allResponses, genderGroup, ageGroup]);

  const {
    data: textQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<{ results: FilterDataProps[]; nextPage: number | null }>(
    {
      queryKey: [QUERY_KEY.QUESTION_TEXT, questionId],
      queryFn: ({ pageParam }) => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/result/${templateId}/${questionId}/${pageParam}`;
        return withFetch(() => fetch(url));
      },
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false, // 다음 페이지 결정
      initialPageParam: 2, // 첫번째는 초기데이터에서 가져오도록 하였음
      enabled: false,
    }
  );

  // 새로운 데이터가 추가될 때 allResponses에 병합
  useEffect(() => {
    if (textQuestions) {
      setAllResponses((prev) => [
        ...prev,
        ...(textQuestions.pages.at(-1)!.results as FilterDataProps[]),
      ]);
    }
  }, [textQuestions]);

  return (
    <div className={classes.questionItem}>
      <QuestionTitle>{questionTitle}</QuestionTitle>

      {filteredData.length > 0 ? (
        <div className={classes.textQuestionList}>
          {filteredData.map((e, txtIdx) => (
            <div key={txtIdx} className={classes.responseContainer}>
              <div className={classes.anonymous}>
                <div className={classes.iconWrap}>
                  {e.gender === "female" && <Female30 />}
                  {e.gender === "male" && <Male30 />}
                </div>

                <div className={classes.age}>{e.age}대 </div>
                <span
                  className={
                    e.gender === "female" ? classes.female : classes.male
                  }
                >
                  {e.gender === "female" ? "여성" : "남성"}
                </span>
              </div>

              <div className={classes.anonymousResponse}>{e.value}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.noParticipants}>
          {ageGroup}대
          {genderGroup === "all" ? (
            "는 참여자가 없네요.."
          ) : (
            <>
              {genderGroup === "female" ? "여성" : "남성"} 은 참여자가 없네요...
            </>
          )}
        </div>
      )}
      {!hasNextPage && (
        <div className={classes.moreButtonWrap} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "로딩 중..." : "+ 10개 더보기"}
        </div>
      )}
    </div>
  );
}

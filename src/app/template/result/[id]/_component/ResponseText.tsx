import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
import classes from "./ResponseText.module.scss";
import { ageGroupProps, Gender } from "@/types/template";
import Female30 from "/public/asset/icon/female_30.svg";
import Male30 from "/public/asset/icon/male_30.svg";

import { useEffect, useState, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/types/constans";
import { withFetch } from "@/util/clientUtil";
import { BASE_URL } from "@/config/base";

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
  responseCnt,
}: {
  questionTitle: string;
  answers: FilterDataProps[];
  genderGroup: "all" | Gender;
  ageGroup: ageGroupProps;
  questionId: number;
  templateId: number;
  responseCnt: number;
}) {
  const [allResponses, setAllResponses] = useState<FilterDataProps[]>(
    answers || []
  );

  const [touched, setTouched] = useState<boolean>(false);

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
    isPending,
  } = useInfiniteQuery<{ results: FilterDataProps[]; nextPage: number | null }>(
    {
      queryKey: [QUERY_KEY.QUESTION_TEXT, questionId],
      queryFn: ({ pageParam }) => {
        const url = `${BASE_URL}/api/result/${templateId}/${questionId}/${pageParam}`;
        return withFetch(() => fetch(url));
      },
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage || null;
      }, // 다음 페이지 결정
      initialPageParam: 2, // 첫번째는 초기데이터에서 가져오도록 하였음
      enabled: false,
    }
  );

  const touchedView = touched && !hasNextPage;

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
      {responseCnt > 10 && (
        <>
          {!touchedView && (
            <div
              className={classes.moreButtonWrap}
              onClick={() => {
                setTouched(true);

                fetchNextPage();
              }}
            >
              {isFetchingNextPage ? "로딩 중..." : "+ 10개 씩 가져오기"}
            </div>
          )}
        </>
      )}
    </div>
  );
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchDetailResult } from "@/lib/templateResult";
import { useState } from "react";
import { ageGroupProps, Gender } from "@/types/template";

import classes from "./SurveyResult.module.scss";
import Image from "next/image";
import Crown from "/public/asset/icon/crown.svg";
import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import SurveyResultBar from "@/app/template/result/[id]/_component/SurveyResultBar";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
import ResponseText from "@/app/template/result/[id]/_component/ResponseText";
import Button from "@/components/ui/button/Button";
import IconLabel from "@/components/ui/IconLabel";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import ThumbNail from "@/app/template/_component/thumbNail/ThumbNail";
import GroupStatus from "@/components/ui/GroupStatus";
import ImageViewer from "@/app/template/_component/ImageViewer";
import QuestionsContainer from "@/app/template/_component/survey/QuestionsContainer";

const FILTER_GENDER = [
  {
    label: "전체보기",
    val: "all",
  },
  {
    label: "남자",
    val: "male",
  },
  {
    label: "여자",
    val: "female",
  },
];

const FILTER_Age = [
  {
    label: "전체보기",
    val: "all",
  },
  {
    label: "10대",
    val: 10,
  },
  {
    label: "20대",
    val: 20,
  },
  {
    label: "30대",
    val: 30,
  },
  {
    label: "40대",
    val: 40,
  },
  {
    label: "50대",
    val: 50,
  },
  {
    label: "60대",
    val: 60,
  },
];

export default function SurveyResult({ id }: { id: number }) {
  const [genderGroup, setGenderGroup] = useState<"all" | Gender>("all");
  const [ageGroup, setAgeGroup] = useState<ageGroupProps>("all");

  const { data, isError } = useQuery({
    queryKey: ["default", id],
    queryFn: () => fetchDetailResult(id),
    staleTime: 10000,
  });

  if (isError) {
    notFound();
  }

  if (data) {
    const { templateResult, templateMeta } = data;
    const {
      template: templateType,
      title,
      description,
      thumbnail,
      start_date,
      end_date,
      created_at,
      user_cnt,
      gender_group,
      age_group,
    } = templateMeta;

    console.log(data.templateMeta);
    const templateNames: { [key: string]: string } = {
      survey: "설문조사",
      rank: "랭킹",
    };

    const templateName = templateNames[templateType] || "기본값";
    const { questions } = templateResult;

    // Gender Filter
    const filterGenderHandler = (btnVal: string) => {
      if (btnVal === "all" || btnVal === "female" || btnVal === "male") {
        setGenderGroup(btnVal);
      }
    };

    // Age Filter
    const filterAgeHandler = (btnVal: string) => {
      if (["all", "10", "20", "30", "40", "50", "60"].includes(btnVal)) {
        setAgeGroup(
          btnVal === "all"
            ? "all"
            : (parseInt(btnVal) as Exclude<ageGroupProps, "all">)
        );
      }
    };

    return (
      <>
        <div className={classes.summeryDetail}>
          <div style={{ position: "relative" }}>
            <div className={classes.Badge}>결과페이지</div>
            <ThumbNail thumbnail={thumbnail} />
          </div>
          <div className={classes.summary}>
            <TemplateStatus
              dateRange={[start_date, end_date]}
              createdAt={created_at}
            />
            <TemplateTitle>{title}</TemplateTitle>
            <div className={classes.description}>{description}</div>

            <div>
              <span>참여자 </span>
              <span className={classes.userCnt}>{user_cnt || 0}</span> 명
            </div>
          </div>
          <GroupStatus
            genderGroup={gender_group as Gender}
            ageGroup={age_group as string}
            action={user_cnt < 5}
          />
          <Button.moveLink moveUrl={`/template/${templateType}/${id}`}>
            참여하기
          </Button.moveLink>
        </div>

        <div className={classes.radioWrap}>
          {/* Gender Filter */}
          <div className={classes.filterController}>
            {FILTER_GENDER.map((e, idx) => {
              return (
                <InputTypeStyle.RadioTab
                  key={`genderFilter-${idx}`}
                  select={genderGroup === e.val + ""}
                  onClick={() => filterGenderHandler(e.val)}
                >
                  {e.label}
                </InputTypeStyle.RadioTab>
              );
            })}
          </div>

          {/* Age Filter */}
          <div className={classes.filterController}>
            {FILTER_Age.map((e, idx) => {
              return (
                <InputTypeStyle.RadioTab
                  key={`genderFilter-${idx}`}
                  select={ageGroup + "" === e.val + ""}
                  onClick={() => filterAgeHandler(e.val + "")}
                >
                  {e.label}
                </InputTypeStyle.RadioTab>
              );
            })}
          </div>
        </div>
        {/* Text */}

        <div className={classes.questionListWrapper}>
          {questions.map((q, idx) => {
            //type - 주관식 일때
            if (q.type === "text") {
              return (
                <TemplateQuestionWrapper key={idx}>
                  <ResponseText
                    key={`key-${idx}`}
                    questionTitle={q.question}
                    answers={q.values!}
                    genderGroup={genderGroup}
                    ageGroup={ageGroup}
                    questionId={q.id}
                    templateId={templateMeta.id}
                    responseCnt={templateMeta.user_cnt}
                  />
                </TemplateQuestionWrapper>
              );
            }

            // 객관식
            else {
              const targetCnt = (arr: { [key: string]: number }) => {
                return Object.values(arr).reduce((acc, cur) => acc + +cur, 0);
              };

              const cntList =
                q.options?.map((e) => {
                  const femaleGroup = e.user.female;
                  const maleGroup = e.user.male;
                  const ageGroupKey = ageGroup + "s";

                  //성별 + 나이 전체보기
                  if (genderGroup === "all" && ageGroup === "all") {
                    const femaleCnt = targetCnt(e.user.female);
                    const maleCnt = targetCnt(e.user.male);
                    return +maleCnt + +femaleCnt;
                  }

                  // 나이 특정그룹
                  else if (ageGroup !== "all") {
                    return genderGroup === "all"
                      ? +femaleGroup[ageGroupKey] + +maleGroup[ageGroupKey]
                      : +e.user[genderGroup][ageGroupKey];
                  }

                  // 성별 특정
                  else if (genderGroup !== "all") {
                    const genderData = e.user[genderGroup];
                    return ageGroup === "all"
                      ? targetCnt(genderData)
                      : +e.user[genderGroup][ageGroupKey];
                  }
                }) || [];

              //최고값
              const maxCnt = Math.max(...(cntList as number[]));
              const isPictureOption =
                q.options?.some((e) => e.picture !== null) || false;
              return (
                <div
                  className={classes.questionItem}
                  key={`qustionSelect-${idx}`}
                >
                  {/* Select */}
                  <QuestionTitle>{q.question}</QuestionTitle>{" "}
                  <QuestionsContainer isPicture={isPictureOption}>
                    {q.options?.map((e, idx) => {
                      //option 선택자 수
                      const cnt = cntList[idx] || 0;
                      const isMax = maxCnt === 0 ? false : maxCnt === +cnt;
                      return (
                        <div key={idx}>
                          <div className={classes.questionLabel}>
                            {isMax ? (
                              <IconLabel Icon={Crown}>{e.label}</IconLabel>
                            ) : (
                              e.label
                            )}
                            <span>({cnt} 명)</span>
                          </div>

                          {/* Percent */}
                          <SurveyResultBar
                            triggerContents={[genderGroup, ageGroup]}
                            curCnt={cnt}
                            allCnt={templateMeta.user_cnt}
                            maxCnt={isMax}
                          />
                          {e.picture && (
                            <ImageViewer image={e.picture} alt={e.label} />
                          )}
                        </div>
                      );
                    })}{" "}
                  </QuestionsContainer>
                </div>
              );
            }
          })}
        </div>
      </>
    );
  }
}

"use client";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchDetailResult } from "@/app/_services/client/templateResult";
import { useState } from "react";
import { ageGroupProps, Gender } from "@/types/template";

import classes from "./SurveyResult.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThumbNail from "@/app/template/_component/thumbNail/ThumbNail";
import TemplateStatus from "@/app/_components/templateUtill/TemplateStatus";
import TemplateTitle from "@/app/_components/ui/templateUi/TemplateTitle";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import SurveyResultBar from "@/app/template/result/[id]/_component/SurveyResultBar";
import QuestionTitle from "@/app/_components/ui/templateUi/QuestionTitle";
import ResponseText from "@/app/template/result/[id]/_component/ResponseText";

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

  const router = useRouter();

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
      thumbnail,
      start_date,
      end_date,
      created_at,
    } = templateMeta;

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
      if (btnVal === "all" || "10" || "20" || "30" || "40" || "50" || "60") {
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
          <ThumbNail thumbnail={thumbnail} />
          <TemplateStatus
            dateRange={[start_date, end_date]}
            createdAt={created_at}
          />
          <TemplateTitle>{title}</TemplateTitle>
          <div>참여자 : {templateMeta.user_cnt || 0} 명</div>

          <div>
            {templateMeta.user_cnt < 10
              ? "집계하기엔 아직 참여자가 너무 적습니다."
              : `이 ${templateName}은/는 ${templateMeta.age_group}대 ${templateMeta.gender_group}이 가장 많이 참여하였습니다.`}
          </div>
        </div>
        <button onClick={() => router.push(`/template/${templateType}/${id}`)}>
          참여하기
        </button>
        {/* Gender Filter */}
        <div className={classes.filterController}>
          {FILTER_GENDER.map((e, idx) => {
            return (
              <InputTypeStyle.Radio
                key={`genderFilter-${idx}`}
                selectLabel={genderGroup}
                curLabel={e.val + ""}
                onClick={() => filterGenderHandler(e.val)}
              >
                {e.label}
              </InputTypeStyle.Radio>
            );
          })}
        </div>

        {/* Age Filter */}
        <div className={classes.filterController}>
          {FILTER_Age.map((e, idx) => {
            return (
              <InputTypeStyle.Radio
                key={`genderFilter-${idx}`}
                selectLabel={ageGroup + ""}
                curLabel={e.val + ""}
                onClick={() => filterAgeHandler(e.val + "")}
              >
                {e.label}
              </InputTypeStyle.Radio>
            );
          })}
        </div>

        {/* Test */}
        {questions.map((q, idx) => {
          //type - 주관식 일때
          if (q.type === "text") {
            const filterData =
              q.values?.filter((e) => {
                //성별 전체선택 일떄
                if (genderGroup === "all")
                  return ageGroup === "all" || e.age === ageGroup;
                //특정 성별 선택이후 ageGroup
                else
                  return (
                    e.gender === genderGroup &&
                    (ageGroup === "all" || e.age === ageGroup)
                  );
              }) || [];

            return (
              <ResponseText
                key={`key-${idx}`}
                questionTitle={q.question}
                filterData={filterData}
                genderGroup={genderGroup}
                ageGroup={ageGroup}
              />
            );
          }

          // 객관식
          else {
            const cntList =
              q.options?.map((e) => {
                const femaleGroup = e.user.female;
                const maleGroup = e.user.male;
                const ageGroupKey = ageGroup + "s";

                const targetCnt = (arr: { [key: string]: number }) => {
                  return Object.values(arr).reduce((acc, cur) => acc + +cur, 0);
                };

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

            return (
              <div key={idx} className={classes.questionItem}>
                {/* Select */}
                <QuestionTitle>{q.question}</QuestionTitle>
                {q.options?.map((e, idx) => {
                  //option 선택자 수
                  const cnt = cntList[idx] || 0;
                  return (
                    <div key={idx}>
                      {e.picture && (
                        <div>
                          <Image
                            src={e.picture}
                            layout="responsive"
                            width={16}
                            height={9}
                            style={{ maxWidth: 700, objectFit: "cover" }}
                            alt="preview"
                            priority
                          />
                        </div>
                      )}

                      {/* Percent */}
                      <SurveyResultBar
                        triggerContents={[genderGroup, ageGroup]}
                        label={e.label}
                        curCnt={cnt}
                        allCnt={templateMeta.user_cnt}
                        maxCnt={maxCnt === 0 ? false : maxCnt === +cnt}
                      />
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
      </>
    );
  }
}

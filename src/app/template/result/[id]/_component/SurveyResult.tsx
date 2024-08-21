"use client";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchDetailResult } from "@/app/_services/client/templateResult";
import { useState } from "react";
import { Gender } from "@/types/template";

import classes from "./SurveyResult.module.scss";
import Image from "next/image";

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
  const [ageGroup, setAgeGroup] = useState<"all" | 10 | 20 | 30 | 40 | 50 | 60>(
    "all"
  );

  const { data, isError } = useQuery({
    queryKey: ["default", id],
    queryFn: () => fetchDetailResult(id),
    staleTime: 10000,
    select: (data) => {
      return data;
    },
  });

  if (isError) {
    notFound();
  }

  if (data) {
    const { templateResult, templateMeta } = data;
    const { template } = templateMeta;

    const templateNames: { [key: string]: string } = {
      survey: "설문조사",
      rank: "랭킹",
    };

    const templateName = templateNames[template] || "기본값";
    const { questions } = templateResult;

    // Gender Filter
    const filterGenderHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btnVal = e.currentTarget.value;
      if (btnVal === "all" || btnVal === "female" || btnVal === "male") {
        setGenderGroup(btnVal);
      }
    };

    // Age Filter
    const filterAgeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btnVal = e.currentTarget.value;

      if (
        btnVal === "all" ||
        btnVal === "10" ||
        btnVal === "20" ||
        btnVal === "30" ||
        btnVal === "40" ||
        btnVal === "50" ||
        btnVal === "60"
      ) {
        setAgeGroup(
          btnVal === "all"
            ? "all"
            : (parseInt(btnVal) as 10 | 20 | 30 | 40 | 50 | 60)
        );
      }
    };

    return (
      <>
        <div className={classes.summeryDetail}>
          <p>참여자 : {templateMeta.user_cnt || 0} 명</p>
          <p>
            {templateMeta.user_cnt < 10
              ? "집계하기엔 아직 참여자가 너무 적습니다."
              : `이 ${templateName}은/는 ${templateMeta.age_group}대 ${templateMeta.gender_group}이 가장 많이 참여하였습니다.`}
          </p>
        </div>

        {/* Gender Filter */}
        <div className={classes.filterController}>
          {FILTER_GENDER.map((e, idx) => {
            return (
              <button
                key={`genderFilter-${idx}`}
                onClick={filterGenderHandler}
                type="button"
                value={e.val}
              >
                {e.label}
              </button>
            );
          })}
        </div>

        {/* Age Filter */}
        <div className={classes.filterController}>
          {FILTER_Age.map((e, idx) => {
            return (
              <button
                key={`genderFilter-${idx}`}
                onClick={filterAgeHandler}
                type="button"
                value={e.val}
              >
                {e.label}
              </button>
            );
          })}
        </div>

        {/* Test */}
        {questions.map((q, idx) => {
          if (q.type === "text") {
            const filterData = q.values?.filter((e) => {
              if (genderGroup === "all") {
                return ageGroup === "all" || e.age === ageGroup;
              }
              return (
                e.gender === genderGroup &&
                (ageGroup === "all" || e.age === ageGroup)
              );
            });
            return (
              <div key={idx} className={classes.questionItem}>
                <div className={classes.questionTitle}>{q.question}</div>
                <div>
                  {filterData && filterData?.length > 0
                    ? filterData.map((e, txtIdx) => (
                        <div key={txtIdx}>
                          {e.value} / {e.gender} {e.age}
                        </div>
                      ))
                    : `${ageGroup}대${
                        genderGroup === "all"
                          ? "는 참여자가 없네요.."
                          : ` ${
                              genderGroup === "female" ? "여성" : "남성"
                            }은 참여자가 없네요...`
                      }`}
                </div>
              </div>
            );
          } else {
            return (
              <div key={idx} className={classes.questionItem}>
                {/* Select */}
                <div className={classes.questionTitle}>{q.question}</div>

                {q.options?.map((e, idx) => {
                  let cnt: number = 0;
                  if (genderGroup === "all") {
                    if (ageGroup !== "all") {
                      const female = e.user.female[`${ageGroup}s`];
                      const male = e.user.male[`${ageGroup}s`];

                      cnt = Number(female) + Number(male);
                    } else {
                      const femaleCnt = Object.values(e.user.female).reduce(
                        (acc, cur) => acc + +cur,
                        0
                      );
                      const maleCnt = Object.values(e.user.male).reduce(
                        (acc, cur) => acc + +cur,
                        0
                      );
                      cnt = maleCnt + femaleCnt;
                    }
                  } else {
                    // 특정 성별을 대상으로 함
                    const genderData = e.user[genderGroup];

                    if (ageGroup === "all") {
                      cnt = Object.values(genderData).reduce(
                        (acc, cur) => acc + +cur,
                        0
                      );
                    } else {
                      cnt = genderData[`${ageGroup}s`] || 0;
                    }
                  }

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
                      <p key={idx}>
                        {e.label} {cnt}명
                      </p>
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

"use client";

import LoadingSpier from "@/app/_components/ui/loading/LoadingSpiner";
import { fetchTemplateDetail } from "@/app/_services/surveySerivce";
import { TemplateUnionType } from "@/app/template/[...detail]/page";
import OptionAgeGroup from "@/app/template/_component/OptionAgegroup";
import OptionGenderGroup from "@/app/template/_component/OptionGendergroup";
import { GetSurveyDetailProps } from "@/types/templateSurvey";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import classes from "@/styles/pages/template.module.scss";
import { FormProvider, useForm } from "react-hook-form";

import TemplateStatus from "@/app/_components/templateUtill/TemplateStatus";
import helperDateCompare from "@/app/lib/helperDateCompare";

import { useRouter } from "next/navigation";
import { withFetch } from "@/app/lib/helperClient";
import { localStorageHandler } from "@/app/lib/localStorageHandler";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

import ChkIcon from "/public/asset/icon/chkCircle.png";

import dayjs from "dayjs";

import "dayjs/locale/ko";

import QuestionText from "@/app/template/_component/QuestionText";
import QuestionOptions from "@/app/template/_component/QuestionOptions";
dayjs.locale("ko");

interface Option {
  label: string;
  value: string;
}

export default function SurveyTemplateDetail({
  templateType,
  surveyId,
  session,
}: {
  templateType: TemplateUnionType;
  surveyId: number;
  session: Session | null;
}) {
  const formMethod = useForm();
  const router = useRouter();
  const dayCompare = helperDateCompare(); //날짜 비교 lib
  const [participatedAt, setParticipatedAt] = useState<string | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: [templateType, surveyId],
    queryFn: () =>
      fetchTemplateDetail<GetSurveyDetailProps>(templateType, +surveyId),
    staleTime: 10000,
    enabled: !!surveyId,
  });

  useEffect(() => {
    if (data) {
      const localParticipation = localStorageHandler({
        templateId: data.id,
        templateType: data.template,
      }).getter();
      localParticipation &&
        setParticipatedAt(localParticipation.participatedAt);
    }
  }, [data]);

  //제출
  const { mutate } = useMutation<
    unknown,
    Error,
    Record<string, string | Option[]>
  >({
    mutationFn: (formData) =>
      withFetch(async () => {
        return fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/template/${templateType}/${surveyId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      }),

    onSuccess: () => {
      if (confirm("제출완료 되었습니다 결과페이지로 가실꺼?")) {
        router.push(`/template/result/${surveyId}`);

        if (data) {
          localStorageHandler({
            templateId: data.id,
            templateType: data.template,
          }).setter();
        }
      } else {
        router.push("/template");
      }
    },
  });

  if (isLoading) {
    return <LoadingSpier />;
  }

  if (data) {
    const {
      dateRange,
      title,
      description,
      questions,
      templateOption,
      thumbnail,
      created_at,
      user_nickname,
      user_id,
      user_role,
    } = data;

    //Submit
    const onSubmitHandler = async (data: Record<string, string>) => {
      // 둘 다 true면
      if (dateRange.every((e) => e !== null)) {
        const [start, end] = dateRange;
        if (dayCompare.isBefore(start)) {
          alert("아직 시작 전인데요..");
          return;
        }
        if (dayCompare.isAfter(end)) {
          alert("종료됐어요 ");
          return;
        }
      }

      mutate(data);
    };

    return (
      <>
        <TemplateStatus dateRange={dateRange} createdAt={created_at} />
        <div className={classes.templateTitle}>{title}</div>
        <div>
          {dayjs(created_at).fromNow()}
          <span>
            {user_nickname === "anonymous" ? "익명" : user_nickname}
            {user_role === "admin" ? "M" : ""}
          </span>
        </div>

        <div className={classes.thumbNailContainer}>
          {thumbnail && (
            <>
              <Image
                src={thumbnail}
                alt="alt"
                fill
                style={{ objectFit: "cover" }}
              />
            </>
          )}
        </div>

        <span className={classes.description}>{description}</span>

        {/* Option  */}
        <FormProvider {...formMethod}>
          {/**
           * gender는 DB 1,0으로 저장때문에 Boolean으로 바꾸기로 했음
           */}
          {/* Gender Chk  */}
          {Boolean(Number(templateOption.genderChk)) && <OptionGenderGroup />}

          {/* age Chk  */}
          {Boolean(Number(templateOption.ageChk)) && <OptionAgeGroup />}

          {questions.map((qs) => {
            return (
              <div key={`question-${qs.id}`} className={classes.questionWrap}>
                <div className={classes.qsLabel}>
                  <Image src={ChkIcon} alt={qs.id + ""} width={35} /> {qs.label}
                </div>
                {qs.type === "text" ? (
                  //주관식
                  <QuestionText qsImg={qs.textImg} qsId={qs.id} />
                ) : (
                  //객관식
                  <QuestionOptions options={qs.options} qsId={qs.id} />
                )}
              </div>
            );
          })}
        </FormProvider>

        <button
          type="button"
          onClick={formMethod.handleSubmit(onSubmitHandler)}
          disabled={!!participatedAt}
        >
          제출하기
        </button>
        {!!participatedAt && (
          <>
            이미 {participatedAt}에 참여하신 이력이 있어요!
            <button onClick={() => router.push(`/template/result/${surveyId}`)}>
              결과 보기
            </button>
          </>
        )}
      </>
    );
  }
}

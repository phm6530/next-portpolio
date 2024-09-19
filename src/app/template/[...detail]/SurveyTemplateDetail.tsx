"use client";

import LoadingSpier from "@/components/ui/loading/LoadingSpiner";
import { fetchTemplateDetail } from "@/lib/surveySerivce";
import { TemplateUnionType } from "@/app/template/[...detail]/page";
import OptionAgeGroup from "@/app/template/_component/OptionAgegroup";
import OptionGenderGroup from "@/app/template/_component/OptionGendergroup";
import { GetSurveyDetailProps } from "@/types/templateSurvey";
import { useMutation, useQuery } from "@tanstack/react-query";

import { FormProvider, useForm } from "react-hook-form";
import { BASE_URL } from "@/config/base";

import TemplateStatus from "@/components/templateUtill/TemplateStatus";
import DateCompareToday from "@/util/DateCompareToday";

import { useRouter } from "next/navigation";
import { withFetch } from "@/util/clientUtil";
import { localStorageHandler } from "@/util/localStorageHandler";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

import dayjs from "dayjs";
import "dayjs/locale/ko";

import QuestionText from "@/app/template/_component/QuestionText";
import QuestionOptions from "@/app/template/_component/QuestionOptions";
import Button from "@/components/ui/button/Button";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";

import { TemplateTypeProps } from "@/types/template";
import styles from "./SurveyTemplateDetail.module.scss";
import UiLoading from "@/components/ui/loading/UiLoading";
import TalkTooltip from "@/components/ui/Tooltip/TalkTooptip";

import MegaPhoneIcon from "/public/asset/icon/megaphone.svg";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
import DateRange from "@/app/template/_component/DateRange/DateRange";
import ThumbNail from "@/app/template/_component/thumbNail/ThumbNail";
import TemplateTitle from "@/components/ui/templateUi/TemplateTitle";

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
  const dayCompare = DateCompareToday(); //날짜 비교 lib
  const [participatedAt, setParticipatedAt] = useState<
    | {
        templateId: number;
        templateType: TemplateTypeProps;
        participatedAt: string;
      }
    | false
    | null
  >(null);
  const [touched, setTouched] = useState<boolean>(false);

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
      setParticipatedAt(localParticipation ? localParticipation : false);

      setTouched(true);
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
        return fetch(`${BASE_URL}/api/template/${templateType}/${surveyId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
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
        <TemplateQuestionWrapper>
          <ThumbNail thumbnail={thumbnail} />

          <div className={styles.templateSumeryWrapp}>
            <TemplateStatus dateRange={dateRange} createdAt={created_at} />
            <TemplateTitle>{title}</TemplateTitle>
            <DateRange dateRange={dateRange} />

            {/* Desciprtion */}
            <div className={styles.description}>{description}</div>
            {/* date */}
            <div className={styles.userDisplayWrapper}>
              {/* User Info + Role Display  */}
              <UserRoleDisplay
                user_nickname={user_nickname}
                user_role={user_role}
              />
              <span>{dayCompare.fromNow(created_at)}</span>
            </div>
          </div>
        </TemplateQuestionWrapper>
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
              //Ui Wrapper
              <TemplateQuestionWrapper key={`question-${qs.id}`}>
                {/* 타이틀 명 */}
                <QuestionTitle>{qs.label}</QuestionTitle>
                {qs.type === "text" ? (
                  //주관식
                  <QuestionText
                    description={qs.label}
                    qsImg={qs.textImg}
                    qsId={qs.id}
                  />
                ) : (
                  //객관식s
                  <QuestionOptions options={qs.options} qsId={qs.id} />
                )}
              </TemplateQuestionWrapper>
            );
          })}
        </FormProvider>

        {touched ? (
          <>
            <div className={styles.buttonWrapper}>
              <TalkTooltip>
                {!!participatedAt && (
                  <div className="tooltip">
                    <MegaPhoneIcon />
                    이미 참여하셨네요!
                  </div>
                )}

                <Button.submit
                  type="button"
                  onClick={formMethod.handleSubmit(onSubmitHandler)}
                  disabled={!!participatedAt}
                >
                  제출하기
                </Button.submit>
              </TalkTooltip>
              {!!participatedAt && (
                <Button.submit
                  type="button"
                  onClick={() => router.push(`/template/result/${surveyId}`)}
                >
                  결과보기
                </Button.submit>
              )}
            </div>
          </>
        ) : (
          <UiLoading />
        )}
      </>
    );
  }
}

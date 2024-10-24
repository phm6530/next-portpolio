"use client";
import OptionAgeGroup from "@/app/template/_component/OptionAgegroup";
import OptionGenderGroup from "@/app/template/_component/OptionGendergroup";
import QuestionOptions from "@/app/template/_component/QuestionOptions";
import QuestionText from "@/app/template/_component/QuestionText";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import {
  AnswerSurvey,
  QUESTION_TYPE,
  SurveyTemplateDetail,
} from "@/types/survey.type";
import { FormProvider, useForm } from "react-hook-form";
import classes from "./surveyform.module.scss";
import Button from "@/components/ui/button/Button";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import { TEMPLATE_TYPE } from "@/types/template.type";

export default function SurveyForm({
  id,
  isGenderCollected,
  isAgeCollected,
  questions,
}: SurveyTemplateDetail) {
  const defaultValues: AnswerSurvey = {
    ...(isGenderCollected && { gender: null }),
    ...(isAgeCollected && { ageGroup: null }),
    answers: questions.map((e) => {
      if (e.type === QUESTION_TYPE.TEXT) {
        return { questionId: e.id, type: e.type, answer: null };
      } else if (e.type === QUESTION_TYPE.SELECT) {
        return { questionId: e.id, type: e.type, optionId: null };
      } else {
        throw new Error("지원되지 않는 질문 타입입니다.");
      }
    }),
  };

  const formMethod = useForm<AnswerSurvey>({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = formMethod;
  console.log("watch:::", watch());

  const { mutate } = useMutation<unknown, Error, AnswerSurvey>({
    mutationFn: async (data) => {
      return withFetch(async () => {
        return fetch(`${BASE_NEST_URL}/answer/${TEMPLATE_TYPE.SURVEY}/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    },
    onSuccess: (data) => {
      console.log(data);
      alert("전송 완료");
      reset(defaultValues);
    },
  });

  const onSubmitHandler = (data: any) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...formMethod}>
        {/* Gender Chk  */}
        {isGenderCollected && <OptionGenderGroup />}

        {/* age Chk  */}
        {isAgeCollected && <OptionAgeGroup />}

        {questions.map((qs) => {
          return (
            <TemplateQuestionWrapper key={`${qs.type}-${qs.id}`}>
              <QuestionTitle>{qs.label}</QuestionTitle>

              {(() => {
                if (qs.type === QUESTION_TYPE.TEXT) {
                  return (
                    <QuestionText
                      description={qs.label}
                      qsImg={qs.pictrue}
                      qsId={qs.id}
                    />
                  );
                } else if (
                  qs.type === QUESTION_TYPE.SELECT &&
                  "options" in qs
                ) {
                  return <QuestionOptions qsId={qs.id} options={qs.options} />;
                } else {
                  return null as never;
                }
              })()}
            </TemplateQuestionWrapper>
          );
        })}
      </FormProvider>
      <div className={classes.buttonWrapper}>
        <Button.submit
          type="button"
          onClick={formMethod.handleSubmit(onSubmitHandler)}
        >
          제출하기
        </Button.submit>
      </div>
    </>
  );
}

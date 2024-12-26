"use client";

import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
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
import { useRouter } from "next/navigation";
import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import OptionGenderGroup from "@/app/template/_component/OptionGendergroup";
import OptionAgeGroup from "@/app/template/_component/OptionAgegroup";
import QuestionText from "@/app/template/_component/QuestionText";
import QuestionOptions from "@/app/template/_component/QuestionOptions";
import QuestionsAnswersWrapper from "@/components/ui/templateUi/QuestionAnswersWrapper";
import QuestionDetailWrapper from "@/components/ui/templateUi/QuestionDetailWrapper";

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
        throw new Error("지원되지 않는 질문 타입입니다.") as never;
      }
    }),
  };

  const router = useRouter();

  const formMethod = useForm<AnswerSurvey>({
    defaultValues,
  });

  const { reset } = formMethod;
  const { mutate, isSuccess, isPending } = useMutation<
    unknown,
    Error,
    AnswerSurvey
  >({
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SURVEY_RESULTS, id + ""],
      });

      router.push(`/result/${TEMPLATE_TYPE.SURVEY}/${id}`);
    },
  });

  const onSubmitHandler = (data: any) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...formMethod}>
        <div className={classes.requireds}>
          {/* Gender Chk  */}
          {isGenderCollected && <OptionGenderGroup />}

          {/* age Chk  */}
          {isAgeCollected && <OptionAgeGroup />}
        </div>

        {questions.map((qs, idx) => {
          return (
            <QuestionsAnswersWrapper key={`${qs.label}-${idx}`}>
              <QuestionDetailWrapper>
                <QuestionTitle idx={idx}>{qs.label}</QuestionTitle>
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
                    return (
                      <QuestionOptions qsId={qs.id} options={qs.options} />
                    );
                  } else {
                    return null as never;
                  }
                })()}
              </QuestionDetailWrapper>
            </QuestionsAnswersWrapper>
          );
        })}
      </FormProvider>

      <div className={classes.buttonWrapper}>
        <Button.submit
          type="button"
          onClick={formMethod.handleSubmit(onSubmitHandler)}
          disabled={isPending || isSuccess}
        >
          제출하기
        </Button.submit>
      </div>
    </>
  );
}

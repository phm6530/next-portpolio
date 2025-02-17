"use client";

import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
import {
  AnswerSurvey,
  QUESTION_TYPE,
  SurveyTemplateDetail,
} from "@/types/survey.type";
import { FormProvider, useForm } from "react-hook-form";
import classes from "./surveyform.module.scss";
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
import LoadingStreming from "@/components/loading/LoadingStreming";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { createSurveyFormSchema } from "./survey-form-schema";

export default function SurveyForm({
  id,
  isGenderCollected,
  isAgeCollected,
  questions,
}: SurveyTemplateDetail) {
  const defaultValues: z.infer<typeof dynamicSchema> = {
    ...(isGenderCollected && { gender: null }),
    ...(isAgeCollected && { ageGroup: null }),

    answers: questions.map((e) => {
      if (e.type === QUESTION_TYPE.TEXT) {
        return { questionId: e.id, type: e.type, answer: "" };
      } else if (e.type === QUESTION_TYPE.SELECT) {
        return { questionId: e.id, type: e.type, optionId: null };
      } else {
        throw new Error("지원되지 않는 질문 타입입니다.") as never;
      }
    }),
  };

  const dynamicSchema = createSurveyFormSchema(
    isGenderCollected,
    isAgeCollected
  );
  const router = useRouter();

  const formMethod = useForm<z.infer<typeof dynamicSchema>>({
    defaultValues,
    resolver: zodResolver(dynamicSchema),
  });

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

      // 이동
      router.push(`/result/${TEMPLATE_TYPE.SURVEY}/${id}`);
    },
  });

  const onSubmitHandler = (data: any) => {
    mutate(data);
  };

  // pending 끝나고 성공이면 유지하기
  if (isPending || isSuccess) {
    return (
      <>
        <LoadingStreming />
      </>
    );
  }

  return (
    <>
      <FormProvider {...formMethod}>
        <div className="flex flex-col gap-10 mb-10 mt-10">
          {/* Gender Chk  */}
          {isGenderCollected && <OptionGenderGroup />}

          {/* age Chk  */}
          {isAgeCollected && <OptionAgeGroup />}
        </div>

        {questions.map((qs) => {
          return (
            <Card key={qs.id}>
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
            </Card>
          );
        })}
      </FormProvider>

      <div className="mt-5 flex justify-center">
        <Button
          type="submit"
          size={"lg"}
          onClick={formMethod.handleSubmit(onSubmitHandler)}
          disabled={isPending || isSuccess}
        >
          제출하기
        </Button>
      </div>
    </>
  );
}

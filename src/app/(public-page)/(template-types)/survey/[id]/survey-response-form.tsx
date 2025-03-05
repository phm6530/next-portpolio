"use client";
import {
  AnswerSurvey,
  QUESTION_TYPE,
  SurveyTemplateDetail,
} from "@/types/survey.type";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import { TEMPLATE_TYPE } from "@/types/template.type";
import { useRouter } from "next/navigation";
import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSurveyFormSchema } from "./survey-response-form-schema";
import GenderResponseFields from "../components/gender-response-fields";
import AgeResponseFields from "../components/age-response-fields";
import TextResponseField from "../components/text-response-fields";
import SelectResponseField from "../components/select-response-fields";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import ImageThumbNail from "@/components/ui/image-thumbnail";
import { Check } from "lucide-react";

export default function SurveyResponseForm({
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
        return {
          questionId: e.id,
          type: e.type,
          answer: "",
          required: e.required,
        };
      } else if (e.type === QUESTION_TYPE.SELECT) {
        return {
          questionId: e.id,
          type: e.type,
          optionId: [],
          required: e.required,
        };
      } else {
        throw new Error("지원되지 않는 질문 타입입니다.") as never;
      }
    }),
  };

  const dynamicSchema = createSurveyFormSchema(
    isGenderCollected,
    isAgeCollected,
    questions
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
      console.log(data);
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
      queryClient.removeQueries({
        queryKey: [QUERY_KEY.SURVEY_RESULTS, id + ""],
      });

      // 이동
      router.push(`/result/${TEMPLATE_TYPE.SURVEY}/${id}`);
    },
  });

  const onSubmitHandler = (data: any) => {
    console.log(data);
    mutate(data);
  };

  // pending 끝나고 성공이면 유지하기
  if (isPending || isSuccess) {
    return (
      <>
        <LoadingWrapper />
      </>
    );
  }

  return (
    <>
      <FormProvider {...formMethod}>
        <div className="flex flex-col gap-10 mb-10 mt-10">
          {/* Gender Chk  */}
          {isGenderCollected && <GenderResponseFields />}
          {/* age Chk  */}
          {isAgeCollected && <AgeResponseFields />}

          {questions.map((qs, idx) => {
            return (
              <Card key={qs.id} className="md:py-5 py-2 px-1 rounded-2xl">
                {/* Header 같이쓰기 */}

                <CardHeader className="md:p-6 p-3">
                  <CardTitle>
                    <div className="flex gap-2 items-center">
                      <span className="text-lg md:text-2xl font-Paperlogy text-indigo-400">
                        Q. {idx + 1}{" "}
                      </span>
                    </div>

                    <div className="mt-10">
                      <span>{qs.label}</span>
                      <CardDescription>
                        <div className="flex gap-3 mt-3  text-[12px] text-point/80">
                          {"options" in qs && qs.multi_select && (
                            <>
                              <span className="font-normal flex gap-2">
                                {/* <CheckCheck className="w-3 h-3" /> */}
                                복수 선택 가능
                              </span>
                              {"/"}
                            </>
                          )}

                          {!qs.required && (
                            <p className="flex  rounded-full mt-3 gap-2 text-[12px] items-center  font-normal leading-7  dark:text-indigo-300 ">
                              <Check className="w-5 h-5" />
                              선택 항목
                            </p>
                          )}
                        </div>{" "}
                      </CardDescription>

                      <CardDescription className="mt-3 font-normal">
                        {qs.img && <ImageThumbNail thumbnail={qs.img} />}
                      </CardDescription>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 md:p-6 p-3">
                  {(() => {
                    switch (qs.type) {
                      case QUESTION_TYPE.TEXT:
                        return <TextResponseField qsId={qs.id} />;
                      //주관식
                      case QUESTION_TYPE.SELECT:
                        if ("options" in qs)
                          return (
                            <SelectResponseField
                              label={qs.label}
                              options={qs.options}
                              idx={idx}
                              isMulti={qs.multi_select}
                            />
                          );
                      default:
                        return null as never;
                    }
                  })()}{" "}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </FormProvider>

      <div className="mt-5 flex justify-center">
        <Button
          type="submit"
          size={"lg"}
          onClick={formMethod.handleSubmit(onSubmitHandler)}
          disabled={isPending || isSuccess}
          className="w-full py-8"
        >
          제출하기
        </Button>
      </div>
    </>
  );
}

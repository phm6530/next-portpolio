"use client";

import LoadingSpier from "@/app/_components/ui/loading/LoadingSpiner";
import { fetchTemplateDetail } from "@/app/_services/surveySerivce";
import { TemplateUnionType } from "@/app/template/[...detail]/page";
import OptionAgeGroup from "@/app/template/_component/OptionAgegroup";
import OptionGenderGroup from "@/app/template/_component/OptionGendergroup";
import { AddsurveyDetailProps } from "@/types/templateSurvey";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { FieldError, FormProvider, useForm } from "react-hook-form";
import classes from "./template.module.scss";
import { useRouter } from "next/navigation";

import { withFetch } from "@/app/lib/helperClient";
import { localStorageHandler } from "@/app/lib/localStorageHandler";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Option {
  label: string;
  value: string;
}

export default function SurveyTemplateDetail({
  templateType,
  surveyId,
}: {
  templateType: TemplateUnionType;
  surveyId: number;
}) {
  const formMethod = useForm();
  const router = useRouter();

  const [participatedAt, setParticipatedAt] = useState<string | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: [templateType, surveyId],
    queryFn: () =>
      fetchTemplateDetail<AddsurveyDetailProps>(templateType, +surveyId),
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

  //Submit
  const onSubmitHandler = async (
    formData: Record<string, string | Option[]>
  ) => {
    mutate(formData);
  };

  if (data) {
    return (
      <>
        {!!participatedAt && (
          <>
            이미 {participatedAt}에 참여하신 이력이 있어요!
            <button onClick={() => router.push(`/template/result/${surveyId}`)}>
              결과 보기
            </button>
          </>
        )}
        <h1>{data.title}</h1>
        <h2>{data.description}</h2>

        {/* Option  */}
        <FormProvider {...formMethod}>
          {Boolean(Number(data.templateOption!.genderChk)) && (
            <OptionGenderGroup />
          )}
          {Boolean(Number(data.templateOption!.ageChk)) && <OptionAgeGroup />}
        </FormProvider>

        {data.questions.map((qs) => {
          return (
            <div key={`question-${qs.id}`}>
              <div>{qs.label}</div>
              {qs.type === "text" ? (
                <div>
                  <input
                    type="text"
                    {...formMethod.register(`${qs.id}`, {
                      required: "필수 항목입니다.",
                    })}
                    autoComplete="off"
                  />
                  {formMethod.formState.errors[`${qs.id}`]?.message && "에러"}
                </div>
              ) : (
                <div>
                  {qs.options?.map((e, idx) => {
                    return (
                      <label key={`option-${idx}`}>
                        <input
                          type="radio"
                          key={idx}
                          value={e.value}
                          {...formMethod.register(`${qs.id}`, {
                            required: "필수 항목입니다.",
                          })}
                        />
                        {e.optionPictrue && (
                          <div className={classes.previewContainer}>
                            <Image
                              src={e.optionPictrue}
                              layout="responsive"
                              width={16}
                              height={9}
                              style={{ maxWidth: 700, objectFit: "cover" }}
                              alt="preview"
                              priority
                            />
                          </div>
                        )}

                        {e.label}
                      </label>
                    );
                  })}
                  {
                    (formMethod.formState.errors[`${qs.id}`] as FieldError)
                      ?.message
                  }
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={formMethod.handleSubmit(onSubmitHandler)}
        >
          submit
        </button>
      </>
    );
  }
}

"use client";

import LoadingSpier from "@/app/_components/ui/loading/LoadingSpiner";
import { fetchTemplateDetail } from "@/app/_services/surveySerivce";
import { TemplateUnionType } from "@/app/template/[...detail]/page";
import { surveyDetailProps } from "@/types/templateSurvey";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
  const { isLoading, data } = useQuery({
    queryKey: [templateType, surveyId],
    queryFn: () =>
      fetchTemplateDetail<surveyDetailProps>(templateType, +surveyId),
    staleTime: 10000,
    enabled: !!surveyId,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data) {
      const defaultValues = data.questions.reduce<Record<string, string>>(
        (acc, qs, idx) => {
          if (qs.type === "text") {
            acc[`question-${idx + 1}`] = "";
            return acc;
          } else {
            return acc;
          }
        },
        {}
      );

      reset(defaultValues);
    }
  }, [data, reset]);

  if (isLoading) {
    return <LoadingSpier />;
  }

  const onSubmitHandler = (data: Record<string, string | Option[]>) => {
    console.log("제출!");
  };

  if (data) {
    return (
      <>
        <h1>{data.title}</h1>
        <h2>{data.description}</h2>
        {data.questions.map((qs, qsIdx) => {
          return (
            <div key={`question-${qs.id}`}>
              <div>{qs.label}</div>
              {qs.type === "text" ? (
                <div>
                  <input
                    type="text"
                    {...register(`question-${qsIdx + 1}`, {
                      required: "필수 항목입니다.",
                    })}
                    autoComplete="off"
                  />
                  {errors[`question-${qsIdx + 1}`]?.message && "에러"}
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
                          {...register(`option-${qsIdx + 1}`, {
                            required: "필수 항목입니다.",
                          })}
                        />
                        {e.label}
                      </label>
                    );
                  })}{" "}
                  {errors[`option-${qsIdx + 1}`]?.message && "에러"}
                </div>
              )}
            </div>
          );
        })}

        <button type="button" onClick={handleSubmit(onSubmitHandler)}>
          submit
        </button>
      </>
    );
  }
}

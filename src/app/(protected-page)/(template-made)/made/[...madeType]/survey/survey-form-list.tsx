"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";
import { FormMessage } from "@/components/ui/form";
import CreateSurveySelect from "./create-survey-select";
import CreateSurveyText from "./create-survey-text";
import { useEffect } from "react";

export default function CreateSurveyList() {
  const {
    control,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<RequestSurveyFormData>();
  const { remove } = useFieldArray({
    control,
    name: "questions",
  });

  //Get보단 watch가 성능이 좋다 ,.
  const questionsWatch = watch("questions");

  //에러 수동 처리..
  useEffect(() => {
    if (questionsWatch.length > 0) {
      setError("questions", { message: "" });
    }
  }, [questionsWatch, setError]); //

  return (
    <>
      {/* List */}
      <div className="flex flex-col gap-10 rounded-sm">
        {questionsWatch.map((field, qsIdx) => {
          if (field.type === QUESTION_TYPE.TEXT) {
            return (
              <CreateSurveyText
                key={`typeText-${qsIdx}`}
                surveyIdx={qsIdx}
                remove={remove}
              />
            );
          } else if (field.type === QUESTION_TYPE.SELECT) {
            //리스트 만들기 - Props으로..
            return (
              <CreateSurveySelect
                key={`typeSelect-${qsIdx}`}
                surveyDelete={remove}
                surveyIdx={qsIdx}
              />
            );
          }
        })}
        {<FormMessage>{errors.questions?.root?.message}</FormMessage>}
      </div>
    </>
  );
}

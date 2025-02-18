"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import SurveyTypeSelect from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeSelect";
import SurveyTypeText from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeText";
import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";

export default function SurveyList() {
  const { control, watch } = useFormContext<RequestSurveyFormData>();
  const { remove } = useFieldArray({
    control,
    name: "questions",
  });

  //Get보단 watch가 성능이 좋다 ,.
  const questionsWatch = watch("questions");

  return (
    <>
      {/* List */}
      <div className="flex flex-col gap-6 rounded-sm">
        {questionsWatch.map((field, qsIdx) => {
          if (field.type === QUESTION_TYPE.TEXT) {
            return (
              <SurveyTypeText
                key={`typeText-${qsIdx}`}
                surveyIdx={qsIdx}
                remove={remove}
              />
            );
          } else if (field.type === QUESTION_TYPE.SELECT) {
            //리스트 만들기 - Props으로..
            return (
              <SurveyTypeSelect
                key={`typeSelect-${qsIdx}`}
                surveyDelete={remove}
                surveyIdx={qsIdx}
                // imgId={imgId}
              />
            );
          }
        })}
      </div>
    </>
  );
}

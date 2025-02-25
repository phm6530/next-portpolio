"use client";

import { useFormContext } from "react-hook-form";
import { RequestSurveyFormData } from "./CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";

export default function SurveyStatus() {
  const { watch } = useFormContext<RequestSurveyFormData>();

  const questionsWatch = watch("questions");

  //갯수
  const cntType = (type: QUESTION_TYPE) => {
    return questionsWatch.filter((item) => item.type === type).length;
  };

  return (
    <div className="flex gap-3 items-center [&>div]:flex-1 [&>div]:text-sm">
      <div className="border flex gap-2 justify-center border-border  text-center p-4 bg-third rounded-lg">
        총 항목 <span className="text-primary">{questionsWatch.length}</span>개
      </div>

      <div className="border flex gap-2 justify-center border-border   text-center p-4 bg-third rounded-lg">
        주관식 항목 <span>{cntType(QUESTION_TYPE.TEXT)}</span>개
      </div>

      <div className="border flex gap-2 justify-center border-border text-center p-4 bg-third rounded-lg">
        객관식 항목 <span>{cntType(QUESTION_TYPE.SELECT)}</span>개
      </div>
    </div>
  );
}

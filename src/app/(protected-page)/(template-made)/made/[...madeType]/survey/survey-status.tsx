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
    <div className="flex gap-1 md:gap-3 items-center [&>div]:flex-1 [&>div]:text-sm ">
      <div className="flex gap-2 border border-border/50 justify-center  text-center py-4 px-2 md:p-4 bg-custom-input rounded-lg">
        총 항목 <span className="text-point">{questionsWatch.length}</span>개
      </div>

      <div className="flex gap-2 border border-border/50 justify-center text-[12px] text-center  py-4 px-2 md:p-4 bg-custom-input rounded-lg">
        주관식 항목 <span>{cntType(QUESTION_TYPE.TEXT)}</span>개
      </div>

      <div className="flex gap-2 border border-border/50 justify-center text-center  py-4 px-2 md:p-4 bg-custom-input rounded-lg">
        객관식 항목 <span>{cntType(QUESTION_TYPE.SELECT)}</span>개
      </div>
    </div>
  );
}

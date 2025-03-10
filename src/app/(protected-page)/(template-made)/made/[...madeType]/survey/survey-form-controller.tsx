import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { QUESTION_TYPE } from "@/types/survey.type";
import Pen from "/public/asset/icon/pen.svg";
import Checkbox from "/public/asset/icon/checkbox.svg";
import CustomButton from "@/components/ui/button-custom";
import { SurveyPayload } from "./CreateSurvey";

export type RequestSelectOption = {
  value: string;
  img?: string;
  type: QUESTION_TYPE.SELECT;
};

export type RequestText = {
  label: string;
  img?: string;
  type: QUESTION_TYPE.TEXT;
  required: boolean; // 필수 여부
};

// 복수여부 추가
export type RequestSelect = {
  label: string;
  type: QUESTION_TYPE.SELECT;
  multi_select: boolean; //복수선택 여부
  required: boolean; // 필수 여부
  options: RequestSelectOption[];
};

export default function CreateSurveyFormController() {
  const { control } = useFormContext<SurveyPayload<"req">>();

  //questions
  const { append } = useFieldArray({
    control,
    name: "questions",
  });

  const addSurveyItem = (itemType: QUESTION_TYPE) => {
    if (itemType === QUESTION_TYPE.TEXT) {
      append({
        label: "",
        type: QUESTION_TYPE.TEXT,
        required: true,
      });
    } else if (itemType === QUESTION_TYPE.SELECT) {
      append({
        label: "",
        type: QUESTION_TYPE.SELECT,
        multi_select: false,
        required: true,
        options: [
          { value: "", type: QUESTION_TYPE.SELECT },
          { value: "", type: QUESTION_TYPE.SELECT },
        ],
      });
    }
  };

  return (
    <div className="grid grid-cols-[repeat(2,1fr)] gap-3">
      <CustomButton onClick={() => addSurveyItem(QUESTION_TYPE.TEXT)}>
        <Pen /> 주관식 추가
      </CustomButton>

      <CustomButton onClick={() => addSurveyItem(QUESTION_TYPE.SELECT)}>
        <Checkbox /> 객관식 추가
      </CustomButton>
    </div>
  );
}

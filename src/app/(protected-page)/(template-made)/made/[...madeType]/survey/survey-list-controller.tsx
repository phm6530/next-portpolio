import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";
import Pen from "/public/asset/icon/pen.svg";
import Checkbox from "/public/asset/icon/checkbox.svg";
import CustomButton from "@/components/ui/button-custom";

export type RequestSelectOption = {
  label: string;
  value: string;
  img?: string;
  type: QUESTION_TYPE.SELECT;
};

export type RequestText = {
  label: string;
  img?: string;
  type: QUESTION_TYPE.TEXT;
};

// 복수여부 추가
export type RequestSelect = {
  label: string;
  type: QUESTION_TYPE.SELECT;
  multi_select: boolean; //복수선택 여부
  options: RequestSelectOption[];
};

export default function SurveyListController() {
  const { control } = useFormContext<RequestSurveyFormData>();

  //questions
  const { append } = useFieldArray({
    control,
    name: "questions",
  });

  const addSurveyItem = (itemType: QUESTION_TYPE) => {
    if (itemType === QUESTION_TYPE.TEXT) {
      append({
        label: "",
        type: itemType,
      });
    } else if (itemType === QUESTION_TYPE.SELECT) {
      //라디오니까 무조건 Default 2개
      append({
        label: "",
        type: itemType,
        multi_select: false, // Default False..
        options: [
          {
            value: "",
            type: QUESTION_TYPE.SELECT,
          },
          {
            value: "",
            type: QUESTION_TYPE.SELECT,
          },
        ],
      } as RequestSelect);
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

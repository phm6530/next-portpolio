import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import classes from "./AddQuestionController.module.scss";
import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";

import pen from "/public/asset/icon/pen.svg";
import FormToolButton from "@/app/(protected-page)/(template-made)/components/FormToolButton";
import checkbox from "/public/asset/icon/checkbox.svg";

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

export default function AddQuestionController() {
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
    <div className={classes.controllerWrapper}>
      <FormToolButton
        clickEvent={() => addSurveyItem(QUESTION_TYPE.TEXT)}
        Svg={pen}
      >
        주관식 추가
      </FormToolButton>

      <FormToolButton
        clickEvent={() => addSurveyItem(QUESTION_TYPE.SELECT)}
        Svg={checkbox}
      >
        객관식 추가
      </FormToolButton>
    </div>
  );
}

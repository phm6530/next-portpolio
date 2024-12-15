import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import classes from "./AddQuestionController.module.scss";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import { QUESTION_TYPE } from "@/types/survey.type";
import Lists from "/public/asset/icon/lists.svg";
import pencil from "/public/asset/icon/pencil.svg";
import FormToolButton from "@/app/(template-made)/components/FormToolButton";

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

export type RequestSelect = {
  label: string;
  type: QUESTION_TYPE.SELECT;
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
        Svg={pencil}
      >
        주관식 추가
      </FormToolButton>

      <FormToolButton
        clickEvent={() => addSurveyItem(QUESTION_TYPE.SELECT)}
        Svg={Lists}
      >
        객관식 추가
      </FormToolButton>
    </div>
  );
}

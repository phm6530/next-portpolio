import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  AddSurveyFormProps,
  SurveyText,
  SurveyRadioProps,
} from "@/types/templateSurvey";
import classes from "./AddQuestionController.module.scss";

export default function AddQuestionController() {
  const { control } = useFormContext<AddSurveyFormProps>();
  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });

  const addSurveyItem = (itemType: "text" | "select") => {
    if (itemType === "text") {
      append({
        id: fields.length + 1,
        label: "",
        type: itemType,
      } as SurveyText);
    } else if (itemType === "select") {
      //라디오니까 무조건 Default 2개
      append({
        id: fields.length + 1,
        label: "",
        type: itemType,
        options: [
          {
            idx: 0,
            value: "",
          },
          {
            idx: 1,
            value: "",
          },
        ],
      } as SurveyRadioProps);
    }
  };

  return (
    <div className={classes.controllerWrapper}>
      <div className={classes.buttonWrap}>
        <button type="button" onClick={() => addSurveyItem("text")}>
          + 주관식 추가
        </button>
      </div>
      <div className={classes.buttonWrap}>
        <button type="button" onClick={() => addSurveyItem("select")}>
          + 객관식 추가
        </button>
      </div>
    </div>
  );
}

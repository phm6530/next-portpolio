import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { AddSurveyFormProps, SurveyText, SurveyRadio } from "@/types/survey";

export default function SurveyController() {
  const { control, trigger } = useFormContext<AddSurveyFormProps>();
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
      append({
        id: fields.length + 1,
        label: "",
        options: [],
        type: itemType,
      } as SurveyRadio);
    }

    trigger("items");
  };

  return (
    <div className="SurveyController">
      <button type="button" onClick={() => addSurveyItem("text")}>
        주관식 추가
      </button>
      <button type="button" onClick={() => addSurveyItem("select")}>
        객관식 추가
      </button>
    </div>
  );
}

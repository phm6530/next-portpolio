"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { AddSurveyFormProps, SurveyType } from "@/types/survey";

export default function SurveyItemList() {
  const {
    control,
    getValues,
    register,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  const { remove } = useFieldArray({
    control,
    name: "items",
  });

  // get List
  const surveyList = getValues("items");

  console.log(surveyList);

  const cntType = (type: SurveyType["type"]) => {
    return surveyList.filter((item) => item.type === type).length;
  };

  return (
    <>
      <p>총 항목 : {surveyList.length}</p>
      <p>TEXT 항목 : {cntType("text")}</p>
      <p>선택 항목 : {cntType("select")}</p>

      {surveyList.map((field, idx) => {
        if (field.type === "text") {
          return (
            <div key={idx}>
              <h1> Q.{idx + 1}</h1>
              <input
                type="text"
                {...register(`items.${idx}.label`, { required: "필수" })}
              />
              {/* delete */}
              <button type="button" onClick={() => remove(idx)}>
                삭제
              </button>
            </div>
          );
        } else if (field.type === "select") {
          return (
            <div key={idx}>
              <h1> Q.{idx + 1}</h1>
              <input
                type="text"
                {...register(`items.${idx}.label`, { required: "필수" })}
              />

              <div>
                <h1>List</h1>
                <div></div>
              </div>

              <button type="button" onClick={() => remove(idx)}>
                삭제
              </button>
            </div>
          );
        }
      })}
    </>
  );
}

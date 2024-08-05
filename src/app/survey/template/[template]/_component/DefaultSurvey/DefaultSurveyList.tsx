"use client";
import { useFormContext, useFieldArray, FieldErrors } from "react-hook-form";
import { AddSurveyFormProps, SurveyType } from "@/types/survey";
import SurveyTypeSelect from "@/app/survey/template/[template]/_component/DefaultSurvey/SurveyTypeSelect";

export default function DefaultSurveyList() {
  const {
    control,
    getValues,
    setValue,
    register,
    trigger,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  const { remove } = useFieldArray({
    control,
    name: "items",
  });

  // get List
  const surveyList = getValues("items");

  //갯수
  const cntType = (type: SurveyType["type"]) => {
    return surveyList.filter((item) => item.type === type).length;
  };

  return (
    <>
      <p>총 항목 : {surveyList.length}</p>
      <p>TEXT 항목 : {cntType("text")}</p>
      <p>선택 항목 : {cntType("select")}</p>

      {surveyList.map((field, surveyIdx) => {
        if (field.type === "text") {
          return (
            <div key={surveyIdx}>
              <h1> Q.{surveyIdx + 1}</h1>

              <input
                type="text"
                {...register(`items.${surveyIdx}.label`, {
                  required: "질문 제목은 필수항목 입니다.",
                })}
              />
              {/* delete */}
              <button type="button" onClick={() => remove(surveyIdx)}>
                삭제
              </button>
              <div>
                {errors.items?.[surveyIdx]?.label?.message as string | null}
              </div>
            </div>
          );
        } else if (field.type === "select") {
          //리스트 만들기 - Props으로 넘겨서 메모리 아끼기
          // const handleAddOption = (idx: number, cnt: number = 1) => {
          //   const newOption = [...Array(cnt)].map((_, idx) => {

          //     return {
          //       idx,
          //       value: "",
          //     };
          //   });

          //   const curOptions = getValues(`items.${idx}.options`) || [];
          //   setValue(`items.${idx}.options`, [...curOptions, ...newOption]);
          //   trigger(`items.${idx}.options`);
          // };

          return (
            <div key={surveyIdx}>
              <h1> Q.{surveyIdx + 1} </h1>

              <SurveyTypeSelect
                // handleAddOption={handleAddOption}
                surveyDelete={remove}
                surveyIdx={surveyIdx}
              />
            </div>
          );
        }
      })}
    </>
  );
}

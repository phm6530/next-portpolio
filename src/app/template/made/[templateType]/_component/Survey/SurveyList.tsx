"use client";
import { useFormContext, useFieldArray } from "react-hook-form";
import { AddSurveyFormProps, surveyParams } from "@/types/templateSurvey";
import SurveyTypeSelect from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeSelect";
import { useParams } from "next/navigation";
import { SurveyType } from "@/types/template";
import { ChangeEvent, useRef, useState } from "react";
import useStore from "@/store/store";
import { imgUploader } from "@/app/lib/uploaderHanlder";
import SurveyTypeText from "@/app/template/made/[templateType]/_component/Survey/SurveyTypeText";

export default function SurveyList() {
  const { control, getValues } = useFormContext<AddSurveyFormProps>();

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

  //img Params
  const params: surveyParams = useParams();
  const [_, imgId] = params.templateType;

  return (
    <>
      <p>총 항목 : {surveyList.length}</p>
      <p>TEXT 항목 : {cntType("text")}</p>
      <p>선택 항목 : {cntType("select")}</p>

      {surveyList.map((field, surveyIdx) => {
        if (field.type === "text") {
          return (
            <SurveyTypeText
              key={`typeText-${surveyIdx}`}
              surveyIdx={surveyIdx}
              remove={remove}
            />
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
                imgId={imgId}
              />
            </div>
          );
        }
      })}
      {surveyList.length === 0 && "하나이상의 질문을 하셔야합니다."}
    </>
  );
}

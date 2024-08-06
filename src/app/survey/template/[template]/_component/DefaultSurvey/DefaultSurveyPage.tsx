"use client";

import DefaultSurveyList from "@/app/survey/template/[template]/_component/DefaultSurvey/DefaultSurveyList";
import SurveyTypeText from "@/app/survey/template/[template]/_component/SurveyTypeText";
import ItemController from "@/app/survey/template/[template]/_component/DefaultSurvey/ItemController";
import usePreview from "@/app/survey/template/[template]/_component/Preview/usePreview";

import { AddSurveyFormProps } from "@/types/survey";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";

const initialFormState: AddSurveyFormProps = {
  title: "",
  description: "",
  items: [],
};
type TemplateProps = "default" | "rank";

export default function DefaultSurveyPage({
  template,
}: {
  template: TemplateProps;
}) {
  const { RenderPreview } = usePreview();

  const formState = useForm<AddSurveyFormProps>({
    defaultValues: initialFormState,
  });

  const formattedDate = dayjs().format("YYYY. MM. DD. A HH:mm ");
  useEffect(() => {
    const localData = localStorage.getItem(`${template}-${1}`);
    setTimeout(() => {
      if (localData) {
        if (
          confirm(`${formattedDate} 경에 임시저장된 글을 불러오시겠습니까?`)
        ) {
          formState.reset(JSON.parse(localData));
        } else {
          localStorage.removeItem(`${template}-${1}`);
        }
      }
    }, 500);

    return () => {
      if (
        JSON.stringify(initialFormState) ===
        JSON.stringify(formState.getValues())
      )
        return;

      localStorage.setItem(
        `${template}-${1}`,
        JSON.stringify(formState.getValues())
      );
    };
  }, [template, formState, formattedDate]);

  const surveyForm = async (data: AddSurveyFormProps) => {
    if (formState.getValues("items").length !== 0) {
      console.log(data);
      console.log("제출완료!");
    } else {
      console.log("하나도없는데!");
    }
  };

  const resetField = () => {
    if (confirm("초기화 하시겠습니까?")) {
      formState.reset(initialFormState);
      localStorage.removeItem(`${template}-${1}`);
    } else {
      return;
    }
  };

  return (
    <>
      <RenderPreview>프리뷰</RenderPreview>
      <button onClick={() => resetField()}>설문조사 초기화</button>
      <form onSubmit={formState.handleSubmit(surveyForm)}>
        {/* 공통 제목 */}
        <SurveyTypeText
          label={"title"}
          error={formState.formState.errors.title}
          requiredMsg={"제목은 필수 입니다!"}
          register={formState.register}
        />

        {/* 공통 설명 적기 */}
        <SurveyTypeText
          label={"description"}
          error={formState.formState.errors.description}
          requiredMsg={"간단한 설명을 적어주세요!"}
          register={formState.register}
        />

        <FormProvider {...formState}>
          {/* Survey Edit Form + List*/}
          <DefaultSurveyList />

          {/* Survey Controller */}
          <ItemController />
        </FormProvider>

        <button type="submit">제출</button>
        {/* <button type="button" onClick={previewSurvey}>
          Preview
        </button> */}
      </form>
    </>
  );
}

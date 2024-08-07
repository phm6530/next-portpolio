/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AddSurveyFormProps, TemplateProps } from "@/types/survey";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

import dayjs from "dayjs";
import usePreview from "@/app/survey/template/[...template]/_component/Preview/usePreview";
import InputTypeText from "@/app/survey/template/[...template]/_component/InputTypeText";
import DefaultSurveyList from "@/app/survey/template/[...template]/_component/DefaultSurvey/DefaultSurveyList";
import ItemController from "@/app/survey/template/[...template]/_component/DefaultSurvey/ItemController";

const initialFormState: AddSurveyFormProps = {
  title: "",
  description: "",
  items: [],
};

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
  }, []);

  //submit
  const onSubmitHandler = async (data: AddSurveyFormProps) => {
    try {
      if (formState.getValues("items").length !== 0) {
        const resultData = { ...data, template };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_THIS_URL}/api/survey`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(resultData), // data를 JSON 문자열로 변환하여 body에 전달
          }
        );
        if (!response.ok) {
          throw new Error("Error..");
        }

        console.log(await response.json());
      } else {
        console.log("error!");
      }
    } catch (error) {
      console.log(error);
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
      <form onSubmit={formState.handleSubmit(onSubmitHandler)}>
        {/* 공통 제목 */}
        <InputTypeText
          label={"title"}
          error={formState.formState.errors.title}
          requiredMsg={"제목은 필수 입니다!"}
          register={formState.register}
        />

        {/* 공통 설명 적기 */}
        <InputTypeText
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
        <button type="button">미리보기</button>
        {/* <button type="button" onClick={previewSurvey}>
          Preview
        </button> */}
      </form>
    </>
  );
}

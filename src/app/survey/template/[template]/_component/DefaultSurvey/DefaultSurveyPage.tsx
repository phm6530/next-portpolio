"use client";

import DefaultSurveyList from "@/app/survey/template/[template]/_component/DefaultSurvey/DefaultSurveyList";
import SurveyTypeText from "@/app/survey/template/[template]/_component/SurveyTypeText";
import SurveyController from "@/app/survey/template/[template]/_component/SurveyController";
import { AddSurveyFormProps } from "@/types/survey";
import { FormProvider, useForm } from "react-hook-form";
import usePreview from "@/app/survey/template/[template]/_component/Preview/usePreview";

const initialFormState: AddSurveyFormProps = {
  title: "",
  description: "",
  items: [],
};

export default function DefaultSurveyPage() {
  const { setView, RenderPreview } = usePreview();

  const formState = useForm<AddSurveyFormProps>({
    defaultValues: initialFormState,
  });

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
      formState.reset();
    } else {
      return;
    }
  };

  const previewSurvey = () => {
    setView(true);
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
          <SurveyController />
        </FormProvider>

        <button type="submit">제출</button>
        <button type="button" onClick={previewSurvey}>
          미리보기
        </button>
      </form>
    </>
  );
}

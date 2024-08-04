"use client";

import DefaultSurveyList from "@/app/survey/template/[template]/_component/DefaultSurvey/DefaultSurveyList";
import SurveyTypeText from "@/app/survey/template/[template]/_component/SurveyTypeText";
import SurveyController from "@/app/survey/template/[template]/_component/SurveyController";
import { AddSurveyFormProps } from "@/types/survey";
import { FormProvider, useForm } from "react-hook-form";

const initialFormState: AddSurveyFormProps = {
  title: "",
  description: "",
  items: [],
};

export default function DefaultSurvey() {
  const formState = useForm<AddSurveyFormProps>({
    defaultValues: initialFormState,
  });

  const surveyForm = (data: AddSurveyFormProps) => {
    console.log(data);
    console.log("제출완료!");
  };

  const resetField = () => {
    if (confirm("초기화 하시겠습니까?")) {
      formState.reset();
    } else {
      return;
    }
  };

  return (
    <>
      <button onClick={() => resetField()}>설문조사 초기화</button>
      <form onSubmit={formState.handleSubmit(surveyForm)}>
        {/* 제목 */}
        <SurveyTypeText
          label={"title"}
          error={formState.formState.errors.title}
          requiredMsg={"제목은 필수 입니다!"}
          register={formState.register}
        />

        {/* 설명 적기 */}
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
      </form>
    </>
  );
}

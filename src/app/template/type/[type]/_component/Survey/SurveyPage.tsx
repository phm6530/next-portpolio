/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AddSurveyFormProps } from "@/types/templateSurvey";
import { TemplateProps } from "@/types/template";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";

import SurveyText from "@/app/template/type/[type]/_component/Survey/SurveyText";
import SurveyList from "@/app/template/type/[type]/_component/Survey/SurveyList";
import QuestionAddController from "@/app/template/type/[type]/_component/Survey/QuestionAddController";
import usePreview from "@/app/template/type/[type]/_component/Preview/usePreview";
import { useEffect } from "react";

import dayjs from "dayjs";

import useStore from "@/store/store";
import AddAgeGroup from "@/app/template/type/[type]/_component/templateAddOptions/AddAgeGroup";
import AddGender from "@/app/template/type/[type]/_component/templateAddOptions/AddGender";
import TemplateAccess from "@/app/template/type/[type]/_component/TemplateAccess";
import { withFetch } from "@/app/lib/helperClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const initialFormState: AddSurveyFormProps = {
  title: "",
  description: "",
  genderChk: "1",
  ageChk: "1",
  items: [],
  access_email: "",
  access_email_agreed: false,
};

export default function SurveyPage({ template }: { template: TemplateProps }) {
  //zustand
  const settemplate_key = useStore((state) => state.settemplate_key);
  const removetemplate_key = useStore((state) => state.removetemplate_key);
  const template_key = useStore((state) => state.template_key);
  const router = useRouter();
  useEffect(() => {
    settemplate_key(uuid4());
    return () => {
      removetemplate_key();
    };
  }, []);

  //현재시간
  const nowDate = dayjs().format("YYYY. MM. DD. A HH:mm ");

  //로컬 시간 데이터 임시저장
  const tempSave = () => {
    localStorage.setItem("savedTime", nowDate);
    localStorage.setItem(template, JSON.stringify(formState.getValues()));

    alert("저장완료");
  };

  useEffect(() => {
    const localData = localStorage.getItem(template);
    const savedTime = localStorage.getItem("savedTime");

    setTimeout(() => {
      if (localData) {
        if (confirm(`${savedTime} 경에 임시저장된 글을 불러오시겠습니까?`)) {
          formState.reset(JSON.parse(localData));
        } else {
          localStorage.removeItem(template);
        }
      }
    }, 500);
  }, []);

  const { RenderPreview } = usePreview();
  const formState = useForm<AddSurveyFormProps>({
    defaultValues: initialFormState,
  });

  const { mutate } = useMutation<
    unknown,
    Error,
    AddSurveyFormProps & { template: string; template_key: string }
  >({
    mutationFn: (data) =>
      withFetch(async () => {
        return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/template`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
    onSuccess: () => {
      router.replace("/template");
      alert("성공");
    },
  });

  //submit
  const onSubmitHandler = async (data: AddSurveyFormProps) => {
    try {
      if (formState.getValues("items").length !== 0) {
        const resultData = {
          ...data,
          template,
          template_key: template_key as string,
        };

        console.log(resultData);

        mutate(resultData);
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
      localStorage.removeItem(template);
    } else {
      return;
    }
  };

  return (
    <>
      <RenderPreview>프리뷰</RenderPreview>
      <button onClick={() => resetField()}>설문조사 초기화</button>
      <form onSubmit={formState.handleSubmit(onSubmitHandler)}>
        {/* 연령 별 체크*/}
        <FormProvider {...formState}>
          <AddAgeGroup />
          {/* 성별 별 체크*/}
          <AddGender />
        </FormProvider>

        {/* 공통 제목 */}
        <SurveyText
          label={"title"}
          error={formState.formState.errors.title}
          requiredMsg={"제목은 필수 입니다!"}
          register={formState.register}
        />

        {/* 공통 설명 적기 */}
        <SurveyText
          label={"description"}
          error={formState.formState.errors.description}
          requiredMsg={"간단한 설명을 적어주세요!"}
          register={formState.register}
        />
        <FormProvider {...formState}>
          {/* Survey Edit Form + List*/}
          <SurveyList />

          {/* Survey Controller */}
          <QuestionAddController />

          {/* 익명 사용자 - Email 정보동의  */}
          <TemplateAccess />
        </FormProvider>
        <button type="submit">제출</button>
        <button type="button" onClick={tempSave}>
          임시저장
        </button>
        {/* <button type="button" onClick={previewSurvey}>
          Preview
        </button> */}
      </form>
    </>
  );
}

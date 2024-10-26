"use client";

import { AddSurveyFormProps } from "@/types/templateSurvey";
import { TemplateTypeProps } from "@/types/template";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";

import SurveyList from "@/app/template/made/[templateType]/_component/Survey/SurveyList";
import AddQuestionController, {
  RequestSelect,
  RequestText,
} from "@/app/template/made/[templateType]/_component/Survey/AddQuestionController";
import usePreview from "@/app/template/made/[templateType]/_component/Preview/usePreview";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/config/base";
import dayjs from "dayjs";

import useStore from "@/store/store";
import AddAgeGroup from "@/app/template/made/[templateType]/_component/templateAddOptions/AddAgeGroup";
import AddGender from "@/app/template/made/[templateType]/_component/templateAddOptions/AddGender";
import TemplateAccess from "@/app/template/made/[templateType]/_component/TemplateAccess";
import { withFetch } from "@/util/clientUtil";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import AddDateRange from "@/app/template/made/[templateType]/_component/templateAddOptions/AddDateRange";
import FormInput from "@/components/ui/FormElement/FormInput";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import Button from "@/components/ui/button/Button";
import classes from "./CreateSurvey.module.scss";
import { TEMPLATE_TYPE } from "@/types/template.type";

//Form
export type RequestSurveyFormData = {
  title: string;
  description: string;
  thumbnail: string;
  isGenderCollected: boolean;
  isAgeCollected: boolean;
  templateType: TEMPLATE_TYPE;
  questions: (RequestText | RequestSelect)[];
};

export default function CreateSurvey() {
  const { RenderPreview } = usePreview();

  //기본 Inital Data
  const defaultValues: RequestSurveyFormData = {
    title: "",
    description: "",
    thumbnail: "",
    isGenderCollected: true, //기본값 True
    isAgeCollected: true, // 기본값 True
    templateType: TEMPLATE_TYPE.SURVEY,
    questions: [],
  };

  //초기 세션상태
  const router = useRouter();

  const formState = useForm<RequestSurveyFormData>({
    defaultValues,
  });

  const {
    register,
    formState: { errors },
    watch,
  } = formState;

  console.log(watch());

  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    Omit<AddSurveyFormProps, "dateRange"> & {
      template: string;
      template_key: string;
      dateRange: string[] | null;
    }
  >({
    mutationFn: (data) =>
      withFetch(async () => {
        return fetch(`${BASE_URL}/api/template`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
    onSuccess: () => {
      router.replace("/template");
      alert("설문조사 개설 완료되었습니다. ");
    },
  });

  //submit
  const onSubmitHandler = async (data: AddSurveyFormProps) => {
    // if (isSession && !curSession) {
    //   alert("세션이 만료되었습니다....");
    //   await signOut({ redirect: false });
    //   if (confirm("작성한 내용을 임시 저장 하시겠습니까?")) {
    //     tempSave();
    //   }
    //   router.push(`/auth/login?redirect=${pathname}`);
    //   return;
    // }
    // const dateformatting =
    //   data.dateRange?.map((e) => dayjs(e).format("YYYY-MM-DD")) || null;
    // const resultData = {
    //   ...data,
    //   template_key: template_key as string,
    //   dateRange: dateformatting,
    // };
    // 어드민이거나 필요한 필드가 채워졌을 경우 데이터 처리
    // if (
    //   session?.user.role === "admin" ||
    //   (formState.getValues("items").length !== 0 &&
    //     formState.getValues("access_pin") !== null)
    // ) {
    //   mutate(resultData);
    // }
  };

  const resetField = () => {
    if (confirm("초기화 하시겠습니까?")) {
      // formState.reset(initialFormState);
      // localStorage.removeItem(template);
    } else {
      return;
    }
  };

  return (
    <>
      <RenderPreview>프리뷰</RenderPreview>
      <button onClick={() => resetField()}>설문조사 초기화</button>
      <form
        className={classes.formContainer}
        // onSubmit={formState.handleSubmit(onSubmitHandler)}
      >
        <FormProvider {...formState}>
          <div>
            <h2>설정</h2>
            {/* 연령 별 체크*/}

            <AddAgeGroup />

            {/* 성별 별 체크*/}
            <AddGender />

            {/* 기간 */}
            <AddDateRange />
          </div>

          {/* 설문조사 제목 */}
          <FormInput
            {...register("title", {
              required: "제목은 필수 입니다!",
            })}
            inputName={"title"}
            autoComplete="off"
            placeholder="제목"
          />

          {/* 설문조사 설명 */}
          <FormTextarea
            {...register("description", {
              required: "간단한 설명을 적어주세요!",
            })}
            textareaName={"description"}
            placeholder="설문조사에 대한 설명을 적어주세요!"
            autoComplete="off"
          />

          {/* 썸네일 */}
          {/* <ThumbNailUploader
            template_type={PathSegments.Survey}
            // template_key={template_key as string}
          /> */}

          {/* Survey Edit Form + List*/}
          <SurveyList />

          {/* Survey Controller */}
          <AddQuestionController />

          {/* 익명 사용자 - Email 정보동의  */}
          {/* {!session && <TemplateAccess />} */}
        </FormProvider>
        <Button.submit type="submit" disabled={isPending}>
          설문조사 생성하기
        </Button.submit>
        {/* <button type="button" onClick={tempSave}>
          임시저장
        </button> */}
        {/* <button type="button" onClick={previewSurvey}>
          Preview
        </button> */}
      </form>
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AddSurveyFormProps } from "@/types/templateSurvey";
import { TemplateTypeProps } from "@/types/template";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";

import SurveyText from "@/app/template/made/[templateType]/_component/Survey/SurveyText";
import SurveyList from "@/app/template/made/[templateType]/_component/Survey/SurveyList";
import QuestionAddController from "@/app/template/made/[templateType]/_component/Survey/QuestionAddController";
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
import ThumbNailUploader from "@/app/template/made/[templateType]/_component/ThumbNailUploader";
import { PathSegments } from "@/types/upload";
import { getSession, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

const initialFormState: AddSurveyFormProps = {
  title: "",
  description: "",
  thumbnail: "",
  genderChk: "1",
  ageChk: "1",
  dateRange: null,
  items: [],

  // access_email: "",
  // access_email_agreed: false,
  // access_pin: null,
};

export default function SurveyPage({
  template,
  session,
}: {
  template: TemplateTypeProps;
  session: Session | null;
}) {
  //zustand
  const settemplate_key = useStore((state) => state.settemplate_key);
  const removetemplate_key = useStore((state) => state.removetemplate_key);
  const template_key = useStore((state) => state.template_key);
  const pathname = usePathname();

  const { RenderPreview } = usePreview();

  //초기 세션상태
  const [isSession] = useState<boolean>(session ? !!session : false);
  const router = useRouter();

  //현재시간
  const nowDate = dayjs().format("YYYY. MM. DD. A HH:mm ");

  //생성할 이미지 Key + template_Key 생성
  useEffect(() => {
    settemplate_key(uuid4());
    return () => {
      removetemplate_key();
    };
  }, []);

  //로컬 시간 데이터 임시저장
  const tempSave = () => {
    localStorage.setItem("savedTime", nowDate);
    localStorage.setItem(template, JSON.stringify(formState.getValues()));
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

  const formState = useForm<AddSurveyFormProps>({
    defaultValues: initialFormState,
  });

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
    const curSession = await getSession();

    if (isSession && !curSession) {
      alert("세션이 만료되었습니다....");
      await signOut({ redirect: false });

      if (confirm("작성한 내용을 임시 저장 하시겠습니까?")) {
        tempSave();
      }

      router.push(`/auth/login?redirect=${pathname}`);
      return;
    }

    const dateformatting =
      data.dateRange?.map((e) => dayjs(e).format("YYYY-MM-DD")) || null;

    const resultData = {
      ...data,
      template,
      template_key: template_key as string,
      dateRange: dateformatting,
    };

    // 어드민이거나 필요한 필드가 채워졌을 경우 데이터 처리
    if (
      session?.user.role === "admin" ||
      (formState.getValues("items").length !== 0 &&
        formState.getValues("access_pin") !== null)
    ) {
      mutate(resultData);
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
        <FormProvider {...formState}>
          {/* 연령 별 체크*/}
          <AddAgeGroup />

          {/* 성별 별 체크*/}
          <AddGender />

          {/* 기간 */}
          <AddDateRange />

          {/* 공통 제목 */}
          <p>title</p>
          <SurveyText label={"title"} requiredMsg={"제목은 필수 입니다!"} />

          {/* 공통 설명 적기 */}
          <p>Description</p>
          <SurveyText
            label={"description"}
            requiredMsg={"간단한 설명을 적어주세요!"}
          />

          {/* 썸네일 */}
          <ThumbNailUploader
            template_type={PathSegments.Survey}
            template_key={template_key as string}
          />

          {/* Survey Edit Form + List*/}
          <SurveyList />

          {/* Survey Controller */}
          <QuestionAddController />

          {/* 익명 사용자 - Email 정보동의  */}
          {!session && <TemplateAccess />}
        </FormProvider>
        <button type="submit" disabled={isPending}>
          제출
        </button>
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

"use client";

import { FormProvider, useForm } from "react-hook-form";
import { BASE_NEST_URL } from "@/config/base";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "@/components/ui/FormElement/FormInput";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import Button from "@/components/ui/button/Button";
import classes from "./CreateSurvey.module.scss";
import {
  TEMPLATE_TYPE,
  TemplateDetilaPageResponse,
} from "@/types/template.type";
import { v4 as uuid4 } from "uuid";

import BooleanGroup from "@/app/(template-made)/components/BooleanGroup";
import { QUERY_KEY } from "@/types/constans";
import SurveyList from "@/app/template/made/[templateType]/_component/Survey/SurveyList";
import AddQuestionController, {
  RequestSelect,
  RequestText,
} from "@/app/template/made/[templateType]/_component/Survey/AddQuestionController";
import usePreview from "@/app/template/made/[templateType]/_component/Preview/usePreview";
import { User } from "@/types/auth.type";
import { SessionStorage } from "@/utils/sessionStorage-token";
import fetchWithAuth from "@/utils/withRefreshToken";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import surveySchema from "@/app/(template-made)/made/[...madeType]/components/survey/schema";
import ThumbNailUploader from "@/app/(template-made)/components/ThumbNailUploader";

//Form
export type RequestSurveyFormData = {
  title: string;
  description: string;
  thumbnail: string;
  startDate?: Date | null; // 시작일
  endDate?: Date | null; //종료일
  isGenderCollected: boolean;
  isAgeCollected: boolean;
  templateType: TEMPLATE_TYPE;
  questions: (RequestText | RequestSelect)[];
  creator: User;
  templateKey: string | null;
};

// UserData는 useEffect로 처리
const defaultValues = {
  title: "",
  description: "",
  thumbnail: "",
  startDate: null,
  endDate: null,
  isGenderCollected: true,
  isAgeCollected: true,
  templateType: TEMPLATE_TYPE.SURVEY,
  questions: [],
  templateKey: null,
};

export default function CreateSurvey() {
  const { RenderPreview } = usePreview();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  const qs = useSearchParams();

  //초기 세션상태
  const router = useRouter();

  const formState = useForm<RequestSurveyFormData>({
    defaultValues,
    // userData가 없으면 defaultValues 설정하지 않음
    resolver: zodResolver(surveySchema),
  });

  const { register, setValue, reset, watch } = formState;

  console.log(watch());

  //수정시 get해오기
  const { data: editData } = useQuery<TemplateDetilaPageResponse>({
    queryKey: ["test", qs.get("edit")],
    queryFn: async () => {
      const token = SessionStorage.getAccessToken();
      const url = `${BASE_NEST_URL}/template/survey/${qs.get("edit")}`;

      const options: RequestInit = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      return await fetchWithAuth(url, options);
    },
    enabled: !!qs.get("edit"),
    staleTime: 0,
  });

  useEffect(() => {
    if (userData) {
      reset({ ...defaultValues, creator: userData });
    }
  }, [userData, reset]);

  console.log(editData);

  useEffect(() => {
    if (!editData) return;

    reset({
      ...defaultValues,
      title: editData.title,
      description: editData.description,
      thumbnail: editData.thumbnail,
      isGenderCollected: editData.isGenderCollected,
      isAgeCollected: editData.isAgeCollected,
      questions: editData.questions,
      templateKey: editData.templateKey,
    });
  }, [editData, reset]);

  useEffect(() => {
    /**
     * 수정일때는 key를 서치파람스로 받아서 수정임을 알림,
     * 없을 경우 uuid로 temp Id를 생성해서 저장함
     */

    //수정일경우는
    const editId = qs.get("edit");
    if (!editId) {
      const newKey = uuid4();
      setValue("templateKey", newKey);
    }
  }, [qs, setValue]);

  //요청
  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    RequestSurveyFormData
  >({
    mutationFn: async (data) => {
      const token = SessionStorage.getAccessToken();
      const url = `${BASE_NEST_URL}/template/survey`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      return await fetchWithAuth(url, options);
    },
    onSuccess: () => {
      router.replace("/list");
      alert("설문조사 개설 완료되었습니다. ");
    },
  });

  //submit
  const onSubmitHandler = async (data: RequestSurveyFormData) => {
    console.log(data);
    mutate(data);
  };

  return (
    <>
      <RenderPreview>프리뷰</RenderPreview>
      <form
        className={classes.formContainer}
        onSubmit={formState.handleSubmit(onSubmitHandler)}
      >
        <FormProvider {...formState}>
          {/* 설문조사 제목 */}
          <FormInput
            {...register("title")}
            inputName={"title"}
            autoComplete="off"
            placeholder="제목"
          />
          {/* 설문조사 설명 */}
          <FormTextarea
            {...register("description")}
            textareaName={"description"}
            placeholder="설문조사에 대한 설명을 적어주세요!"
            autoComplete="off"
          />
          <div>
            <h2>설정</h2>
            {/* 나이 별 수집 */}
            <BooleanGroup<RequestSurveyFormData>
              groupName={"isAgeCollected"}
              label="나이 집계 하시겠습니까"
              description="흠"
            />

            {/* 성별 별 수집 */}
            <BooleanGroup<RequestSurveyFormData>
              label="성별 집계 하시겠습니까"
              groupName={"isGenderCollected"}
            />

            {/* 기간 */}
            {/* <AddDateRange /> */}
          </div>
          {/* 썸네일 */}
          <ThumbNailUploader />
          {/* Survey Edit Form + List*/}
          <SurveyList />
          {/* Survey Controller */}
          <AddQuestionController />
          {/* 익명 사용자 - Email 정보동의  */}
          {/* <TemplateAccess /> */}
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

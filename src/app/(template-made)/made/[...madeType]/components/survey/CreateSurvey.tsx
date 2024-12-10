"use client";

import { FormProvider, useForm } from "react-hook-form";
import { BASE_NEST_URL } from "@/config/base";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "@/components/ui/FormElement/FormInput";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import Button from "@/components/ui/button/Button";
import classes from "./CreateSurvey.module.scss";
import { TEMPLATE_TYPE, FetchTemplateForm } from "@/types/template.type";
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

import { useEffect, useState } from "react";
import surveySchema from "@/app/(template-made)/made/[...madeType]/components/survey/schema";
import ThumbNailUploader from "@/app/(template-made)/components/ThumbNailUploader";

export enum SURVEY_EDITOR_TYPE {
  RESPOND = "respond",
  EDIT = "edit",
}

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
  creator?: User | null;
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
  creator: null,
};

type StringToNumber<T extends string> = T extends `${infer R extends number}`
  ? R
  : never;

//Exclude
type MyExclude<T, U> = T extends U ? never : T;

//Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

//Omit
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>;

export default function CreateSurvey() {
  const { RenderPreview } = usePreview();

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const [editPage, setEditPage] = useState<boolean>(false);
  const qs = useSearchParams();

  //초기 세션상태
  const router = useRouter();
  const formState = useForm<RequestSurveyFormData>({
    defaultValues,
    // userData가 없으면 defaultValues 설정하지 않음
    resolver: zodResolver(surveySchema),
  });

  const {
    register,
    setValue,
    reset,
  } = formState;

  const editId = qs.get("edit");

  //수정시 get해오기
  const {
    data: editData,
    error,
    isError,
  } = useQuery<FetchTemplateForm>({
    queryKey: ["test", editId],
    queryFn: async () => {
      const token = SessionStorage.getAccessToken();

      const url = `${BASE_NEST_URL}/template/survey/${editId}`;

      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type: SURVEY_EDITOR_TYPE.EDIT }),
      };
      return await fetchWithAuth(url, options);
    },

    enabled: !!editId,
    staleTime: 10000,
  });

  //에러 캐치
  useEffect(() => {
    if (editId && isError && error) {
      const errorMessage = error.message || "알 수 없는 오류 발생";

      alert(`Error: ${errorMessage}`);

      if (window.history.length > 1) {
        router.back();
      } else {
        router.replace("/list");
      }
    }
  }, [isError, editId, error, router]);

  useEffect(() => {
    if (!!userData && !editId) {
      reset({ ...defaultValues, creator: userData });
    } else if (editData) {
      reset({
        ...defaultValues,
        title: editData.title,
        description: editData.description,
        thumbnail: editData.thumbnail,
        isGenderCollected: editData.isGenderCollected,
        isAgeCollected: editData.isAgeCollected,
        questions: editData.questions,
        templateKey: editData.templateKey,
        creator: userData,
      });
      setEditPage(true);
    }
  }, [editData, reset, userData, editId]);

  useEffect(() => {
    /**
     * 수정일때는 key를 서치파람스로 받아서 수정임을 알림,
     * 없을 경우 uuid로 temp Id를 생성해서 저장함
     */
    if (!editId) {
      const newKey = uuid4();

      setValue("templateKey", newKey);
    }
  }, [qs, setValue, editId]);

  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    RequestSurveyFormData
  >({
    mutationFn: async (data) => {
      const token = SessionStorage.getAccessToken();

      //수정은 Patch로
      let options: RequestInit = {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      // 메소드 분류해서 수정인지 생성인지 구분하여 요청하기에 URL도 분기 처리하였음 11/9
      const url = !editId
        ? `${BASE_NEST_URL}/template/survey`
        : `${BASE_NEST_URL}/template/survey/${editId}`;

      return await fetchWithAuth(url, options);
    },
    onSuccess: () => {
      router.replace("/list");
      alert(
        !editId ? "설문조사 개설 완료되었습니다." : "수정 완료 되었습니다."
      );
    },
  });

  //submit
  const onSubmitHandler = async (data: RequestSurveyFormData) => {
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

          {/* 썸네일 */}
          <ThumbNailUploader />

          <div className={editPage ? classes.disabled : undefined}>
            <h2>설정</h2>
            {editPage && (
              <p className={classes.info}>
                진행 중인 설문에서는 집계 항목을 수정할 수 없습니다.
              </p>
            )}
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

            {/* Survey Edit Form + List*/}

            <SurveyList />

            {/* Survey Controller */}
            <AddQuestionController />
          </div>
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

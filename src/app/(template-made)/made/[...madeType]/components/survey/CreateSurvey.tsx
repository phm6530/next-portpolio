"use client";
import {
  Control,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import FormInput from "@/components/ui/FormElement/FormInput";
import Button from "@/components/ui/button/Button";
import classes from "./CreateSurvey.module.scss";
import {
  TEMPLATE_TYPE,
  FetchTemplateForm,
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

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import surveySchema from "@/app/(template-made)/made/[...madeType]/components/survey/schema";
import ThumbNailUploader from "@/app/(template-made)/components/ThumbNailUploader";
import TemplateInputWrapper from "../common/TemplateInputWrapper";

import withAuthFetch from "@/utils/withAuthFetch";
import HeaderTitle from "@/app/(template-made)/components/Header/HeaderTitle";
import dynamic from "next/dynamic";
import LoadingTextSkeleton from "@/components/loading/LoadingTextSkeleton";
import useAOS from "@/_hook/usAOS";

export enum SURVEY_EDITOR_TYPE {
  RESPOND = "respond",
  EDIT = "edit",
}

//Form
export type RequestSurveyFormData = {
  title: string;
  description: string;
  thumbnail: string | null;
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

type StringToNumber<T extends string> =
  T extends `${infer R extends number}` ? R : never;

//Exclude
type MyExclude<T, U> = T extends U ? never : T;

//Pick
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

//Omit
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>;

const EditorDynamicRender = dynamic<{
  control: Control<RequestSurveyFormData & FieldValues>;
  name: string;
}>(() => import("@/components/Editor/QuillEditor"), {
  ssr: false,
  loading: () => <LoadingTextSkeleton cnt={1} />,
});

export default function CreateSurvey() {
  const { RenderPreview } = usePreview();
  useAOS({ preserveClass: true });
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>([
    QUERY_KEY.USER_DATA,
  ]);
  const [editPage, setEditPage] = useState<boolean>(false);
  const qs = useSearchParams();

  //초기 세션상태
  const router = useRouter();
  const formState = useForm<RequestSurveyFormData>({
    defaultValues,
    // userData가 없으면 defaultValues 설정하지 않음
    resolver: zodResolver(surveySchema),
  });

  const { register, setValue, reset, control } = formState;

  const editId = qs.get("edit");

  //수정시 get해오기
  const {
    data: editData,
    error,
    isError,
  } = useQuery<FetchTemplateForm>({
    queryKey: ["test", editId],
    queryFn: async () => {
      const url = `template/survey/${editId}?type=${SURVEY_EDITOR_TYPE.EDIT}`;
      return await withAuthFetch(url);
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
      //수정은 Patch로
      let options: RequestInit = {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      // 메소드 분류해서 수정인지 생성인지 구분하여 요청하기에 URL도 분기 처리하였음 11/9
      let url = `template/survey${editId ? `/${editId}` : ""}`;
      return await withAuthFetch(url, options);
    },
    onSuccess: () => {
      router.replace("/list");
      alert(
        !editId
          ? "설문조사 개설 완료되었습니다."
          : "수정 완료 되었습니다."
      );
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_CONTENTS],
      });
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

      <HeaderTitle
        title={`생성하실 템플릿 서식을\n기재해주세요`}
        description="아래의 서식에 맞춰 정보를 적어주세요!"
      />

      <div className={classes.formContainer}>
        <FormProvider {...formState}>
          <section className={`${classes.formSection} aos-hidden`}>
            <div className={classes.header}>
              <h3>설문조사 정보</h3>
              <p className={classes.description}>
                가장 먼저 노출되는 항목이에요
              </p>
            </div>
            {/* 설문조사 제목 */}
            <TemplateInputWrapper title={"템플릿 제목"}>
              <FormInput
                {...register("title")}
                inputName={"title"}
                autoComplete="off"
                placeholder="제목"
              />
            </TemplateInputWrapper>

            {/* 설문조사 설명 */}
            <TemplateInputWrapper
              title={"간단한 설명을 기재해주세요"}
            >
              {/* <FormTextarea
                {...register("description")}
                placeholder="생성하시는 템플릿에 대한 설명을 적어주세요!"
                autoComplete="off"
              /> */}

              <EditorDynamicRender
                control={control}
                name={"description"}
              />
            </TemplateInputWrapper>

            {/* 썸네일 */}
            <TemplateInputWrapper title={"섬네일"}>
              <ThumbNailUploader />
            </TemplateInputWrapper>
          </section>

          <div
            className={`${classes.gapWrapper} ${
              editPage ? classes.disabled : undefined
            }`}
          >
            {/* 진행 중인 설문은 수정 불가 안내문구 */}
            {editPage && (
              <p className={classes.info}>
                진행 중인 설문에서는 집계 항목을 수정할 수 없습니다.
              </p>
            )}

            <section className={`${classes.formSection} aos-hidden`}>
              <div className={classes.header}>
                <h3>2. 응답자 필터 설정</h3>
                <p className={classes.description}>
                  설문 결과를 더 자세히 분석하기 위한 설정입니다.
                </p>
              </div>
              {/* 나이 별 수집 */}
              <BooleanGroup<RequestSurveyFormData>
                label="연령대별 분석을 진행할까요?"
                groupName={"isAgeCollected"}
                // description="연령대별 필터링이 가능합니다."
              />

              {/* 성별 별 수집 */}
              <BooleanGroup<RequestSurveyFormData>
                label="성별별 분석을 진행할까요?"
                groupName={"isGenderCollected"}
                // description="성별 필터링이 가능합니다."
              />
            </section>

            <section className={`${classes.formSection} aos-hidden`}>
              <div className={classes.header}>
                <h3>3. 설문 문항 구성</h3>
                <p className={classes.description}>
                  설문을 더욱 체계적으로 만들기 위한 문항을
                  추가해보세요.
                </p>
              </div>
              {/* List.. */}
              <SurveyList />
              {/* 항목 추가 */}
              <AddQuestionController />
            </section>

            {/* Survey Controller */}
          </div>
          {/* 익명 사용자 - Email 정보동의  */}
          {/* <TemplateAccess /> */}
        </FormProvider>

        <div className={classes.buttonsWrapper}>
          {/* <button type="button">미리보기</button> */}
          <Button.submit
            type="submit"
            disabled={isPending}
            onClick={formState.handleSubmit(onSubmitHandler)}
          >
            설문조사 생성하기
          </Button.submit>
        </div>
      </div>
    </>
  );
}

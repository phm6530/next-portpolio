"use client";

import { AddSurveyFormProps } from "@/types/templateSurvey";
import { TemplateTypeProps } from "@/types/template";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";

// import SurveyList from "@/app/template/made/[templateType]/_component/Survey/SurveyList";
// import AddQuestionController, {
//   RequestSelect,
//   RequestText,
// } from "@/app/template/made/[templateType]/_component/Survey/AddQuestionController";
// import usePreview from "@/app/template/made/[templateType]/_component/Preview/usePreview";
import { BASE_NEST_URL, BASE_URL } from "@/config/base";

import { withFetch } from "@/util/clientUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FormInput from "@/components/ui/FormElement/FormInput";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import Button from "@/components/ui/button/Button";
import classes from "./CreateSurvey.module.scss";
import { TEMPLATE_TYPE } from "@/types/template.type";

import BooleanGroup from "@/app/(template-made)/components/BooleanGroup";
import requestHandler from "@/utils/withFetch";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUESTION_TYPE } from "@/types/survey.type";

//Form
export type RequestSurveyFormData = {
  title: string;
  description: string;
  thumbnail: string;
  startDate?: string | null; // 시작일
  endDate?: string | null; //종료일
  isGenderCollected: boolean;
  isAgeCollected: boolean;
  templateType: TEMPLATE_TYPE;
  questions: (RequestText | RequestSelect)[];
  creator: User;
};

const RequestTextSchema = z.object({
  label: z.string().min(1, "질문 라벨은 필수입니다."),
  type: z.literal(QUESTION_TYPE.TEXT),
});

const RequestSelectSchema = z.object({
  label: z.string().min(1, "질문 라벨은 필수입니다."),
  type: z.literal(QUESTION_TYPE.SELECT),
  options: z
    .array(
      z.object({
        value: z.string().min(1, "옵션 값은 필수입니다."),
        type: z.literal(QUESTION_TYPE.SELECT),
      })
    )
    .min(2, "선택 옵션은 최소 2개가 필요합니다."),
});

const schema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수 입니다.")
    .min(4, "제목은 최소 4글자 이상으로 적어주세요"),
  description: z.string().min(1, "해당 조사의 설명을 적어주세요"),
  thumbnail: z.string().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  isGenderCollected: z.boolean().optional(),
  isAgeCollected: z.boolean().optional(),
  templateType: z.nativeEnum(TEMPLATE_TYPE),
  questions: z
    .array(z.union([RequestTextSchema, RequestSelectSchema]))
    .min(1, "질문 문항은 하나이상 등록되어야 합니다."),
  creator: z.object({
    id: z.number().min(1, "사용자 ID는 필수입니다."),
    email: z.string().email("유효한 이메일 형식이어야 합니다."),
    nickname: z.string().optional(),
    role: z.string().optional(),
  }),
});
export default function CreateSurvey() {
  const { RenderPreview } = usePreview();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  //초기 세션상태
  const router = useRouter();

  const formState = useForm<RequestSurveyFormData>({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      startDate: null,
      endDate: null,
      isGenderCollected: true,
      isAgeCollected: true,
      templateType: TEMPLATE_TYPE.SURVEY,
      questions: [],
      creator: userData, // userData가 존재할 때만 설정
    },
    // userData가 없으면 defaultValues 설정하지 않음
    resolver: zodResolver(schema),
  });

  const { register, watch } = formState;

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
    mutate(data);
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

  // const resetField = () => {
  //   if (confirm("초기화 하시겠습니까?")) {
  //     formState.reset(defaultValues);
  //     // localStorage.removeItem(template);
  //   } else {
  //     return;
  //   }
  // };

  return (
    <>
      <RenderPreview>프리뷰</RenderPreview>
      <form
        className={classes.formContainer}
        onSubmit={formState.handleSubmit(onSubmitHandler)}
      >
        <FormProvider {...formState}>
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

            {/* 성별 별 체크*/}
            {/* <AddGender /> */}
            {/* <BooleanGroup<RequestSurveyFormData>
              groupName={"isGenderCollected"}
            /> */}

            {/* 기간 */}
            {/* <AddDateRange /> */}
          </div>

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
          {/* <ThumbNailUploader
            template_type={PathSegments.Survey}
            // template_key={template_key as string}
          /> */}

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

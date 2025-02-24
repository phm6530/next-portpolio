"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import classes from "./CreateSurvey.module.scss";
import { TEMPLATE_TYPE, FetchTemplateForm } from "@/types/template.type";
import { v4 as uuid4 } from "uuid";

import BooleanGroup from "@/app/(protected-page)/(template-made)/components/BooleanGroup";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import surveySchema from "./schema";
import ThumbNailUploader from "@/app/(protected-page)/(template-made)/components/ThumbNailUploader";
import withAuthFetch from "@/utils/withAuthFetch";
import SubheaderDescrition from "@/components/ui/subheader-description";
import dynamic from "next/dynamic";
import LoadingTextSkeleton from "@/components/loading/LoadingTextSkeleton";
import useAOS from "@/_hook/usAOS";
import InputField from "@/components/shared/inputs/input-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SurveyStatus from "./survey-status";

import { z } from "zod";
import { FormItem, FormLabel } from "@/components/ui/form";
import CreateSurveyFormController, {
  RequestSelect,
  RequestText,
} from "./survey-form-controller";
import CreateSurveyList from "./survey-form-list";
import TipTapEditorField from "@/components/ui/editor/tiptap-editor-field";

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
export const defaultValues = {
  title: "",
  description: "",
  thumbnail: "",
  startDate: null,
  endDate: null,
  isGenderCollected: true,
  isAgeCollected: true,
  templateType: TEMPLATE_TYPE.SURVEY,
  questions: [],
  templateKey: "",
  creator: {
    id: 0, // 임시
    email: "",
    nickname: "",
    role: "",
  },
};

export default function CreateSurveyForm() {
  useAOS();

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const [editPage, setEditPage] = useState<boolean>(false);
  const qs = useSearchParams();

  //초기 세션상태
  const router = useRouter();
  const formState = useForm<z.infer<typeof surveySchema>>({
    defaultValues,
    // userData가 없으면 defaultValues 설정하지 않음
    resolver: zodResolver(surveySchema),
  });

  const { setValue, reset } = formState;
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
    z.infer<typeof surveySchema>
  >({
    mutationFn: async (data) => {
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
        !editId ? "설문조사 개설 완료되었습니다." : "수정 완료 되었습니다."
      );
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_CONTENTS],
      });
    },
  });

  //submit
  const onSubmitHandler = async (data: z.infer<typeof surveySchema>) => {
    mutate(data);
  };

  return (
    <>
      <SubheaderDescrition
        title={`생성하실 템플릿 서식을\n기재해주세요`}
        description="아래의 서식에 맞춰 정보를 적어주세요!"
      />

      <div className=" aos-hidden pt-16 flex flex-col gap-3 mb-[200px]">
        <FormProvider {...formState}>
          <Card className="p-7 flex flex-col gap-4 !border-muted-foreground/20">
            <CardHeader>
              <CardTitle className="text-2xl font-normal">
                1. 설문조사 정보
              </CardTitle>
              <CardDescription> 가장 먼저 노출되는 항목이에요</CardDescription>
            </CardHeader>
            <CardContent className="gap-10 flex flex-col">
              {/* 설문조사 제목 */}
              <InputField
                name="title"
                label="템플릿 제목"
                required
                placeholder="템플릿 제목을 입력해주세요"
                autoComplete="off"
              />

              {/* 설문조사 설명 */}
              <TipTapEditorField
                name="description"
                placeholder="간략한 설명을 입력해주세요.!!"
              />

              {/* 썸네일 */}
              <FormItem>
                <FormLabel>섬네일 (선택)</FormLabel>
                <ThumbNailUploader />
              </FormItem>
            </CardContent>
          </Card>

          <Card className="p-7 flex flex-col gap-4 !border-muted-foreground/20">
            <CardHeader>
              <CardTitle className="text-2xl font-normal">
                2. 응답자 필터 설정
              </CardTitle>
              <CardDescription>
                설문 결과를 더 자세히 분석하기 위한 설정입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-10 flex flex-col">
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
            </CardContent>
          </Card>

          <Card className="p-7 flex flex-col gap-4 !border-muted-foreground/20">
            <CardHeader>
              <CardTitle className="text-2xl font-normal">
                3. 설문 문항 구성
              </CardTitle>
              <CardDescription>
                설문을 더욱 체계적으로 만들기 위한 문항을 추가해보세요.
              </CardDescription>
            </CardHeader>

            <CardContent className="gap-10 flex flex-col">
              <SurveyStatus />
              {/* List.. */}
              <CreateSurveyList />
              {/* 항목 추가 */}
              <CreateSurveyFormController />
            </CardContent>
          </Card>

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

            {/* Survey Controller */}
          </div>
        </FormProvider>

        <div className="flex [&>button]:flex-1">
          <Button
            type="submit"
            disabled={isPending}
            onClick={formState.handleSubmit(onSubmitHandler)}
            className="py-7 rounded-lg"
          >
            설문조사 생성하기
          </Button>
        </div>
      </div>
    </>
  );
}

"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { TEMPLATE_TYPE, FetchTemplateForm } from "@/types/template.type";
import { v4 as uuid4 } from "uuid";

import { QUERY_KEY, REQUEST_METHOD } from "@/types/constans";
import { User } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCallback, useEffect, useState } from "react";
import ThumbNailUploader from "@/app/(protected-page)/(template-made)/components/ThumbNailUploader";
import withAuthFetch from "@/utils/withAuthFetch";
import SubheaderDescrition from "@/components/ui/subheader-description";
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
import RadioBooleanField from "@/components/ui/radio-boolean-field";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import DateRangeSelector from "@/components/ui/date-range";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import revaildateTags from "@/lib/revaildateTags";
import { toast } from "react-toastify";
import surveySchema from "../schema/survey-schema";
import { useTransformToKrDate } from "@/_hook/useTransformToKrDate";
import { withFetchRevaildationAction } from "@/action/with-fetch-revaildation";
import { DateUtils } from "@/utils/DateUtils";

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

  const transformDate = useTransformToKrDate();

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

  const { setValue, reset, watch } = formState;
  const isGenderCollected = watch("isGenderCollected");

  useEffect(() => {
    setValue("isAgeCollected", isGenderCollected);
  }, [isGenderCollected, setValue]);

  const editId = qs.get("edit");

  //수정시 get해오기
  const {
    data: editData,
    error,
    isError,
    isLoading,
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
        startDate: editData.startDate
          ? transformDate(editData.startDate)
          : null,
        endDate: editData.endDate ? transformDate(editData.endDate) : null,
      });
      setEditPage(true);
    }
  }, [editData, reset, userData, editId, transformDate]);

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
  const { mutate, isPending, isSuccess } = useMutation<
    {
      statusCode: number;
      templateId: number;
    },
    Error,
    z.infer<typeof surveySchema>
  >({
    mutationFn: async (
      data
    ): Promise<{ statusCode: number; templateId: number }> => {
      // 메소드 분류해서 수정인지 생성인지 구분하여 요청하기에 URL도 분기 처리하였음 11/9
      const { success, message, result } = await withFetchRevaildationAction<{
        statusCode: number;
        templateId: number;
      }>({
        endPoint: `template/survey${editId ? `/${editId}` : ""}`,
        requireAuth: true,
        options: {
          method: !!editId ? REQUEST_METHOD.PUT : REQUEST_METHOD.POST,
          body: JSON.stringify(data),
        },
        tags: !!editId ? [`template-survey-${+editId}`] : [],
      });

      if (!success) {
        throw new Error(message);
      }

      return result as {
        statusCode: number;
        templateId: number;
      };
    },
    onSuccess: (res) => {
      toast.success(
        !editId ? "설문조사 개설 완료되었습니다." : "수정 완료 되었습니다."
      );
      window.location.href = `/survey/${res.templateId}`;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_CONTENTS],
      });
    },
  });

  //submit
  const onSubmitHandler = async (data: z.infer<typeof surveySchema>) => {
    mutate(data);
  };

  const getIsEdit = useCallback(() => {
    if (editPage && editData) {
      if (editData.startDate) {
        return !DateUtils.isBefore(editData?.startDate);
      } else if (editData.startDate === null) {
        return true;
      }
    }
  }, [editPage, editData]);

  const editLock = getIsEdit();

  return (
    <>
      <SubheaderDescrition
        title={`설문조사 템플릿 생성하기 ${editId ? "(수정)" : ""}`}
        description="아래의 서식에 맞춰 정보를 적어주세요!"
      />

      <div className=" pt-5 md:pt-16 flex flex-col gap-0 md:gap-3 mb-[200px]">
        {isLoading ? (
          <LoadingWrapper />
        ) : (
          <>
            <FormProvider {...formState}>
              <Card className="md:py-7 md:px-7 px-0 py-6 bg-transparent md:bg-card  flex flex-col gap-4 border-0 md:border border-b">
                <CardHeader className="px-0 md:px-6">
                  <CardTitle className="text-xl md:text-2xl  font-normal">
                    1. 설문조사 정보
                  </CardTitle>
                  <CardDescription>
                    {" "}
                    가장 먼저 노출되는 항목이에요
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 md:px-6 gap-10 flex flex-col">
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

              <Card
                className={cn(
                  "md:p-7 py-6 flex flex-col bg-transparent md:bg-card gap-1 border-0 md:border border-b",
                  editLock && "cursor-not-allowed"
                )}
              >
                <CardHeader className="px-0 md:px-6 flex flex-col gap-4 mb-4">
                  <CardTitle className="text-xl md:text-2xl font-normal">
                    2. 설문조사 기간 설정{" "}
                    <span className="text-sm">(선택)</span>
                  </CardTitle>
                  <CardDescription className="leading-6">
                    시작일을 설정하지 않으면 설문조사는 바로 시작되며, <br />
                    종료 일이 없다면 무기한으로 설정됩니다. 시작 종료일 모두
                    00시 기준입니다.
                  </CardDescription>
                  {editLock && (
                    <CardDescription className="text-lg text-white flex gap-2 items-center text-primary dark:brightness-150">
                      <Info />
                      설문 중에는 수정이 불가합니다.
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent
                  className={cn(
                    "px-0 md:px-6 gap-6 flex flex-col",
                    editLock && " pointer-events-none opacity-50"
                  )}
                >
                  <DateRangeSelector />
                  <CardDescription className="leading-6">
                    설문조사가 시작되면 등록 이후 일정 변경은 불가합니다
                  </CardDescription>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "md:p-7 py-6 flex flex-col bg-transparent md:bg-card gap-4 border-0 md:border border-b",
                  editLock && "cursor-not-allowed"
                )}
              >
                <CardHeader className="px-0 md:px-6">
                  <CardTitle className="text-xl md:text-2xl font-normal">
                    2. 응답자 필터 설정
                  </CardTitle>
                  <CardDescription>
                    {"'예'"} 체크 시, 나이 성별을 수집하며 차트와 응답자 들의
                    필터링이 제공됩니다.
                  </CardDescription>

                  {editLock && (
                    <CardDescription className="text-lg pt-5 mt-10 text-white flex gap-2 items-center text-primary dark:brightness-150">
                      <Info />
                      설문 중에는 필터 수정이 불가합니다.
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent
                  className={cn(
                    "px-0 md:px-6 gap-6 flex flex-col",
                    editLock && " pointer-events-none opacity-50"
                  )}
                >
                  {/* 나이 별 수집 */}
                  {/* <RadioBooleanField<RequestSurveyFormData>
                label="연령대 별 집계를 진행 하시겠습니까?"
                groupName={"isAgeCollected"}
                // description="연령대별 필터링이 가능합니다."
              /> */}

                  {/* 성별 별 수집 */}
                  <RadioBooleanField<RequestSurveyFormData>
                    // label="나이 및 성별 수집을 하시겠습니까?"
                    groupName={"isGenderCollected"}
                    // description="성별 필터링이 가능합니다."
                  />
                </CardContent>
              </Card>

              <Card
                className={cn(
                  editLock && "cursor-not-allowed",
                  "md:p-7 py-6  flex flex-col bg-transparent md:bg-card gap-4 border-0 md:border border-b"
                )}
              >
                <CardHeader className="px-0 md:px-6">
                  <CardTitle className=" text-xl md:text-2xl font-normal">
                    3. 설문 문항 구성
                  </CardTitle>
                  <CardDescription>
                    설문을 더욱 체계적으로 만들기 위한 문항을 추가해보세요.
                  </CardDescription>
                  {editLock && (
                    <CardDescription className="text-lg pt-5 mt-10 text-white flex gap-2 items-center text-primary dark:brightness-150">
                      <Info />
                      설문 중에는 항목 수정이 불가합니다.
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent
                  className={cn(
                    "px-0 md:px-6 gap-6 flex flex-col",
                    editLock && " pointer-events-none opacity-50"
                  )}
                >
                  <SurveyStatus />
                  {/* List.. */}
                  <CreateSurveyList />
                  {/* 항목 추가 */}
                  <CreateSurveyFormController />
                </CardContent>
              </Card>
            </FormProvider>
            <div className="flex [&>button]:flex-1 gap-3">
              {/* <Button
                  type="submit"
                  disabled={isPending}
                  onClick={formState.handleSubmit(onSubmitHandler)}
                  className="py-7 rounded-lg"
                  variant={"outline"}
                >
                  미리보기
                </Button> */}

              <Button
                type="submit"
                disabled={isPending || isSuccess}
                onClick={formState.handleSubmit(onSubmitHandler)}
                className="py-7 rounded-lg md:text-base text-sm"
              >
                설문조사 생성하기
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

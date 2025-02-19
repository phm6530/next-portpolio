import { ChangeEvent, useRef } from "react";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";

import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import ImageUploadHandler from "@/utils/img-uploader";
import { useMutation } from "@tanstack/react-query";
import imgUpload from "/public/asset/icon/imgUpload.svg";
import SvginButton from "@/components/ui/button-svg";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";

import UploadedImagePreview from "@/app/(protected-page)/(template-made)/components/ImageContainer/UploadedImagePreview";
import QuestionListWrapper from "@/app/(protected-page)/(template-made)/components/QuestionItem/QuestionContainer";
import { Button } from "@/components/ui/button";
import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OptionsController from "./option-controller";

export default function CreateSurveyText({
  surveyIdx,
  remove,
}: {
  surveyIdx: number;
  remove: UseFieldArrayRemove;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  const { watch, setValue, control } = useFormContext<RequestSurveyFormData>();

  const preView = watch(`questions.${surveyIdx}.img`);
  const key = watch("templateKey");

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (file: File) => {
      const endPoint = `common/image/${key}`;
      // await new Promise((resolve) => setTimeout(resolve, 300000));
      return await ImageUploadHandler(endPoint, file);
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: (data) => {
      setValue(`questions.${surveyIdx}.img`, data!.supabase_storage_imgurl);
    },
  });

  const imgHandler = () => {
    imgRef.current?.click();
  };

  const imgUploader = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) mutate(files[0]);
  };

  const clearPreview = () => {
    setValue(`questions.${surveyIdx}.img`, "");
  };

  return (
    <>
      <QuestionListWrapper>
        {/* img Hidden */}
        <input
          type="file"
          className="hidden"
          onChange={imgUploader}
          autoComplete="off"
          ref={imgRef}
        />
        <div>
          <FormField
            name={`questions.${surveyIdx}.label`}
            control={control}
            render={({ field }) => {
              return (
                <>
                  <div className="flex">
                    <Input
                      {...field}
                      placeholder={`${surveyIdx + 1}. 질문을 입력해주세요`}
                      className="border-transparent !bg-transparent placeholder:text-lg focus:border-transparent hover:border-transparent"
                      autoComplete="off"
                    />

                    <SvginButton
                      Svg={imgUpload}
                      alt="업로드 버튼"
                      onClick={imgHandler}
                    />
                    <Button variant={"ghost"} onClick={() => remove(surveyIdx)}>
                      삭제
                    </Button>
                  </div>
                  <FormMessage />
                </>
              );
            }}
          />
        </div>
        {isPending ? (
          <div>
            <LoadingSkeleton loadingText="UP LOADING..." />
          </div>
        ) : isSuccess && preView ? (
          <div>
            <UploadedImagePreview src={preView} deleteFunc={clearPreview} />
          </div>
        ) : null}
        {/* 주관식에서 알려주기 */}
        <div className="bg-muted/50 text-sm p-3 rounded-sm border border-border">
          응답자 답변 (500자 내외)
        </div>{" "}
        <OptionsController name={`questions.${surveyIdx}`} />
      </QuestionListWrapper>
    </>
  );
}

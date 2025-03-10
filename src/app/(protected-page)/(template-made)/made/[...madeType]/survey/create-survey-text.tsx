import { ChangeEvent, useRef } from "react";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";

import { SurveyPayload } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import ImageUploadHandler from "@/utils/img-uploader";
import { useMutation } from "@tanstack/react-query";
import imgUpload from "/public/asset/icon/imgUpload.svg";
import SvginButton from "@/components/ui/button-svg";
import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";

import UploadedImagePreview from "@/app/(protected-page)/(template-made)/components/ImageContainer/UploadedImagePreview";
import QuestionListWrapper from "@/app/(protected-page)/(template-made)/components/QuestionItem/QuestionContainer";
import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OptionsController from "./option-controller";
import ConfirmDialog from "@/components/ui/confirm-button";
import { GripVertical, X } from "lucide-react";

export default function CreateSurveyText({
  surveyIdx,
  remove,
}: {
  surveyIdx: number;
  remove: UseFieldArrayRemove;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  const { watch, setValue, control } = useFormContext<SurveyPayload<"req">>();

  const preView = watch(`questions.${surveyIdx}.img`);
  const key = watch("templateKey");

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (file: File) => {
      const endPoint = `common/image/${key}`;
      // await new Promise((resolve) => setTimeout(resolve, 300000));
      return await ImageUploadHandler(endPoint, file);
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
                  <div className="flex items-center gap-1">
                    <GripVertical className="opacity-40" />
                    <Input
                      {...field}
                      placeholder={`${surveyIdx + 1}. 질문을 입력해주세요`}
                      className="border-transparent !bg-transparent  text-base placeholder:text-base md:text-lg md:placeholder:text-lg focus:border-transparent hover:border-transparent"
                      autoComplete="off"
                    />
                    <SvginButton
                      Svg={imgUpload}
                      alt="업로드 버튼"
                      onClick={imgHandler}
                    />
                    <ConfirmDialog
                      title={`${surveyIdx + 1}번 질문을 삭제하시겠습니까?`}
                      cb={() => {
                        remove(surveyIdx);
                      }}
                    >
                      <button
                        type="button"
                        className={`flex items-center justify-center [&>svg]:hover:fill-[#647487]`}
                      >
                        <X className="fill-[#647487] text-[#647487]" />
                      </button>
                    </ConfirmDialog>
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
        <div className="bg-muted/50 text-[12px] md:text-sm p-3 rounded-sm border border-border">
          응답자 답변 (500자 내외)
        </div>{" "}
        <OptionsController name={`questions.${surveyIdx}`} />
      </QuestionListWrapper>
    </>
  );
}

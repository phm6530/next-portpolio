import { ChangeEvent, useRef, useState } from "react";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";

import { RequestSurveyFormData } from "@/app/(protected-page)/(template-made)/made/[...madeType]/survey/CreateSurvey";
import ImageUploadHandler from "@/utils/img-uploader";
import { useMutation } from "@tanstack/react-query";
import Delete from "/public/asset/icon/delete.svg";
import imgUpload from "/public/asset/icon/imgUpload.svg";

import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";
import UploadedImagePreview from "@/app/(protected-page)/(template-made)/components/ImageContainer/UploadedImagePreview";
import { useSearchParams } from "next/navigation";
import SvginButton from "@/components/ui/button-svg";
import { FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const MIN_OPTION_COUNT = 2;
const MIN_OPTION_ERROR_MESSAGE =
  "객관식은 최소 2개 이상 항목으로 줄일 수 없습니다";

export default function SurveyOptionItem({
  surveyIdx,
  optionIdx,
  itemRemove,
}: {
  surveyIdx: number;
  optionIdx: number; // survey 항목 안의 Array Idx 임
  itemRemove: UseFieldArrayRemove;
  // imgId: string;
}) {
  const qs = useSearchParams();
  const editMode = qs.size > 0;

  const { setValue, watch } = useFormContext<RequestSurveyFormData>();

  const [curRadio, preView, key] = watch([
    `questions.${surveyIdx}.options`,
    `questions.${surveyIdx}.options.${optionIdx}.img`,
    "templateKey",
  ]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (file: File) => {
      const endPoint = `common/image/${key}`;
      return await ImageUploadHandler(endPoint, file);
    },
    onError: (error) => {
      alert(error.message);
    },
    onSuccess: (data) => {
      setValue(
        `questions.${surveyIdx}.options.${optionIdx}.img`,
        data!.supabase_storage_imgurl
      );
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  //options 제거
  const removeOptions = (idx: number): void => {
    if (curRadio.length > MIN_OPTION_COUNT) {
      itemRemove(idx);
    } else {
      alert(MIN_OPTION_ERROR_MESSAGE);
      return;
    }
  };

  //click
  const imgHandler = () => {
    if (ref) {
      ref.current?.click();
    }
  };

  //미리보기
  const imgPreview = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.currentTarget.files;
    if (files) mutate(files[0]);
  };
  const clearPreview = () => {
    setValue(`questions.${surveyIdx}.options.${optionIdx}.img`, "");
  };

  const renderPreview = () => {
    // 수정모드
    if (editMode) {
      return preView ? (
        <UploadedImagePreview src={preView} deleteFunc={clearPreview} />
      ) : null;
    }

    // 생성모드
    if (isPending) {
      return <LoadingSkeleton loadingText="UP LOADING..." />;
    }

    if (isSuccess && preView) {
      return <UploadedImagePreview src={preView} deleteFunc={clearPreview} />;
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden Input */}
      <input
        type="file"
        ref={ref}
        onChange={imgPreview}
        className="hidden"
        autoComplete="off"
      />

      {/* 입력구간 */}
      <div className="flex flex-1 items-center gap-2">
        {/* 질문  명 */}

        <FormField
          name={`questions.${surveyIdx}.options.${optionIdx}.value`}
          render={({ field }) => {
            return (
              <div className="w-full">
                <div className="w-full flex focus-within:border-primary border rounded-md bg-custom-input">
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder={`항목 ${optionIdx + 1}을 입력해주세요`}
                    className="border-transparent flex-1 focus:border-transparent bg-transparent dark:bg-transparent"
                  />
                  <div className={"flex gap-2 mr-2"}>
                    {/* upload */}
                    <SvginButton
                      Svg={imgUpload}
                      alt="업로드 버튼"
                      onClick={imgHandler}
                    />
                    <SvginButton
                      Svg={Delete}
                      alt="삭제 버튼"
                      onClick={() => removeOptions(optionIdx)}
                    />
                  </div>{" "}
                </div>
                <FormMessage />
              </div>
            );
          }}
        />
      </div>

      <>{renderPreview()}</>

      {/* Error  */}
    </div>
  );
}

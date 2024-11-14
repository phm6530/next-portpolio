import { ChangeEvent, useRef, useState } from "react";
import {
  FieldErrorsImpl,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import { RequestSelect } from "@/app/template/made/[templateType]/_component/Survey/AddQuestionController";
import ImageUploadHandler from "@/utils/img-uploader";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import classes from "./SurveyRadio.module.scss";

export default function SurveyRadio({
  surveyIdx,
  optionIdx,
  itemRemove,
}: {
  surveyIdx: number;
  optionIdx: number; // survey 항목 안의 Array Idx 임
  itemRemove: UseFieldArrayRemove;
  // imgId: string;
}) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<RequestSurveyFormData>();
  const curRadio = watch(`questions.${surveyIdx}.options`);
  const preView = watch(`questions.${surveyIdx}.options.${optionIdx}.img`);
  const key = watch("templateKey");

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

  const optionError = errors.questions as FieldErrorsImpl<RequestSelect>[];

  const ref = useRef<HTMLInputElement>(null);

  //options 제거
  const removeOptions = (idx: number): void => {
    if (curRadio.length > 2) {
      itemRemove(idx);
    } else {
      alert("객관식은 최소 2개 이상 항목으로 줄일 수 없음");
      return;
    }
  };

  //click
  const imgHandler = () => {
    if (ref) {
      ref.current?.click();
    }
  };

  const clearPreview = () => {};

  //미리보기
  const imgPreview = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.currentTarget.files;
    if (files) mutate(files[0]);
  };

  return (
    <div>
      항목 {optionIdx + 1}
      <input
        type="text"
        {...register(`questions.${surveyIdx}.options.${optionIdx}.value`, {
          required: "선택 항목을 입력해주세요",
        })}
        autoComplete="off"
      />
      <input
        type="file"
        ref={ref}
        onChange={imgPreview}
        className="hidden"
        autoComplete="off"
      />
      <button type="button" onClick={imgHandler}>
        사진
      </button>
      <button type="button" onClick={() => removeOptions(optionIdx)}>
        삭제!
      </button>
      {/* Error  */}
      <>
        <div className={classes.previewContainer}>
          {isPending && "loading......"}
          {preView && (
            <Image
              src={preView}
              sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
              alt="preview"
              style={{ objectFit: "cover" }}
              fill
            />
          )}
        </div>
        {ref.current?.value}
        <button onClick={clearPreview}>이미지 삭제</button>
      </>
      <div>
        {optionError?.[surveyIdx]?.options?.[optionIdx]?.value?.message}
      </div>
    </div>
  );
}

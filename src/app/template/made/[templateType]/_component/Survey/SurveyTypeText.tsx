import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
  FieldError,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import classes from "./SurveyTypeText.module.scss";

import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import ImageUploadHandler from "@/utils/img-uploader";
import { useMutation } from "@tanstack/react-query";
import QuestionContainer from "@/app/(template-made)/components/QuestionItem/QuestionContainer";
import QuestionItemHeader, {
  QuestionType,
} from "@/app/(template-made)/components/QuestionItem/QuestionItemHeader";

export default function SurveyTypeText({
  surveyIdx,
  remove,
}: {
  surveyIdx: number;
  remove: UseFieldArrayRemove;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<RequestSurveyFormData>();

  const preView = watch(`questions.${surveyIdx}.img`);

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

  const clearPreview = () => {};

  return (
    <>
      <QuestionContainer>
        {" "}
        {/* img Hidden */}
        <input
          type="file"
          className="hidden"
          onChange={imgUploader}
          autoComplete="off"
          ref={imgRef}
        />
        <QuestionItemHeader
          type={QuestionType.SHORT_ANSWER}
          QuestionNum={surveyIdx + 1}
        >
          <input
            type="text"
            {...register(`questions.${surveyIdx}.label`)}
            placeholder="질문 제목을 입력해주세요."
          />{" "}
          {/* delete */}
          <button type="button" onClick={() => remove(surveyIdx)}>
            삭제
          </button>
        </QuestionItemHeader>
        {(isPending || isSuccess) && (
          <>
            <div className={classes.previewContainer}>
              {isPending && "loading......"}
              {isSuccess && preView && (
                <Image
                  src={preView}
                  sizes="(max-width : 765px) 100vw , (min-width : 756px) 50vw"
                  alt="preview"
                  style={{ objectFit: "cover" }}
                  fill
                />
              )}
            </div>
            {imgRef.current?.value}
            <button onClick={clearPreview}>이미지 삭제</button>
          </>
        )}
        <button type="button" onClick={imgHandler}>
          사진
        </button>
        <div>
          {
            (errors.questions as unknown as { label?: FieldError }[])?.[
              surveyIdx
            ]?.label?.message
          }
        </div>
      </QuestionContainer>
    </>
  );
}

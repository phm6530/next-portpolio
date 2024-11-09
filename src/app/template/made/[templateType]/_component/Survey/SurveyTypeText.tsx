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
      <div key={surveyIdx}>
        <h1> Q.{surveyIdx + 1}</h1>
        <input
          type="file"
          className="hidden"
          onChange={imgUploader}
          autoComplete="off"
          ref={imgRef}
        />
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
        <input type="text" {...register(`questions.${surveyIdx}.label`)} />
        <button type="button" onClick={imgHandler}>
          사진
        </button>
        {/* delete */}
        <button type="button" onClick={() => remove(surveyIdx)}>
          삭제
        </button>
        <div>
          {
            (errors.questions as unknown as { label?: FieldError }[])?.[
              surveyIdx
            ]?.label?.message
          }
        </div>
      </div>
    </>
  );
}

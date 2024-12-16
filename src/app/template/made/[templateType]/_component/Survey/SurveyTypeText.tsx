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
import imgUpload from "/public/asset/icon/imgUpload.svg";
import OptionButton from "@/app/(template-made)/components/QuestionOption/OptionButton";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import FormRegisterError from "@/components/Error/FormRegisterError";
import UploadedImagePreview from "@/app/(template-made)/components/ImageContainer/UploadedImagePreview";
import { resolve } from "path";

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

  const { mutate, isPending, isSuccess, isPaused } = useMutation({
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
      <QuestionContainer>
        {/* img Hidden */}
        <input
          type="file"
          className="hidden"
          onChange={imgUploader}
          autoComplete="off"
          ref={imgRef}
        />

        <div>
          <QuestionItemHeader
            type={QuestionType.SHORT_ANSWER}
            QuestionNum={surveyIdx + 1}
          >
            <input
              type="text"
              {...register(`questions.${surveyIdx}.label`)}
              placeholder="질문 제목을 입력해주세요."
            />

            <OptionButton
              Svg={imgUpload}
              alt="업로드 버튼"
              onClick={imgHandler}
            />
            <button
              className={classes.delete}
              type="button"
              onClick={() => remove(surveyIdx)}
            >
              삭제
            </button>
          </QuestionItemHeader>

          {errors?.questions?.[surveyIdx]?.label?.message && (
            <FormRegisterError
              errorMsg={errors?.questions[surveyIdx]?.label?.message}
            />
          )}
        </div>

        {isPending ? (
          <div className={classes.previewWrapper}>
            <LoadingSkeleton loadingText="UP LOADING..." />
          </div>
        ) : isSuccess && preView ? (
          <div className={classes.previewWrapper}>
            <UploadedImagePreview src={preView} deleteFunc={clearPreview} />
          </div>
        ) : null}

        {/* 주관식에서 알려주기 */}
        <div className={classes.textAnswer}>응답자 답변 (500자 내외)</div>
      </QuestionContainer>
    </>
  );
}

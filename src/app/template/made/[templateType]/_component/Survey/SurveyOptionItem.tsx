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
import classes from "./SurveyOptionItem.module.scss";
import OptionContainer from "@/app/(template-made)/components/QuestionOption/OptionContainer";
import OptionButton from "@/app/(template-made)/components/QuestionOption/OptionButton";
import Delete from "/public/asset/icon/delete.svg";
import imgUpload from "/public/asset/icon/imgUpload.svg";
import FormRegisterError from "@/components/Error/FormRegisterError";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import UploadedImagePreview from "@/app/(template-made)/components/ImageContainer/UploadedImagePreview";
import { useSearchParams } from "next/navigation";

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

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<RequestSurveyFormData>();

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

  const optionError =
    errors.questions as FieldErrorsImpl<RequestSelect>[];
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
        <UploadedImagePreview
          src={preView}
          deleteFunc={clearPreview}
        />
      ) : null;
    }

    // 생성모드
    if (isPending) {
      return <LoadingSkeleton loadingText="UP LOADING..." />;
    }

    if (isSuccess && preView) {
      return (
        <UploadedImagePreview
          src={preView}
          deleteFunc={clearPreview}
        />
      );
    }

    return null;
  };

  return (
    <div className={classes.wrapper}>
      <OptionContainer>
        {/* Hidden Input */}
        <input
          type="file"
          ref={ref}
          onChange={imgPreview}
          className="hidden"
          autoComplete="off"
        />

        {/* 입력구간 */}
        <div className={classes.inputWrapper}>
          {/* 질문  명 */}
          <input
            type="text"
            {...register(
              `questions.${surveyIdx}.options.${optionIdx}.value`
            )}
            autoComplete="off"
            placeholder={`항목 ${optionIdx + 1}을 입력해주세요`}
          />

          <div className={classes.buttonsWrapper}>
            {/* upload */}
            <OptionButton
              Svg={imgUpload}
              alt="업로드 버튼"
              onClick={imgHandler}
            />
            <OptionButton
              Svg={Delete}
              alt="삭제 버튼"
              onClick={() => removeOptions(optionIdx)}
            />
          </div>
        </div>

        <>{renderPreview()}</>
      </OptionContainer>

      {/* Error  */}
      {optionError?.[surveyIdx]?.options?.[optionIdx] && (
        <div>
          <FormRegisterError
            errorMsg={
              optionError?.[surveyIdx]?.options?.[optionIdx]?.value
                ?.message
            }
          />
        </div>
      )}
    </div>
  );
}

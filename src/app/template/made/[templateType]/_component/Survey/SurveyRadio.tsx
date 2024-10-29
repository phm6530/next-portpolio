import { AddSurveyFormProps, surveyParams } from "@/types/templateSurvey";
import { ChangeEvent, useRef, useState } from "react";
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  Merge,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import { RequestSelect } from "@/app/template/made/[templateType]/_component/Survey/AddQuestionController";

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
    watch,
  } = useFormContext<RequestSurveyFormData>();
  const curRadio = watch(`questions.${surveyIdx}.options`);

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

  //미리보기
  // const imgPreview = async (
  //   e: ChangeEvent<HTMLInputElement>
  // ): Promise<void> => {
  //   const target = e.target.files;
  //   if (target && template_key) {
  //     const imgUrl = await imgUploader(PathSegments.Survey, target[0], {
  //       template_key,
  //     });

  //     setPreView(`${BASE_URL}/${imgUrl}`);

  //     const currentOption = getValues(
  //       `items.${surveyIdx}.options.${optionIdx}`
  //     );

  //     update(optionIdx, {
  //       ...currentOption,
  //       img: imgUrl,
  //     });
  //   }
  // };

  // const clearPreview = () => {
  //   setPreView("");
  //   if (ref.current) {
  //     ref.current.value = "";
  //   }
  // };

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
        // onChange={imgPreview}
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
      {/* {preView && (
        <>
          <div className={classes.previewContainer}>
            <Image
              src={preView}
              layout="responsive"
              width={16}
              height={9}
              style={{ maxWidth: 700, objectFit: "cover" }}
              alt="preview"
              priority
            />
          </div>
          {ref.current?.value}
          <button onClick={clearPreview}>삭제</button>
        </>
      )} */}
      <div>
        {optionError?.[surveyIdx]?.options?.[optionIdx]?.value?.message}
      </div>
    </div>
  );
}

import { AddSurveyFormProps } from "@/types/survey";
import { ChangeEvent, useRef, useState } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import Image from "next/image";
import classes from "./DefaultSurvey.module.scss";

export default function SurveyRadio({
  fieldCnt,
  surveyIdx,
  optionIdx,
}: {
  fieldCnt: number;
  surveyIdx: number;
  optionIdx: number; // survey 항목 안의 Array Idx 임
}) {
  const {
    getValues,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  const [preView, setPreView] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  //options 제거
  const removeOptions = (idx: number, optionIdx: number): void => {
    if (fieldCnt > 2) {
      const curOptions = getValues(`items.${surveyIdx}.options`) || [];
      const newOptions = curOptions.filter((_, i) => i !== optionIdx); // 옵션 인덱스를 기준으로 필터링

      setValue(`items.${idx}.options`, newOptions);
      trigger(`items.${idx}.options`);
    } else {
      alert("2개 이상 항목으로 줄일 수 없음");
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
  const imgPreview = (e: ChangeEvent<HTMLInputElement>) => {
    //Target
    const target = e.target.files;
    if (target) {
      const reader = new FileReader();
      reader.readAsDataURL(target[0]);

      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setPreView(result);
        }
      };
    }
  };

  const clearPreview = () => {
    setPreView("");
    if (ref.current) {
      ref.current.value = "";
    }
  };

  return (
    <div>
      항목 {optionIdx + 1}
      <input
        type="text"
        {...register(`items.${surveyIdx}.options.${optionIdx}.value`, {
          required: "질문 항목을 입력해주세요!",
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
      <button type="button" onClick={() => removeOptions(surveyIdx, optionIdx)}>
        삭제!
      </button>
      {/* Error  */}
      {preView && (
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
      )}
      <div>
        {(
          errors.items?.[surveyIdx]?.options as FieldErrors<{
            value: string;
          }>[]
        )?.[optionIdx]?.value?.message || null}
      </div>
    </div>
  );
}

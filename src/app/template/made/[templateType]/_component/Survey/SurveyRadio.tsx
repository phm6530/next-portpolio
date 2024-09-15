import { AddSurveyFormProps, surveyParams } from "@/types/templateSurvey";
import { ChangeEvent, useRef, useState } from "react";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useFormContext,
} from "react-hook-form";
import Image from "next/image";
import classes from "./survey.module.scss";
import useStore from "@/store/store";
import { imgUploader } from "@/lib/uploaderHanlder";
import { PathSegments } from "@/types/upload";

export default function SurveyRadio({
  fields,
  surveyIdx,
  optionIdx,
  itemRemove,
  update,
}: {
  fields: FieldArrayWithId<AddSurveyFormProps, `items.${number}.options`>[];
  surveyIdx: number;
  optionIdx: number; // survey 항목 안의 Array Idx 임
  itemRemove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<AddSurveyFormProps, `items.${number}.options`>;
  imgId: string;
}) {
  //img Key
  const template_key = useStore((state) => state.template_key);

  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  //데이터가져오기
  const [preView, setPreView] = useState<string>(() => {
    return fields[optionIdx].img || "";
  });

  const ref = useRef<HTMLInputElement>(null);

  //options 제거
  const removeOptions = (idx: number): void => {
    if (fields.length > 2) {
      itemRemove(idx);
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
  const imgPreview = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const target = e.target.files;
    if (target && template_key) {
      const imgUrl = await imgUploader(PathSegments.Survey, target[0], {
        template_key,
      });

      setPreView(`${process.env.NEXT_PUBLIC_BASE_URL}/${imgUrl}`);

      const currentOption = getValues(
        `items.${surveyIdx}.options.${optionIdx}`
      );

      update(optionIdx, {
        ...currentOption,
        img: imgUrl,
      });
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
      <button type="button" onClick={() => removeOptions(optionIdx)}>
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

import { imgUploader } from "@/lib/uploaderHanlder";
import useStore from "@/store/store";
import { PathSegments } from "@/types/upload";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
  FieldError,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

export default function SurveyTypeText({
  surveyIdx,
  remove,
}: {
  surveyIdx: number;
  remove: UseFieldArrayRemove;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  const template_key = useStore((state) => state.template_key);
  const [preView, setpreView] = useState<string>("");
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext();

  const uploadClickTrigger = () => {
    imgRef.current?.click();
  };

  const imgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && template_key) {
      //임의로
      const imgUrl = await imgUploader(PathSegments.Survey, files[0], {
        template_key,
      });
      setpreView(`${process.env.NEXT_PUBLIC_BASE_URL}/${imgUrl}`);

      const QuestionObj = getValues(`items.${surveyIdx}`);

      setValue(`items.${surveyIdx}`, {
        ...QuestionObj,
        textImg: imgUrl,
      });
    }
  };

  const clearPreview = () => {
    setpreView("");
    if (imgRef.current) {
      imgRef.current.value = "";
    }
  };

  return (
    <>
      <div key={surveyIdx}>
        <h1> Q.{surveyIdx + 1}</h1>
        <input
          type="file"
          className="hidden"
          onChange={imgHandler}
          autoComplete="off"
          ref={imgRef}
        />
        {preView && (
          <>
            <div>
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
            {imgRef.current?.value}
            <button onClick={clearPreview}>삭제</button>
          </>
        )}
        <button type="button" onClick={uploadClickTrigger}>
          사진
        </button>

        <input
          type="text"
          {...register(`items.${surveyIdx}.label`, {
            required: "질문 제목은 필수항목 입니다.",
          })}
        />
        {/* delete */}
        <button type="button" onClick={() => remove(surveyIdx)}>
          삭제
        </button>

        <div>
          {
            (errors.items as unknown as { label?: FieldError }[])?.[surveyIdx]
              ?.label?.message
          }
        </div>
      </div>
    </>
  );
}

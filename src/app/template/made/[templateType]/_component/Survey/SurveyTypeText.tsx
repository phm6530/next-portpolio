import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
  FieldError,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import ImageUploadHandler from "@/utils/img-uploader";

export default function SurveyTypeText({
  surveyIdx,
  remove,
}: {
  surveyIdx: number;
  remove: UseFieldArrayRemove;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  const [preView, setpreView] = useState<string>("");
  const {
    register,
    formState: { errors },
  } = useFormContext<RequestSurveyFormData>();

  const uploadClickTrigger = () => {
    imgRef.current?.click();
  };

  const imgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const endPoint = `common/image/${1}`;
      const img = await ImageUploadHandler(endPoint, files[0]);
      console.log(img);
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
        <input type="text" {...register(`questions.${surveyIdx}.label`)} />
        <button type="button" onClick={uploadClickTrigger}>
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

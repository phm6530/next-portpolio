import Image from "next/image";
import { useRef, useState } from "react";
import {
  FieldError,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";

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

  // const imgHandler = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const files = e.currentTarget.files;
  //   if (files && template_key) {
  //     //임의로
  //     const imgUrl = await imgUploader(PathSegments.Survey, files[0], {
  //       template_key,
  //     });
  //     setpreView(`${BASE_URL}/${imgUrl}`);

  //     const QuestionObj = getValues(`items.${surveyIdx}`);

  //     setValue(`items.${surveyIdx}`, {
  //       ...QuestionObj,
  //       textImg: imgUrl,
  //     });
  //   }
  // };

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
          // onChange={imgHandler}
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
          {...register(`questions.${surveyIdx}.label`, {
            required: "질문 제목은 필수항목 입니다.",
          })}
        />
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

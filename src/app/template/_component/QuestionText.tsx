import Image from "next/image";
import {
  FieldError,
  FieldValues,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import commonStyle from "@/styles/pages/template.module.scss";
import classes from "./QuestionText.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";
import FormTextarea from "@/components/ui/FormElement/FormTextarea";
import ImageZoom from "@/app/template/_component/ImageZoom";
import { AnswerSurvey } from "@/types/survey.type";
import {
  AnswerError,
  getErrorMessage,
} from "@/app/(template-types)/survey/util/getErrorMessge.util";

// answers 배열의 타입 정의
interface AnswerField {
  id: string; // 기본적으로 필요한 id 필드
  questionId: number; // 각 질문에 대한 고유 ID
  answer?: string; // 사용자가 입력한 답변 (선택적)
}

export default function QuestionText({
  description,
  qsImg,
  qsId,
}: {
  description: string;
  qsImg: string | null;
  qsId: number;
}) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<AnswerSurvey>();

  const answers = useWatch({
    control,
    name: "answers",
  });

  // 해당 questionId의 인덱스 찾기
  const curIdx = answers.findIndex((e) => e.questionId === qsId);

  if (curIdx === -1 || curIdx === undefined) {
    return <p>해당 질문을 찾을 수 없습니다.</p>;
  }

  const error = errors.answers?.[curIdx] as AnswerError | undefined;
  const errorMsg = error && getErrorMessage(error);

  return (
    <>
      {qsImg && (
        <div className={commonStyle.previewContainer}>
          <Image
            src={qsImg}
            layout="responsive"
            width={16}
            height={9}
            style={{ maxWidth: 700, objectFit: "cover" }}
            alt="preview"
            priority
          />
          <ImageZoom alt={"preview"} image={qsImg} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <FormTextarea
          className={classes.textArea}
          placeholder={`${description}을 기재해주세요!`}
          {...register(`answers.${curIdx}.answer`, {
            required: "필수 항목입니다.",
          })}
          autoComplete="off"
        />

        {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
      </div>
    </>
  );
}

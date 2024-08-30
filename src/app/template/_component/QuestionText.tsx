import QuestionWrapper from "@/app/template/_component/survey/QuestionWrapper";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import commonStyle from "@/styles/pages/template.module.scss";
import classes from "./QuestionText.module.scss";

export default function QuestionText({
  qsImg,
  qsId,
}: {
  qsImg: string | null;
  qsId: number;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <QuestionWrapper>
      {qsImg && (
        <div className={commonStyle.previewContainer}>
          <Image
            src={qsImg}
            fill
            style={{ maxWidth: 700, objectFit: "cover" }}
            alt="preview"
            priority
          />
        </div>
      )}
      <textarea
        className={classes.textArea}
        {...register(`${qsId}`, {
          required: "필수 항목입니다.",
        })}
        autoComplete="off"
      />
      {errors[`${qsId}`]?.message && "에러"}
    </QuestionWrapper>
  );
}

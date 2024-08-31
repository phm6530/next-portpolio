import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import QuestionWrapper from "@/app/template/_component/survey/QuestionWrapper";
import Image from "next/image";
import { FieldError, useFormContext } from "react-hook-form";
import classes from "@/styles/pages/template.module.scss";
import { GetSurveyQuestions } from "@/types/templateSurvey";

type SurveyQuestionOptions = GetSurveyQuestions["questions"][number]["options"];

export default function QuestionOptions({
  options,
  qsId,
}: {
  options: SurveyQuestionOptions;
  qsId: number;
}) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const selectLabel = watch(qsId + "");

  console.log("selectLabel::", selectLabel);

  return (
    <QuestionWrapper>
      {options?.map((e, idx) => {
        return (
          <InputTypeStyle.RadioAnswer
            key={`option-${idx}`}
            selectLabel={selectLabel}
            curLabel={e.label}
          >
            <input
              type="radio"
              key={idx}
              value={e.value}
              {...register(`${qsId}`, {
                required: "필수 항목입니다.",
              })}
            />
            {e.optionPictrue && (
              <div className={classes.previewContainer}>
                <Image
                  src={e.optionPictrue}
                  layout="responsive"
                  width={16}
                  height={9}
                  style={{ maxWidth: 700, objectFit: "cover" }}
                  alt="preview"
                  priority
                />
              </div>
            )}

            {e.label}
          </InputTypeStyle.RadioAnswer>
        );
      })}
      {(errors[`${qsId}`] as FieldError)?.message}
    </QuestionWrapper>
  );
}

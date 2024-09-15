import InputTypeStyle from "@/app/template/_component/InputTypeStyle";

import Image from "next/image";
import { FieldError, useFormContext } from "react-hook-form";
import classes from "@/styles/pages/template.module.scss";
import { GetSurveyQuestions } from "@/types/templateSurvey";
import FormRegisterError from "@/components/Error/FormRegisterError";

import QuestionsContainer from "@/app/template/_component/survey/QuestionsContainer";

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
  const errorMsg = errors[`${qsId}`] as FieldError;

  //하나라도 이미지 있으면 UI 변경하기
  const isPictureOption =
    options?.some((e) => e.optionPictrue !== null) || false;

  return (
    <QuestionsContainer isPicture={isPictureOption}>
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
      {errorMsg && <FormRegisterError errorMsg={errorMsg.message as string} />}
    </QuestionsContainer>
  );
}

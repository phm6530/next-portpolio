import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import Image from "next/image";
import { FieldError, useFormContext } from "react-hook-form";
import { GetSurveyQuestions } from "@/types/templateSurvey";
import FormRegisterError from "@/components/Error/FormRegisterError";
import QuestionsContainer from "@/app/template/_component/survey/QuestionsContainer";
import styles from "./QuestionOptions.module.scss";
import ImageZoom from "@/app/template/_component/ImageZoom";
import ImageViewer from "@/app/template/_component/ImageViewer";

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

            <div className={styles.chkItemWrap}>
              <div
                className={`${styles.chkItem} ${
                  selectLabel === e.label ? styles.active : undefined
                }`}
              />
              {e.label}
            </div>

            {/* 이미지 있으면 */}
            {e.optionPictrue && (
              <>
                <ImageViewer image={e.optionPictrue} alt={e.label} />
              </>
            )}
          </InputTypeStyle.RadioAnswer>
        );
      })}
      {errorMsg && <FormRegisterError errorMsg={errorMsg.message as string} />}
    </QuestionsContainer>
  );
}

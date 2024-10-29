import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import Image from "next/image";
import { FieldError, useFormContext, useWatch } from "react-hook-form";
import { GetSurveyQuestions } from "@/types/templateSurvey";
import FormRegisterError from "@/components/Error/FormRegisterError";
import QuestionsContainer from "@/app/template/_component/survey/QuestionsContainer";
import styles from "./QuestionOptions.module.scss";
import ImageZoom from "@/app/template/_component/ImageZoom";
import ImageViewer from "@/app/template/_component/ImageViewer";
import {
  AnswerSelect,
  AnswerSurvey,
  SurveyQuestionOption,
} from "@/types/survey.type";
import {
  AnswerError,
  getErrorMessage,
} from "@/app/(template-types)/survey/util/getErrorMessge.util";

export default function QuestionOptions({
  options,
  qsId,
}: {
  options: SurveyQuestionOption[];
  qsId: number;
}) {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useFormContext<AnswerSurvey>();

  const answers = useWatch({
    control,
    name: "answers",
  });

  const curIdx = answers.findIndex((e) => e.questionId === qsId);

  if (curIdx === -1) {
    return <p>해당 질문을 찾을 수 없습니다.</p>;
  }

  const option = answers[curIdx] as AnswerSelect;
  const selectOption = option.optionId;

  const error = errors.answers?.[curIdx] as AnswerError | undefined;
  const errorMsg = error && getErrorMessage(error);

  //하나라도 이미지 있으면 UI 변경하기
  const isPictureOption =
    options?.some((e) => e.optionPicture !== null) || false;

  return (
    <QuestionsContainer isPicture={isPictureOption}>
      {options?.map((e, idx) => {
        console.log(e.id);
        return (
          <InputTypeStyle.RadioAnswer
            key={`${e.id}-option-${idx}`}
            selectId={selectOption}
            curid={e.id + ""}
          >
            <input
              type="radio"
              key={idx}
              value={e.id}
              {...register(`answers.${curIdx}.optionId`, {
                required: "필수 항목입니다.",
              })}
            />

            <div className={styles.chkItemWrap}>
              <div
                className={`${styles.chkItem} ${
                  selectOption && +selectOption === e.id
                    ? styles.active
                    : undefined
                }`}
              />
              {e.value}
            </div>

            {/* 이미지 있으면 */}
            {e.optionPicture && (
              <>
                <ImageViewer image={e.optionPicture} alt={e.value} />
              </>
            )}
          </InputTypeStyle.RadioAnswer>
        );
      })}
      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </QuestionsContainer>
  );
}

{
  /* <InputTypeStyle.RadioAnswer
key={`option-${idx}`}
selectLabel={true}
curLabel={e.label}
>
</InputTypeStyle.RadioAnswer> */
}

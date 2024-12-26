import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import { useFormContext, useWatch } from "react-hook-form";
import FormRegisterError from "@/components/Error/FormRegisterError";
import QuestionsContainer from "@/app/template/_component/survey/QuestionsContainer";
import styles from "./QuestionOptions.module.scss";
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
  const isPictureOption = options?.some((e) => e.img !== null) || false;

  return (
    <QuestionsContainer isPicture={isPictureOption}>
      {options?.map((e, idx) => {
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

            <div className={styles.chkItemWrap}>{e.value}</div>

            {/* 이미지 있으면 */}
            {e.img && (
              <>
                <ImageViewer image={e.img} alt={e.value} />
              </>
            )}
          </InputTypeStyle.RadioAnswer>
        );
      })}
      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </QuestionsContainer>
  );
}

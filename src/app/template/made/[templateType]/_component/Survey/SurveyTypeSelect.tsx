import QuestionItemHeader, {
  QuestionType,
} from "@/app/(template-made)/components/QuestionItem/QuestionItemHeader";
import QuestionContainer from "@/app/(template-made)/components/QuestionItem/QuestionContainer";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import SurveyOptionItem from "@/app/template/made/[templateType]/_component/Survey/SurveyOptionItem";

import { QUESTION_TYPE } from "@/types/survey.type";

import {
  FieldErrorsImpl,
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import classes from "./SurveyTypeSelect.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";
import { RequestSelect } from "./AddQuestionController";

export default function SurveyTypeSelect({
  surveyDelete,
  surveyIdx,
}: {
  surveyDelete: UseFieldArrayRemove;
  surveyIdx: number;
}) {
  //FormContext
  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useFormContext<RequestSurveyFormData>();

  //항목 컨트롤러
  const {
    fields,
    append,
    remove: itemRemove,
  } = useFieldArray({
    control,
    name: `questions.${surveyIdx}.options`,
  });

  const handleArrAppend = () => {
    append({ label: "", value: "", type: QUESTION_TYPE.SELECT });
  };

  const confimDelete = () => {
    if (confirm(`${surveyIdx + 1}번 문항을 삭제하시겠습니까?`)) {
      surveyDelete(surveyIdx);
    }
  };

  const optionWatch = watch(`questions.${surveyIdx}.options`);
  const isPicture = optionWatch.some((e) => e.img);
  const values = optionWatch
    .map((e) => e.value.trim())
    .filter((value) => value !== ""); // 빈 문자열 필터링

  const hasDuplicates = new Set(values).size !== values.length;

  const optionError =
    errors.questions as FieldErrorsImpl<RequestSelect>[];

  return (
    <QuestionContainer>
      <div>
        <QuestionItemHeader
          type={QuestionType.MULTIPLE_CHOICE}
          QuestionNum={surveyIdx + 1}
        >
          <input
            type="text"
            autoComplete="off"
            {...register(`questions.${surveyIdx}.label`)}
            placeholder="질문 제목을 입력해주세요."
          />
          <button
            className={classes.delete}
            type="button"
            onClick={confimDelete}
          >
            삭제
          </button>
        </QuestionItemHeader>

        {/* 제목에러 */}
        {errors.questions?.[surveyIdx]?.label?.message && (
          <div>
            <FormRegisterError
              errorMsg={errors.questions?.[surveyIdx]?.label?.message}
            />
          </div>
        )}
      </div>

      {/* Option에 img가 있다면 grid 변경하기 */}
      <div
        className={`${classes.optionsWrapper} ${
          isPicture ? classes.pictureGrid : undefined
        }`}
      >
        {/* Radio - List */}
        {fields!.map((_, optionIdx) => {
          return (
            <SurveyOptionItem
              key={`${surveyIdx}-option-${optionIdx}`}
              surveyIdx={surveyIdx}
              optionIdx={optionIdx}
              itemRemove={itemRemove}
            />
          );
        })}
      </div>

      {hasDuplicates && (
        <div>
          <FormRegisterError errorMsg={"중복된 옵션 값이 있습니다"} />
        </div>
      )}
      {/* 항목추가 */}
      <button
        className={classes.AddBtn}
        type="button"
        onClick={handleArrAppend}
      >
        <span>+</span> 항목추가
      </button>
      {/* Radio 전체삭제  */}
    </QuestionContainer>
  );
}

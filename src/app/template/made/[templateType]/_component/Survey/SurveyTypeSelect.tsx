import QuestionItemHeader, {
  QuestionType,
} from "@/app/(template-made)/components/QuestionItem/QuestionItemHeader";
import QuestionContainer from "@/app/(template-made)/components/QuestionItem/QuestionContainer";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import SurveyRadio from "@/app/template/made/[templateType]/_component/Survey/SurveyRadio";

import { QUESTION_TYPE } from "@/types/survey.type";

import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import classes from "./SurveyTypeSelect.module.scss";
import FormRegisterError from "@/components/Error/FormRegisterError";

export default function SurveyTypeSelect({
  surveyDelete,
  surveyIdx,
}: // imgId,
{
  surveyDelete: UseFieldArrayRemove;
  surveyIdx: number;
  // imgId: string;
}) {
  //FormContext
  const {
    control,
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

  return (
    <QuestionContainer>
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
        <button className={classes.delete} type="button" onClick={confimDelete}>
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

      <div className={classes.optionsWrapper}>
        {/* Radio - List */}
        {fields!.map((_, optionIdx) => {
          return (
            <SurveyRadio
              surveyIdx={surveyIdx}
              optionIdx={optionIdx}
              itemRemove={itemRemove}
            />
          );
        })}
      </div>

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

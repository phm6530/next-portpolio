import QuestionItemHeader from "@/app/(template-made)/components/QuestionItem/QuestionItemHeader";
import QuestionContainer from "@/app/(template-made)/components/QuestionItem/QuestionContainer";
import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import SurveyRadio from "@/app/template/made/[templateType]/_component/Survey/SurveyRadio";

import { QUESTION_TYPE } from "@/types/survey.type";

import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

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

  //숫자 2~20
  //   const validateNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //     const value = parseInt(e.target.value, 10);
  //     if (value < 2 || value > 20) {
  //       alert("값은 2 이상 20 이하여야 합니다.");

  //       //초기화
  //       e.target.value = "";
  //       return;
  //     }
  //   };

  const handleArrAppend = () => {
    append({ label: "", value: "", type: QUESTION_TYPE.SELECT });
  };

  return (
    <QuestionContainer>
      <QuestionItemHeader QuestionNum={surveyIdx + 1}>
        <input
          type="text"
          autoComplete="off"
          {...register(`questions.${surveyIdx}.label`)}
          placeholder="문항 제목을 입력해주세요."
        />
      </QuestionItemHeader>
      {/* 제목에러 */}
      <div>
        {errors.questions?.[surveyIdx]?.label?.message as string | null}
      </div>
      <div></div>
      {/* Radio - List */}
      {fields!.map((_, optionIdx) => {
        return (
          <div key={`option-${optionIdx}`}>
            <SurveyRadio
              surveyIdx={surveyIdx}
              optionIdx={optionIdx}
              itemRemove={itemRemove}
            />
          </div>
        );
      })}
      {/* 항목추가 */}
      <button type="button" onClick={handleArrAppend}>
        Add
      </button>
      {/* Radio 전체삭제  */}
      <button type="button" onClick={() => surveyDelete(surveyIdx)}>
        삭제
      </button>
    </QuestionContainer>
  );
}

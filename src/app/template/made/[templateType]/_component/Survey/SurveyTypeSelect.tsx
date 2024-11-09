import { RequestSurveyFormData } from "@/app/(template-made)/made/[...madeType]/components/survey/CreateSurvey";
import SurveyRadio from "@/app/template/made/[templateType]/_component/Survey/SurveyRadio";
import { QUESTION_TYPE } from "@/types/survey.type";
import { AddSurveyFormProps } from "@/types/templateSurvey";

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
    <>
      Q.
      <input
        type="text"
        autoComplete="off"
        {...register(`questions.${surveyIdx}.label`, {
          required: "질문 제목은 필수항목 입니다.",
        })}
      />
      {/* 제목에러 */}
      <div>
        {errors.questions?.[surveyIdx]?.label?.message as string | null}
      </div>
      <div>
        {/* <>
          <input
            type="number"
            placeholder="최대 20개"
            min={2}
            max={20}
            onChange={validateNumber}
            ref={ref}
          />
        </> */}
      </div>
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
    </>
  );
}

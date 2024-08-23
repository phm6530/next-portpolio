import SurveyRadio from "@/app/template/made/[templateType]/_component/Survey/SurveyRadio";
import { AddSurveyFormProps } from "@/types/templateSurvey";

import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

export default function SurveyTypeSelect({
  surveyDelete,
  surveyIdx,
  imgId,
}: {
  surveyDelete: UseFieldArrayRemove;
  surveyIdx: number;
  imgId: string;
}) {
  //FormContext
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  //항목 컨트롤러
  const {
    fields,
    append,
    update,
    remove: itemRemove,
  } = useFieldArray({
    control,
    name: `items.${surveyIdx}.options`,
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
    append({ idx: fields[fields.length - 1].idx + 1, value: "" });
  };

  return (
    <>
      Q.
      <input
        type="text"
        autoComplete="off"
        {...register(`items.${surveyIdx}.label`, {
          required: "질문 제목은 필수항목 입니다.",
        })}
      />
      {/* 제목에러 */}
      <div>{errors.items?.[surveyIdx]?.label?.message as string | null}</div>
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
              fields={fields}
              surveyIdx={surveyIdx}
              optionIdx={optionIdx}
              itemRemove={itemRemove}
              update={update}
              imgId={imgId}
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

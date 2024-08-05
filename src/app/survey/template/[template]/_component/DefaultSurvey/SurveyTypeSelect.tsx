import SurveyRadio from "@/app/survey/template/[template]/_component/DefaultSurvey/SurveyRadio";
import { AddSurveyFormProps, SurveyRadioProps } from "@/types/survey";
import { UseFieldArrayRemove, useFormContext } from "react-hook-form";

export default function SurveyTypeSelect({
  handleAddOption,
  fieldOption,
  remove,
  surveyIdx,
}: {
  handleAddOption: (idx: number) => void;
  fieldOption: Pick<SurveyRadioProps, "options">["options"];
  remove: UseFieldArrayRemove;
  surveyIdx: number;
}) {
  //FormContext
  const {
    register,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

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
      {fieldOption!.map((_, optionIdx) => {
        return (
          <div key={`option-${optionIdx}`}>
            <SurveyRadio
              fieldCnt={fieldOption?.length!}
              surveyIdx={surveyIdx}
              optionIdx={optionIdx}
            />
          </div>
        );
      })}
      <button type="button" onClick={() => handleAddOption(surveyIdx)}>
        Add
      </button>
      <button type="button" onClick={() => remove(surveyIdx)}>
        삭제
      </button>
    </>
  );
}

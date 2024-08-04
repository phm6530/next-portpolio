import { AddSurveyFormProps } from "@/types/survey";
import { FieldErrors, useFormContext } from "react-hook-form";

export default function DefaultTypeRadio({
  surveyIdx,
  optionIdx,
}: {
  surveyIdx: number;
  optionIdx: number; // survey 항목 안의 Array Idx 임
}) {
  const {
    getValues,
    setValue,
    trigger,
    register,
    formState: { errors },
  } = useFormContext<AddSurveyFormProps>();

  //리스트 제거
  const removeOptions = (idx: number, optionIdx: number): void => {
    const curOptions = getValues(`items.${surveyIdx}.options`) || [];
    const newOptions = curOptions.filter((_, i) => i !== optionIdx); // 옵션 인덱스를 기준으로 필터링

    setValue(`items.${idx}.options`, newOptions);
    trigger(`items.${idx}.options`);
  };

  return (
    <>
      항목 {optionIdx + 1}
      <input
        type="text"
        {...register(`items.${surveyIdx}.options.${optionIdx}.value`, {
          required: "필수 항목",
        })}
      />
      <div>
        {(
          errors.items?.[surveyIdx]?.options as FieldErrors<{
            value: string;
          }>[]
        )?.[optionIdx]?.value?.message || null}
      </div>
      <button type="button" onClick={() => removeOptions(surveyIdx, optionIdx)}>
        삭제
      </button>
    </>
  );
}

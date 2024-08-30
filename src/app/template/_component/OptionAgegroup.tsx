import { useFormContext } from "react-hook-form";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import QuestionWrapper from "@/app/template/_component/survey/QuestionWrapper";

export default function OptionAgeGroup() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const AgeGroups = [10, 20, 30, 40, 50, 60];
  const selectAgeGroup = watch("ageGroup");

  return (
    <QuestionWrapper subtitle={"연령대"}>
      {AgeGroups.map((range) => {
        return (
          <InputTypeStyle.Radio
            key={`ageGroup-${range}`}
            selectLabel={+selectAgeGroup === range}
          >
            <input
              type="radio"
              value={range}
              {...register("ageGroup", { required: "필수항목" })}
            />
            {range} 대
          </InputTypeStyle.Radio>
        );
      })}
      {typeof errors.ageGroup?.message === "string" && (
        <span>{errors.ageGroup.message}</span>
      )}
    </QuestionWrapper>
  );
}

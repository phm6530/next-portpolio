import { useFormContext } from "react-hook-form";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import FormRegisterError from "@/components/Error/FormRegisterError";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";

export default function OptionAgeGroup() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const AgeGroups = [10, 20, 30, 40, 50, 60];
  const selectAgeGroup = watch("ageGroup");

  const errorMsg = errors.ageGroup?.message;

  return (
    <TemplateQuestionWrapper>
      <QuestionTitle>연령대</QuestionTitle>
      {AgeGroups.map((range) => {
        return (
          <InputTypeStyle.Radio
            key={`ageGroup-${range}`}
            selectLabel={selectAgeGroup}
            curLabel={range + ""}
          >
            <input
              type="radio"
              value={range}
              {...register("ageGroup", { required: "필수 항목입니다." })}
            />
            {range} 대
          </InputTypeStyle.Radio>
        );
      })}
      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </TemplateQuestionWrapper>
  );
}

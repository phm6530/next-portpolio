import { useFormContext } from "react-hook-form";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import FormRegisterError from "@/components/Error/FormRegisterError";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
import QuestionDetailWrapper from "@/components/ui/templateUi/QuestionDetailWrapper";
import classes from "./OptionAgeGroup.module.scss";

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
    <div>
      <QuestionTitle noneIdx>연령대를 선택해주세요</QuestionTitle>
      <div style={{ display: "flex", gap: "10px" }}>
        {AgeGroups.map((range) => {
          return (
            <InputTypeStyle.RadioAnswer
              key={`ageGroup-${range}`}
              selectId={selectAgeGroup}
              curid={range + ""}
            >
              <input
                type="radio"
                value={range}
                {...register("ageGroup", { required: "필수 항목입니다." })}
              />
              {range} 대
            </InputTypeStyle.RadioAnswer>
          );
        })}
      </div>{" "}
      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </div>
  );
}

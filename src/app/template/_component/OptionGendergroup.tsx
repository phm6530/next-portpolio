import FormRegisterError from "@/components/Error/FormRegisterError";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
import TemplateQuestionWrapper from "@/components/ui/templateUi/TemplateQuestionWrap";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";

import { useFormContext } from "react-hook-form";

export default function OptionGenderGroup() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const gender = ["male", "female"];
  const selectGender = watch("gender");

  const errorMsg = errors.gender?.message;

  return (
    <TemplateQuestionWrapper>
      <QuestionTitle>성별</QuestionTitle>
      {gender.map((e) => {
        return (
          <InputTypeStyle.Radio
            key={`gender-${e}`}
            selectLabel={selectGender}
            curLabel={e}
          >
            <input
              type="radio"
              value={e}
              {...register("gender", { required: "필수 항목입니다." })}
            />
            {e === "male" ? "남" : "여"}
          </InputTypeStyle.Radio>
        );
      })}
      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </TemplateQuestionWrapper>
  );
}

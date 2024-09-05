import FormRegisterError from "@/app/_components/Error/FormRegisterError";
import InputTypeStyle from "@/app/template/_component/InputTypeStyle";
import QuestionWrapper from "@/app/template/_component/survey/QuestionWrapper";
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
    <QuestionWrapper subtitle={"성별"}>
      {gender.map((e) => {
        console.log(e);
        return (
          <InputTypeStyle.RadioAnswer
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
          </InputTypeStyle.RadioAnswer>
        );
      })}
      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </QuestionWrapper>
  );
}

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

  return (
    <QuestionWrapper subtitle={"성별"}>
      {gender.map((e) => {
        return (
          <InputTypeStyle.Radio
            key={`gender-${e}`}
            selectLabel={selectGender && selectGender === e}
          >
            <input
              type="radio"
              value={e}
              {...register("gender", { required: "필수항목" })}
            />
            {e === "male" ? "남" : "여"}
          </InputTypeStyle.Radio>
        );
      })}
      {errors.gender?.message as string}
    </QuestionWrapper>
  );
}

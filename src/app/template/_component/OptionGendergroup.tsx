import FormRegisterError from "@/components/Error/FormRegisterError";
import QuestionTitle from "@/components/ui/templateUi/QuestionTitle";
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
    <div>
      <QuestionTitle>성별이 어떻게 되시나요?</QuestionTitle>
      <div style={{ display: "flex", gap: "10px" }}>
        {gender.map((e) => {
          return (
            <InputTypeStyle.RadioAnswer
              key={`gender-${e}`}
              selectId={selectGender}
              curid={e}
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
      </div>{" "}
      {errorMsg && <FormRegisterError errorMsg={errorMsg as string} />}
    </div>
  );
}

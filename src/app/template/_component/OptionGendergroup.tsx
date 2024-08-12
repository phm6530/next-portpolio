import { FieldError, useFormContext } from "react-hook-form";

export default function OptionGenderGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const gender = ["male", "female"];

  return (
    <>
      {gender.map((e) => {
        return (
          <label key={`gender-${e}`}>
            <input
              type="radio"
              value={e}
              {...register("gender", { required: "필수항목" })}
            />
            {e === "male" ? "남" : "여"}
          </label>
        );
      })}
      {errors.gender?.message as FieldError}
    </>
  );
}

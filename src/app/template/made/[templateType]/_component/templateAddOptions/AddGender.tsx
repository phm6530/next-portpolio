import RadioWrap from "@/components/ui/RadioWrap";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import { useFormContext } from "react-hook-form";

export default function AddGender() {
  const booleanRadio = ["1", "0"];
  const { register } = useFormContext<AddSurveyFormProps>();

  return (
    <RadioWrap>
      성별 집계를 하시겠습니까?
      {booleanRadio.map((e, idx) => (
        <label key={`boolean-${idx}`}>
          <input
            type="radio"
            {...register("genderChk", {
              required: "필수",
            })}
            value={e}
          />
          {e === "1" ? "예" : "아니오"}
        </label>
      ))}
    </RadioWrap>
  );
}

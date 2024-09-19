import RadioWrap from "@/components/ui/RadioWrap";
import { AddSurveyFormProps } from "@/types/templateSurvey";
import { useFormContext } from "react-hook-form";

export default function AddAgeGroup() {
  const booleanRadio = ["1", "0"];
  const { register } = useFormContext<AddSurveyFormProps>();

  return (
    <RadioWrap>
      연령 별 집계를 하시겠습니까?
      {booleanRadio.map((e, idx) => {
        return (
          <label key={`boolean-${idx}`}>
            <input
              type="radio"
              {...register("ageChk", {
                required: "필수",
              })}
              value={e}

              // defaultChecke={ageChk === e}
            />
            {e === "1" ? "예" : "아니오"}
          </label>
        );
      })}
      <p>연령별 체크리스트가 생성됩니다.</p>
    </RadioWrap>
  );
}

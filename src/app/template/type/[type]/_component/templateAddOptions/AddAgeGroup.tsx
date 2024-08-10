import { AddSurveyFormProps } from "@/types/templateSurvey";
import { useFormContext } from "react-hook-form";

export default function AddAgeGroup() {
  const booleanRadio = ["1", "0"];

  const { register, watch } = useFormContext<AddSurveyFormProps>();
  const ageChk = watch("ageChk");

  return (
    <div>
      연령 별 집계를 하시겠습니까?
      {booleanRadio.map((e, idx) => {
        console.log(`${e}::: `, ageChk === e);

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
    </div>
  );
}

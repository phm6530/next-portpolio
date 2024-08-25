import { AddSurveyFormProps } from "@/types/templateSurvey";
import { useFormContext } from "react-hook-form";

export default function SurveyText({
  label,
  requiredMsg,
}: {
  label: keyof AddSurveyFormProps | keyof Pick<AddSurveyFormProps, "items">;
  requiredMsg: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input
        type="text"
        {...register(label, {
          required: requiredMsg,
        })}
        autoComplete="off"
      />
      {/* 에러존재하면 */}
      {typeof errors?.[label]?.message === "string" && errors[label].message}
    </div>
  );
}

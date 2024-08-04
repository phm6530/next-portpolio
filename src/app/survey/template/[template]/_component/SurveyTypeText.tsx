import { AddSurveyFormProps } from "@/types/survey";
import { FieldError, UseFormRegister } from "react-hook-form";

export default function InputTypeText({
  label,
  error,
  requiredMsg,
  register,
}: {
  label: keyof AddSurveyFormProps | keyof Pick<AddSurveyFormProps, "items">;
  error?: FieldError;
  requiredMsg: string;
  register: UseFormRegister<AddSurveyFormProps>;
}) {
  return (
    <div>
      <input
        type="text"
        {...register(label, {
          required: requiredMsg,
        })}
      />
      {error && error.message}
    </div>
  );
}

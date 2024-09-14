import { useFormContext } from "react-hook-form";
import classes from "./TextInput.module.scss";

export default function TextArea({
  placeholder,
  inputName,
  errorMsg,
  className,
}: {
  placeholder: string;
  inputName: string;
  errorMsg: string;
  className: string;
}) {
  const { register } = useFormContext();
  return (
    <textarea
      className={`${classes.textInput} ${className ? className : undefined}`}
      placeholder={placeholder}
      {...register(inputName, {
        required: errorMsg,
        minLength: { value: 10, message: "최소 10글자 적어주세요" },
      })}
    />
  );
}

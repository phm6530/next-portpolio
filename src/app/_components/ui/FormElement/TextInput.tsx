import { useFormContext } from "react-hook-form";
import classes from "./TextInput.module.scss";

export default function TextInput({
  placeholder,
  inputName,
  errorMsg,
}: {
  placeholder: string;
  inputName: string;
  errorMsg: string;
}) {
  const { register } = useFormContext();
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className={classes.textInput}
        {...register(inputName, { required: errorMsg })}
      />
    </>
  );
}

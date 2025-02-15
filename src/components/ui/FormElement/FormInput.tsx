"use client";
import { forwardRef } from "react";
import classes from "./FormInput.module.scss";
import { useFormContext } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName?: string;
  error?: string;
  notErrorText?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { inputName, name, notErrorText, ...rest } = props;
  const {
    formState: { errors },
  } = useFormContext();

  const err = name && errors ? errors[name] : false;
  return (
    <div className={classes.inputWrapper}>
      <input
        autoComplete="off"
        className={`${classes.FormInput} ${!!err ? classes.error : undefined}`}
        name={name}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

FormInput.displayName = "FormInput";
export default FormInput;

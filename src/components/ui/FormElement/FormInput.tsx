"use client";
import { forwardRef } from "react";
import classes from "./FormInput.module.scss";
import { useFormContext } from "react-hook-form";
import FormRegisterError from "@/components/Error/FormRegisterError";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName?: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { inputName, name, ...rest } = props;
  const {
    formState: { errors },
  } = useFormContext();

  const err = name && errors ? errors[name] : false;
  return (
    <>
      <input
        autoComplete="off"
        className={`${classes.FormInput} ${!!err ? classes.error : undefined}`}
        name={name}
        ref={ref}
        {...rest}
      />
      {err && <FormRegisterError errorMsg={err.message as string} />}
    </>
  );
});

FormInput.displayName = "FormInput";
export default FormInput;

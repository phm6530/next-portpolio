"use client";
import { forwardRef, useEffect, useState } from "react";
import classes from "./FormInput.module.scss";
import { useFormContext } from "react-hook-form";
import FormRegisterError from "@/components/Error/FormRegisterError";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputName?: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { inputName, ...rest } = props;
  const {
    formState: { errors },
  } = useFormContext();

  const err = inputName ? errors[inputName] : false;

  return (
    <>
      <input
        className={`${classes.FormInput} ${!!err ? classes.error : undefined}`}
        ref={ref}
        {...rest}
      />
      {err && <FormRegisterError errorMsg={err.message as string} />}
    </>
  );
});

FormInput.displayName = "FormInput";
export default FormInput;

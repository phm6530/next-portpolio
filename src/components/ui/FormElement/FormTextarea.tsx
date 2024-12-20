import useRows from "@/_hook/useRows";
import classes from "./FormInput.module.scss";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import FormRegisterError from "@/components/Error/FormRegisterError";

type TextAreaProps = {
  textareaName?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, name, ...rest }, ref) => {
    const [rows, rowsHandler] = useRows();
    const {
      formState: { errors },
    } = useFormContext();

    const err = name && errors ? errors[name] : null;

    return (
      <>
        <textarea
          className={`${classes.FormInput} ${className || ""} ${
            err ? classes.error : ""
          }`}
          ref={ref}
          name={name}
          onChange={(e) => {
            rowsHandler(e);
            rest?.onChange?.(e);
          }}
          rows={rows}
          {...rest}
        />
        {err && <FormRegisterError errorMsg={err.message as string} />}
      </>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;

import useRows from "@/_hook/useRows";
import classes from "./FormInput.module.scss";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import FormRegisterError from "@/components/Error/FormRegisterError";

type TextAreaProps = {
  textareaName?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, textareaName, ...rest }, ref) => {
    const [rows, rowsHandler] = useRows();
    const {
      formState: { errors },
    } = useFormContext();

    const err = textareaName ? errors[textareaName] : false;

    return (
      <>
        <textarea
          className={`${classes.FormInput} ${
            className ? className : undefined
          } ${!!err ? classes.error : undefined}`}
          onChange={rowsHandler}
          ref={ref}
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

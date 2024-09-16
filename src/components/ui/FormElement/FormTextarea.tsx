import useRows from "@/_hook/useRows";
import classes from "./FormInput.module.scss";
import {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...rest }, ref) => {
  const [rows, rowsHandler] = useRows();

  return (
    <textarea
      {...rest}
      className={`${classes.FormInput} ${className ? className : undefined}`}
      onChange={rowsHandler}
      ref={ref}
      rows={rows}
    />
  );
});

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;

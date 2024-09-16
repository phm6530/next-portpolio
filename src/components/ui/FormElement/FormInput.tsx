import { forwardRef } from "react";
import classes from "./FormInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <input className={classes.FormInput} ref={ref} {...props} />;
});

FormInput.displayName = "FormInput";
export default FormInput;

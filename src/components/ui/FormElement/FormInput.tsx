import { forwardRef, useEffect, useState } from "react";
import classes from "./FormInput.module.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (!!props.error) setTouched(true);
  }, [props.error]);

  return (
    <input
      className={`${classes.FormInput} ${
        !!props.error ? classes.error : undefined
      }`}
      ref={ref}
      {...props}
    />
  );
});

FormInput.displayName = "FormInput";
export default FormInput;

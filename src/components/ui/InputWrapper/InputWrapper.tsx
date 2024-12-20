import { ReactNode } from "react";
import classes from "./InputWrapper.module.scss";

export default function InputWrapper({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={classes.wrapper}>
      {title}
      {children}
    </div>
  );
}

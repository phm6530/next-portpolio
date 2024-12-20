import { ReactNode } from "react";
import classes from "./InputWrapper.module.scss";

export default function InputWrapper({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.titleHeader}>{title}</div>
      {children}
      {description && <div className={classes.description}>{description}</div>}
    </div>
  );
}

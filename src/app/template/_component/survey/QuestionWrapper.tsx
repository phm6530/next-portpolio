import { ReactNode } from "react";
import classes from "./QuestionWrapper.module.scss";

export default function QuestionWrapper({
  subtitle,
  children,
}: {
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className={classes.questionWrapper}>
      {subtitle && <div className={classes.subTitle}>{subtitle} </div>}
      {children}
    </div>
  );
}

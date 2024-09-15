import { ReactNode } from "react";
import classes from "./TemplateQuestionWrap.module.scss";

export default function TemplateQuestionWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={classes.questionWrapper}>{children}</div>;
}

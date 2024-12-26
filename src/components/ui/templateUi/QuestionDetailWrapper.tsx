import { ReactNode } from "react";
import classes from "./QuestionsDetailWrapper.module.scss";

export default function QuestionDetailWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={classes.chartsWrapper}>{children}</div>;
}

import { ReactNode } from "react";
import classes from "./QuestionsAnswersWrapper.module.scss";

export default function QuestionsAnswersWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={classes.wrapper}>{children}</div>;
}

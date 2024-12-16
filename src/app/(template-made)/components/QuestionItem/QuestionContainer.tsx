import { ReactNode } from "react";
import classes from "./QuestionContainer.module.scss";

export default function QuestionListWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <article className={classes.questionArticle}>{children}</article>;
}

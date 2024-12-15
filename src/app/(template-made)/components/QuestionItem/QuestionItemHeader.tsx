import { ReactNode } from "react";
import classes from "./QuestionContainer.module.scss";

export default function QuestionItemHeader({
  QuestionNum,
  children,
}: {
  QuestionNum: number;
  children: ReactNode;
}) {
  return (
    <div className={classes.header}>
      <h1 className={classes.num}>Q.{QuestionNum}</h1>
      {children}
    </div>
  );
}

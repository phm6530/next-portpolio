import { ReactNode } from "react";
import classes from "./QuestionContainer.module.scss";

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE", // 객관식
  SHORT_ANSWER = "SHORT_ANSWER", // 주관식
}

const QUESTION_TYPE_LABEL = {
  [QuestionType.MULTIPLE_CHOICE]: "객관식",
  [QuestionType.SHORT_ANSWER]: "주관식",
};

export default function QuestionItemHeader({
  type,
  QuestionNum,
  children,
}: {
  type?: QuestionType;
  QuestionNum: number;
  children: ReactNode;
}) {
  return (
    <div className={classes.header}>
      {/* <div className={classes.tag}>{type && QUESTION_TYPE_LABEL[type]}</div> */}
      <div className={classes.headInputWrapper}>
        <h1 className={classes.num}>{QuestionNum}. </h1>
        {children}
      </div>
    </div>
  );
}

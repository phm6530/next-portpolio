import { ReactNode } from "react";
import classes from "./QuestionsAnswersWrapper.module.scss";

export default function QuestionsAnswersWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${classes.wrapper} ${
        className ? className : undefined
      }`}
    >
      {children}
    </div>
  );
}

import { ReactNode } from "react";
import classes from "./QuestionsContainer.module.scss";

export default function QuestionsContainer({
  isPicture,
  children,
}: {
  isPicture: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`${classes.QuestionsContainer} ${
        isPicture ? classes.true : undefined
      }`}
    >
      {children}
    </div>
  );
}

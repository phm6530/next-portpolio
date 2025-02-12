import { ReactNode } from "react";
import classes from "./QuestionContainer.module.scss";
import useAOS from "@/_hook/usAOS";

export default function QuestionListWrapper({
  children,
}: {
  children: ReactNode;
}) {
  useAOS({ preserveClass: true });
  return (
    <article className={`${classes.questionArticle} aos-hidden`}>
      {children}
    </article>
  );
}

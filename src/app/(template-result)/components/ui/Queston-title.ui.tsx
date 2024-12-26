import { ReactNode } from "react";
import classes from "./Question-title.module.scss";

export default function QuestionTitle({
  idx,
  children,
}: {
  idx: number;
  children: ReactNode;
}) {
  return (
    <>
      <div className={classes.label}>
        <span>Q{idx + 1}.</span>
        <div>{children}</div>
      </div>
    </>
  );
}

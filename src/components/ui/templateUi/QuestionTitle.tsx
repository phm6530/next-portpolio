import classes from "./QuestionTitle.module.scss";

export default function QuestionTitle({
  children,
  idx,
}: {
  children: string;
  idx?: number;
}) {
  return (
    <>
      <div className={`${classes.label}`}>
        {/* <Qna /> */}
        {idx !== undefined && (
          <div className={classes.quizNum}>Q{idx + 1}.</div>
        )}
        {children}
      </div>
    </>
  );
}

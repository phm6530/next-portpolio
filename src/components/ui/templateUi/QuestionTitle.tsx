import classes from "./QuestionTitle.module.scss";
import ChkIcon from "/public/asset/icon/chk.svg";

export default function QuestionTitle({ children }: { children: string }) {
  return (
    <>
      <div className={classes.label}>
        <ChkIcon/>
        {children}
      </div>
    </>
  );
}

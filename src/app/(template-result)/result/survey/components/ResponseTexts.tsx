import QuestionTitle from "@/app/(template-result)/components/ui/Queston-title.ui";
import { ResultText } from "@/types/surveyResult.type";
import classes from "./ResponseTexts.module.scss";
import Female30 from "/public/asset/icon/female_30.svg";
import Male30 from "/public/asset/icon/male_30.svg";

export function ResponseTexts({ label, textAnswers }: ResultText) {
  return (
    <>
      <QuestionTitle>{label}</QuestionTitle>
      <div className={classes.textQuestionList}>
        {textAnswers.map((e, txtIdx) => {
          const { respondent, answer } = e;
          const { gender, age } = respondent;
          return (
            <div key={txtIdx} className={classes.responseContainer}>
              <div className={classes.anonymous}>
                <div className={classes.iconWrap}>
                  {gender === "female" && <Female30 />}
                  {gender === "male" && <Male30 />}
                </div>

                <div className={classes.age}>{age}대 </div>
                <span
                  className={
                    gender === "female" ? classes.female : classes.male
                  }
                >
                  {gender === "female" ? "여성" : "남성"}
                </span>
              </div>

              <div className={classes.anonymousResponse}>{answer}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

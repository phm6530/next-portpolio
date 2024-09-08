import QuestionTitle from "@/app/_components/ui/templateUi/QuestionTitle";
import classes from "./ResponseText.module.scss";
import { ageGroupProps, Gender } from "@/types/template";
import FemaleIcon from "/public/asset/icon/female.svg";
import MaleIcon from "/public/asset/icon/male.svg";

export default function ResponseText({
  questionTitle,
  filterData,
  genderGroup,
  ageGroup,
}: {
  questionTitle: string;
  filterData: {
    gender: Gender;
    age: 10 | 20 | 30 | 40 | 50 | 60;
    value: string;
  }[];
  genderGroup: "all" | Gender;
  ageGroup: ageGroupProps;
}) {
  return (
    <div className={classes.questionItem}>
      <QuestionTitle>{questionTitle}</QuestionTitle>
      <div>
        {filterData && filterData?.length > 0 ? (
          <>
            {filterData.map((e, txtIdx) => (
              <div key={txtIdx} className={classes.responseContainer}>
                <div className={classes.anonymous}>
                  {e.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
                  {e.age}대 {e.gender === "female" ? "여성" : "남성"}
                </div>

                <div className={classes.anonymousResponse}>{e.value}</div>
              </div>
            ))}
            더보기
          </>
        ) : (
          `${ageGroup}대${
            genderGroup === "all"
              ? "는 참여자가 없네요.."
              : ` ${
                  genderGroup === "female" ? "여성" : "남성"
                }은 참여자가 없네요...`
          }`
        )}
      </div>
    </div>
  );
}

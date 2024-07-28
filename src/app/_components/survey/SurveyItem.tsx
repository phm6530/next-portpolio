import { SurveyItemProps } from "@/types/survey";
import classes from "./SurveyItem.module.scss";
import Image from "next/image";
import { useRef } from "react";

export default function SurveyItem({ item }: { item: SurveyItemProps }) {
  const {
    img,
    surveyTitle,
    createUser,
    ParticipationCnt,
    ParticipationMain,
    item: hit,
  } = item;

  return (
    <div className={classes.itemBox}>
      <div className={classes.surveyThumbNail}>
        <Image alt="test" src={img} layout="fill" objectFit="cover" />
      </div>
      <div className={classes.summryInfo}>
        <div className={classes.surveyTitle}>{surveyTitle}</div>
        <div className={classes.Participation}>
          <span>{ParticipationMain.ageRange}</span>대
          <span
            className={
              ParticipationMain.gender === "men"
                ? classes.genderMen
                : classes.genderGirl
            }
          >
            {ParticipationMain.gender === "men" ? "남자" : "여자"}
          </span>
          의 참여율이 가장 높습니다.
        </div>
        <div className={classes.itemBottom}>
          <span className={classes.createUser}>by {createUser.username}</span>
          참여자 {ParticipationCnt}명
        </div>
      </div>
    </div>
  );
}

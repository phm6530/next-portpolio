import { SurveyItemProps } from "@/types/survey";
import classes from "./SurveyList.module.scss";
import SurveyItem from "@/app/_components/survey/SurveyItem";

const DUMMY_DATA: SurveyItemProps[] = [
  {
    img: null,
    surveyTitle: "여러분의 평균 스펙은 어느 정도인가요?",
    createUser: {
      username: "리슨업",
    },
    ParticipationCnt: 130,
    ParticipationMain: {
      ageRange: 20,
      gender: "men",
    },
  },
  {
    img: null,
    surveyTitle: "여러분의 평균 스펙은 어느 정도인가요?",
    createUser: {
      username: "리슨업",
    },
    ParticipationCnt: 130,
    ParticipationMain: {
      ageRange: 20,
      gender: "women",
    },
  },
  {
    img: null,
    surveyTitle: "여러분의 평균 스펙은 어느 정도인가요?",
    createUser: {
      username: "리슨업",
    },
    ParticipationCnt: 130,
    ParticipationMain: {
      ageRange: 20,
      gender: "men",
    },
  },
];

export default function SurveyList() {
  return (
    <>
      {DUMMY_DATA.map((item, idx) => {
        return <SurveyItem item={item} key={`surveyItem-${idx}`} />;
      })}
    </>
  );
}

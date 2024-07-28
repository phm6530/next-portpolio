"use client";

import { SurveyItemProps } from "@/types/survey";
import SurveyItem from "@/app/_components/survey/SurveyItem";
import classes from "./SurveyList.module.scss";
import { useGSAP } from "@gsap/react";

const DUMMY_DATA: SurveyItemProps[] = [
  {
    img: "/asset/2.png",
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
    img: "/asset/1.png",
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
    img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
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
    img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
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
    img: "https://d33h8icwcso2tj.cloudfront.net/uploads/project/0cc22904-c448-4c48-935b-8b4b78eceea5/______2024-06-14_191238_20240616151843.jpg",
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

export default function SurveyList({ idx }: { idx: number }) {
  return (
    <div className={idx ? classes.slideTop : classes.slideBottom}>
      {DUMMY_DATA.map((item, idx) => (
        <div key={`surveyItem-${idx}`} style={{ marginRight: "20px" }}>
          <SurveyItem item={item} />
        </div>
      ))}
    </div>
  );
}

"use client";

import { SurveyItemProps } from "@/types/survey";
import classes from "./SurveySlide.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SurveyItem from "@/app/_components/survey/SurveyItem";

const DUMMY_DATA: SurveyItemProps[] = [
  {
    surveyId: 1,
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
    surveyId: 2,
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
    surveyId: 3,
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
    surveyId: 4,
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
    surveyId: 5,
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

export default function SurveySlide({ idx }: { idx: number }) {
  const gsapFn = useRef<gsap.core.Tween | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const test = gsap.to(".test", {
        y: "+=30%",
        repeat: -1,
        yoyo: true,
        duration: 15,
        ease: "none",
      });

      gsapFn.current = test;
    },
    { scope: ".ts" }
  );

  return (
    <div className={`ts ${idx ? classes.slideTop : classes.slideBottom}`}>
      <div className={`test ${classes.test}`}>
        {DUMMY_DATA.map((item, idx) => (
          <div key={`surveyItem-${idx}`}>
            <SurveyItem itemData={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

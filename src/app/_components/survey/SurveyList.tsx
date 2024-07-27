"use client";

import { SurveyItemProps } from "@/types/survey";
import SurveyItem from "@/app/_components/survey/SurveyItem";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import classes from "./SurveyList.module.scss";

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
];

export default function SurveyList({ idx }: { idx: number }) {
  const controls = useAnimation();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const totalHeight = marqueeRef.current!.scrollHeight / 2; // 실제 높이의 절반만큼만 이동

    controls.start({
      y: [0, idx === 0 ? totalHeight : -totalHeight],
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls, idx]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  return (
    <div
      className={idx ? classes.slideTop : classes.slideBottom}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={marqueeRef}
        animate={controls}
        style={{ position: "relative" }}
      >
        {DUMMY_DATA.map((item, idx) => (
          <div key={`surveyItem-${idx}`} style={{ marginRight: "20px" }}>
            <SurveyItem item={item} />
          </div>
        ))}
        {DUMMY_DATA.map((item, idx) => (
          <div key={`surveyItem-clone-${idx}`} style={{ marginRight: "20px" }}>
            <SurveyItem item={item} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

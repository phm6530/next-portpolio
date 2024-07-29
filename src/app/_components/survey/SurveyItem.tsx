"use client";

import { SurveyItemProps } from "@/types/survey";
import classes from "./SurveyItem.module.scss";
import Image from "next/image";
import gsap from "gsap";

import { ForwardedRef, MouseEventHandler, useRef } from "react";
import { useGSAP } from "@gsap/react";

export default function SurveyItem({
  item,
  gsapFn,
}: {
  item: SurveyItemProps;
  gsapFn: ForwardedRef<gsap.core.Tween | null>;
}) {
  const {
    img,
    surveyTitle,
    createUser,
    ParticipationCnt,
    ParticipationMain,
    item: hit,
  } = item;

  const ref = useRef<HTMLDivElement>(null);

  const hoverHandler = () => {
    if (gsapFn.current) {
      const tl = gsap.timeline();
      tl.to(gsapFn.current, { timeScale: 0, duration: 1 });
      tl.to(
        ref.current,
        {
          keyframes: {
            "0%": {},
            "80%": { rotation: -10, x: 100 },
            "100%": { scale: 1.1 },
            ease: "power1.in",
          },
        },
        "<"
      );
    }
  };

  const onMouseLeaveHandler = () => {
    if (gsapFn.current) {
      const tl = gsap.timeline();
      tl.to(gsapFn.current, { timeScale: 1, duration: 1 });
      tl.to(
        ref.current,
        {
          rotation: 0,
          x: 0,
          scale: 1,
        },
        "<"
      );
    }
  };

  return (
    <div
      className={classes.itemBox}
      onMouseOver={hoverHandler}
      onMouseLeave={onMouseLeaveHandler}
      ref={ref}
    >
      <div className={classes.surveyThumbNail}>
        <Image
          alt="test"
          src={img}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          style={{ objectFit: "cover" }}
        />
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

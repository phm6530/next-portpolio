"use client";

import classes from "./SurveySlide.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
// import SurveyItem from "@/components/survey/SurveyItem";
// import { GetTemplateItemProps } from "@/types/template";

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
      <div className={`test ${classes.test}`}></div>
    </div>
  );
}

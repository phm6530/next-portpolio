"use client";
import { ERROR_CODE, MSG } from "@/codeMsg";
import classes from "./LoginMsg.module.scss";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

export default function LoginMsg({ code }: { code: ERROR_CODE }) {
  const ref = useRef<HTMLDivElement>(null);
  const msg = (code: keyof typeof MSG) => {
    return MSG[code] || "Error";
  };

  useGSAP(() => {
    if (ref.current) {
      // 좌우 흔들림 애니메이션
      gsap.fromTo(
        ref.current,
        { y: 13, autoAlpha: 1 },
        {
          y: 0,
          duration: 0.5,
          ease: "sine.out",
        }
      );
    }
  });

  return (
    <div className={classes.codeMsgContainer}>
      <div ref={ref} className={classes.msg}>
        {" "}
        {msg(ERROR_CODE[code])}
      </div>
    </div>
  );
}

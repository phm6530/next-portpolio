import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import classes from "./AniNumbering.module.scss";

export default function AniNumbering({
  percent,
  maxCnt,
}: {
  percent: number;
  maxCnt: boolean;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { innerHTML: 0 },
        {
          innerHTML: percent,
          duration: 3,
          snap: { innerHTML: 0.1 },
        }
      );
    },
    {
      scope: textRef,
      dependencies: [percent],
    }
  );

  return (
    <div className={`${classes.numbering} ${maxCnt ? classes.max : undefined}`}>
      <span ref={textRef}>0</span>%
    </div>
  );
}

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import classes from "./Aniprogressbar.module.scss";
import AniNumbering from "./AniNumbering";

export default function AniProgressbar({
  maxCnt,
  percent,
}: // trigger,
{
  maxCnt: boolean;
  percent: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      gsapRef.current = gsap.fromTo(
        ref.current,
        {
          width: 1,
        },

        {
          width: `${percent}%`,
          duration: 3,
          background: maxCnt ? "rgb(158 133 219)" : "rgb(219 215 255)",
        }
      );
    },
    {
      scope: ref,
      dependencies: [percent],
    }
  );

  return (
    <div className={classes.ResultBarWrap}>
      <div
        ref={ref}
        key={percent}
        className={`${classes.progressbar} ${maxCnt && classes.maxCnt}`}
      >
        <AniNumbering percent={percent} maxCnt={maxCnt} />
      </div>
    </div>
  );
}

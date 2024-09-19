import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import classes from "./Aniprogressbar.module.scss";

export default function AniProgressbar({
  maxCnt,
  percent,
  trigger,
}: {
  maxCnt: boolean;
  percent: number;
  trigger: (string | number)[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.core.Tween | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { innerHTML: 0 },
        {
          innerHTML: percent,
          duration: 2,
          snap: { innerHTML: 1 },
          color: maxCnt ? `#7b6de7` : `#bfbfbf`,
        }
      );
    },
    { scope: textRef, dependencies: [...trigger] }
  );

  useGSAP(
    () => {
      gsapRef.current = gsap.fromTo(
        ref.current,
        {
          width: 1,
          background: `#bfbfbf`,
        },

        {
          width: `${percent === 0 ? 1 : percent}%`,
          duration: 2,
          background: maxCnt ? `#7b6de7` : `#bfbfbf`,
        }
      );
    },
    { scope: ref, dependencies: [percent, ...trigger] }
  );

  // useEffect(() => {
  //   if (gsapRef.current) {
  //     // percent가 변경될 때마다 애니메이션을 다시 실행
  //     gsapRef.current.kill(); // 기존 애니메이션을 제거
  //     gsapRef.current = gsap.fromTo(
  //       ref.current,
  //       { x: "0%" }, // 항상 0%에서 시작
  //       {
  //         x: `${percent}%`,
  //         duration: 2,
  //       }
  //     );
  //   }
  // }, [percent]);

  return (
    <div
      ref={ref}
      className={`${classes.progressbar} ${maxCnt && classes.maxCnt}`}
    >
      <div className={classes.percentText}>
        <span ref={textRef}>0</span>%
      </div>
    </div>
  );
}

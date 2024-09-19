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

  useGSAP(
    () => {
      gsapRef.current = gsap.fromTo(
        ref.current,
        {
          width: 0,
          background: `#d7e2ff`,
        },

        {
          width: `${percent}%`,
          duration: 2,
          background: maxCnt ? `#7b6de7` : `#d7e2ff`,
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
    ></div>
  );
}

import AniProgressbar from "@/app/_components/animation/AniProgressbar";
import classes from "./SurveyResultBar.module.scss";
import Crown from "/public/asset/icon/crown.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function SurveyResultBar({
  triggerContents, // gsap 갱신하려고 만든거
  label,
  curCnt,
  allCnt,
  maxCnt,
}: {
  triggerContents: (string | number)[];
  label: string;
  curCnt: number;
  allCnt: number;
  maxCnt: boolean;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { innerHTML: 0 },
        {
          innerHTML: (curCnt / allCnt) * 100,
          duration: 2,
          snap: { innerHTML: 1 },
        }
      );
    },
    { scope: textRef, dependencies: [...triggerContents] }
  );

  const percent = (curCnt / allCnt) * 100;

  return (
    <div className={classes.ResultBarWrap}>
      <div className={`${classes.label} ${maxCnt && classes.maxCntColor}`}>
        {maxCnt && <Crown />} {label}
      </div>
      <span className={classes.curCnt}>{curCnt}명</span>
      <div className={classes.perCent}>
        <span ref={textRef}></span>%
      </div>
      <AniProgressbar
        maxCnt={maxCnt}
        percent={percent}
        trigger={triggerContents}
      />
    </div>
  );
}

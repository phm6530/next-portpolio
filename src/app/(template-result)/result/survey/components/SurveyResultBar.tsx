import AniProgressbar from "@/components/animation/AniProgressbar";
import classes from "./SurveyResultBar.module.scss";

export default function SurveyResultBar({
  // triggerContents, // gsap 갱신하려고 만든거
  curCnt,
  allCnt,
  maxCnt,
}: {
  // triggerContents: (string | number)[];
  curCnt: number;
  allCnt: number;
  maxCnt: boolean;
}) {
  const percent = (curCnt / allCnt) * 100;

  return (
    <div className={classes.ResultBarWrap}>
      {/* <span className={classes.curCnt}>{curCnt}명</span> */}
      {/* <div className={classes.perCent}>
        <span ref={textRef}></span>%
      </div> */}
      <AniProgressbar
        maxCnt={maxCnt}
        percent={percent}
        // trigger={triggerContents}
      />
    </div>
  );
}

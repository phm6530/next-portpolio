import { useGSAP } from "@gsap/react";
import classes from "./GenderChart.module.scss";
import gsap from "gsap";
import { useRef } from "react";
// import Male from "/public/asset/icon/male1.svg";
import Female from "/public/asset/icon/female2.svg";
import Male from "/public/asset/icon/male2.svg";

import Image from "next/image";

export default function GenderChart({
  maleCnt,
  femaleCnt,
}: {
  maleCnt: number;
  femaleCnt: number;
}) {
  const chartWrapper = useRef<HTMLDivElement>(null);

  const total = maleCnt + femaleCnt;
  const percent = (cnt: number) => {
    const result = total > 0 ? (cnt / total) * 100 : 0;
    return result.toFixed(2);
  };

  useGSAP(
    () => {
      gsap.to(`.${classes.male}`, {
        width: `${percent(maleCnt)}%`,
        duration: 3,
      });

      gsap.to(`.${classes.female}`, {
        width: `${percent(femaleCnt)}%`,
        duration: 3,
      });
    },
    {
      scope: chartWrapper,
    }
  );

  return (
    <div className={classes.chartWrapper} ref={chartWrapper}>
      <div className={classes.chartTitle}>
        성별 참여도 / <span>총 참여자 : {total}명</span>
      </div>

      {/* {total} */}
      <div className={classes.chartItem}>
        <Male />
        <div className={classes.prograssBar}>
          <div className={classes.male}></div>
        </div>
        <div className={classes.cnt}>{percent(maleCnt)}%</div>
      </div>

      <div className={classes.chartItem}>
        <Female />
        <div className={classes.prograssBar}>
          <div className={classes.female}></div>
        </div>
        <div className={classes.cnt}>{percent(femaleCnt)}%</div>
      </div>
    </div>
  );
}

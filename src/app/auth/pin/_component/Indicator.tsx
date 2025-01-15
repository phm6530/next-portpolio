"use client";
import classes from "./indicator.module.scss";

export default function Indicator({ step }: { step: number }) {
  const stepCnt = [...Array(3)];

  return (
    <div className={classes.indicatorWrapper}>
      {stepCnt.map((_, idx) => {
        return (
          <span
            key={`indicator-${idx}`}
            className={idx + 1 <= step ? classes.active : undefined}
          />
        );
      })}
    </div>
  );
}

"use client";

import { ReactNode, useEffect, useRef } from "react";
import classes from "./TalkTooltip.module.scss";

export default function TalkTooltip({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const target = ref.current.querySelector(".tooltip") as HTMLDivElement;
      if (target) {
        target.className = classes.tooltip;
      }
    }
  }, []);

  return (
    <div className={classes.tooltipContainer} ref={ref}>
      {children}
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import classes from "./PinTimer.module.scss";

export default function PinTimer({
  countDown = 300,
  timeout,
}: {
  countDown?: number;
  timeout: () => void;
}) {
  const [countdown, setCountdown] = useState<number>(countDown);
  const endTime = useRef<number>(Date.now() + countDown * 1000); // 종료 시각 계산

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = Math.max(
        0,
        Math.floor((endTime.current - Date.now()) / 1000)
      );

      setCountdown(remainingTime);

      if (remainingTime === 0) {
        timeout();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.timer}>
      남은 시간:{" "}
      <span>
        {Math.floor(countdown / 60)}분 {countdown % 60}초
      </span>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import classes from "./PinTimer.module.scss";
import { TimerIcon } from "lucide-react";

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
  }, [timeout]);

  return (
    <div className="flex gap-3 items-center mt-5">
      인증 유효 시간
      <span className="flex">
        <TimerIcon />
        {Math.floor(countdown / 60)}분 {countdown % 60}초
      </span>
    </div>
  );
}

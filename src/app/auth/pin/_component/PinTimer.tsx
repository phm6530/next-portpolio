import React, { useState, useEffect, useRef } from "react";

export default function PinTimer({ countDown = 300 }: { countDown: number }) {
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
        clearInterval(timer); // 타이머 중지
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      Pin Timer {Math.floor(countdown / 60)}분 {countdown % 60}초
    </>
  );
}

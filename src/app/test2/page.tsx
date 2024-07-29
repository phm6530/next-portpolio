"use client";

import { useState } from "react";
import "./style.scss";
import gsap from "gsap";

export default function Page() {
  const colors = ["#0ae448", "#ff8709", "#9d95ff", "#00bae2"];
  const [targetIdx, setTargetIdx] = useState<string | null>(null);

  // 배열 생성
  const arr = [...Array(5)].fill("");

  const onCompleteFn = (idx: number) => {
    setTargetIdx(`${idx}를 완료했습니다.`);
  };

  const onStartFn = (idx: number) => {
    setTargetIdx(`${idx}를 실행중입니다.`);
  };

  const RandomRotation = () => {
    const rotationArr = [90, 180, 360, 720];
    const idx = Math.ceil(Math.random() * 4) - 1;
    return rotationArr[idx];
  };

  const animationHandler = (
    idx: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const target = e.currentTarget;

    gsap.to(target, {
      keyframes: {
        "15%": { y: -200, ease: "power1.out" },
        "30%": { rotation: RandomRotation },
        "100%": { y: 0, ease: "bounce.out" },
      },
      onComplete: onCompleteFn,
      onCompleteParams: [idx],
      onStart: () => onStartFn(idx),
      duration: 2,
    });
  };

  return (
    <>
      <div className="wrapper">
        {targetIdx && <h1>{targetIdx}</h1>}
        <div className="boxArea">
          {arr.map((_, idx) => (
            <div
              className="box-item"
              key={idx}
              style={{ backgroundColor: colors[idx % colors.length] }}
              onClick={(e) => animationHandler(idx + 1, e)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

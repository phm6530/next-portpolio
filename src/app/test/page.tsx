"use client";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import "./test.scss";

export default function Page() {
  const gsapScopeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween[] | null>(null);

  const arr = [...Array(10)].map((_, idx) => idx);

  const { contextSafe } = useGSAP(
    () => {
      // 각각의 .hi 요소에 대해 개별적으로 애니메이션 설정
      const animations = gsap.utils
        .toArray<HTMLElement>(".hi")
        .map((el, idx) => {
          return gsap.to(el, {
            backgroundColor: "blue",
            y: 400,
            yoyo: true,
            ease: "bounce.out",
            delay: Math.random(), // 0초에서 1초 사이의 랜덤 지연 시간
            repeat: -1,
            duration: 2,
          });
        });

      tweenRef.current = animations;
    },
    { scope: gsapScopeRef } // 스코프지정
  );

  const handlePause = contextSafe(() => {
    if (tweenRef.current) {
      tweenRef.current.forEach((item) =>
        gsap.to(item, { timeScale: 0, duration: 0.5 })
      );
    }
  });

  const handlePlay = contextSafe(() => {
    if (tweenRef.current) {
      tweenRef.current.forEach((item) =>
        gsap.to(item, { timeScale: 1, duration: 0.5 })
      );
    }
  });

  return (
    <>
      <div className="wrap" ref={gsapScopeRef}>
        {arr.map((_, idx) => (
          <div key={`key-${idx}`} className="hi"></div>
        ))}
      </div>
      <div className="btnArea">
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Play</button>
      </div>
    </>
  );
}

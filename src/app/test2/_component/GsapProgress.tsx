"use client";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";
import "./progress.scss";

export default function GsapProgress() {
  const [range, setRange] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const animaiton = gsap.to(".boxs", {
        width: `100%`,
        background: "red",
        duration: 3,
        ease: "power4.inOut",
        onUpdate: updateFn,
      });
      animationRef.current = animaiton;
    },
    { scope: ".wrappers" }
  );

  const updateFn = () => {
    const num = +animationRef.current!.progress().toFixed(2);

    if (typeof num === "number") {
      setRange(num * 100);
    }
  };

  const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ref = animationRef.current;
    ref?.pause();
    ref?.progress(+e.target.value / 100);
  };

  const toggleHandler = () => {
    const gsapRef = animationRef.current;
    gsapRef?.paused(!gsapRef?.paused());
  };

  return (
    <>
      <div className="wrappers">
        <div className="boxs" ref={boxRef}></div>
      </div>
      {range} %
      <input type="range" value={range} onChange={rangeHandler} />
      <button onClick={toggleHandler}>Toggle</button>
    </>
  );
}

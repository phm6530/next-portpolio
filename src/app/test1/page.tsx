"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./styles.scss";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const Perents = ref.current?.offsetHeight;

      if (Perents) {
        gsap.set(".boxes-clone", { y: `-=${Perents}` });

        gsap.fromTo(
          ".boxes",
          { y: `-${Perents}` },
          {
            duration: 3,
            ease: "none",
            y: `+=${Perents}`,
            repeat: -1,
          }
        );

        gsap.fromTo(
          ".boxes-clone",
          { y: `-${Perents}` },
          {
            duration: 3,
            ease: "none",
            y: `+=${Perents}`,
            repeat: -1,
            delay: 3,
          }
        );
      }
    },
    { scope: ".wrapper" }
  );

  return (
    <>
      <div
        className="wrapper"
        ref={ref}
        style={{ position: "relative", overflow: "hidden", height: "100vh" }}
      >
        <div className="boxes">
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
        </div>

        <div className="boxes-clone">
          <div className="box" style={{ background: "red" }}>
            1-clone...
          </div>
          <div className="box">2-clone...</div>
          <div className="box">3-clone...</div>
        </div>
      </div>
    </>
  );
}

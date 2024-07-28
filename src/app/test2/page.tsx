"use client";

import gsap from "gsap";
import "./style.scss";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);
  var colors = ["#0ae448", "#ff8709", "#9d95ff", "#00bae2"];

  useGSAP(() => {
    const width = ref.current?.offsetWidth;
    const boxes = ref.current?.querySelectorAll(".box");

    console.log(width);

    gsap.set(".box", {
      backgroundColor: (i) => colors[i % colors.length],
      x: (i) => i * 50,
    });

    gsap.to(".box", {
      duration: 5,
      ease: "none",
      x: "+=500", //move each box 500px to right
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % 500), //force x value to be between 0 and 500 using modulus
      },
      repeat: -1,
    });
  });

  return (
    <>
      <label>
        <input type="checkbox" name="overflow" id="overflow" value="1" /> Show
        overflow
      </label>

      <div className="wrapper" ref={ref}>
        <div className="boxes">
          <div className="box">1</div>
          <div className="box">2</div>
          <div className="box">3</div>
          <div className="box">4</div>
          <div className="box">5</div>
          <div className="box">6</div>
          <div className="box">7</div>
          <div className="box">8</div>
          <div className="box">9</div>
          <div className="box">10</div>
        </div>
      </div>
    </>
  );
}

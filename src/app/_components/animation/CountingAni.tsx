"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function CountingAni() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      {
        innerHTML: 0,
      },
      {
        innerHTML: 50,
        duration: 3,
        snap: { innerHTML: 1 },
        ease: "power4.out",
      }
    );
  });

  return (
    <>
      <div ref={ref}></div>
    </>
  );
}

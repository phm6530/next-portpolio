"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useRef } from "react";
import "./mainGsap.scss";

export default function MainGsap({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = ref.current;
      if (wrap) {
        const tl = gsap.timeline({ defaults: { opacity: 0 } });
        tl.from(wrap, { autoAlpha: 0 });
        tl.fromTo(
          ".title",
          { x: -100 },
          {
            x: 0,
            ease: "power4.inOut",
            duration: 1.4,
            opacity: 1,
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="wrap">
      {children}
    </div>
  );
}

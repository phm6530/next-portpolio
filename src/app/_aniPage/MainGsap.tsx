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
        const chars = document.querySelectorAll(".char");
        gsap.set(".title", { autoAlpha: 1 });
        gsap.set(".test", { autoAlpha: 1 });

        const tl = gsap.timeline();
        tl.from(chars, {
          ease: "power4.out",
          y: -50,

          opacity: 0,
          stagger: 0.05,
        });
      }
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}

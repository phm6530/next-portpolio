"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useRef } from "react";

export default function MainGsap({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = ref.current;
      if (wrap) {
        gsap.fromTo(
          ".title",
          { x: -100, opacity: 0 },
          { x: 0, ease: "power4.inOut", duration: 1.4, opacity: 1 }
        );
      }
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}

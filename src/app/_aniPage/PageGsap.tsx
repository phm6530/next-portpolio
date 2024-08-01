"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useRef } from "react";

export default function PageGsap({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (ref.current) {
        gsap.set(".tester", { autoAlpha: 1 });

        gsap.from(".tester", {
          y: 100,
          duration: 1,
          stagger: 0.07,
          opacity: 0,
          ease: "power3.out",
        });
      }
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}

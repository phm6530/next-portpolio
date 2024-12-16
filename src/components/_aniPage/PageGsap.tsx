"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSearchParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function PageGsap({
  page,
  children,
}: {
  page: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const params = useSearchParams();
  //파라미터 전부 의존
  const allParams = Object.fromEntries(params.entries());

  useGSAP(
    () => {
      if (ref.current) {
        const tests = ref.current.querySelectorAll(".box");

        gsap.defaults({ ease: "power3" });
        gsap.set(tests, { y: 100, opacity: 0 });

        ScrollTrigger.batch(tests, {
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              overwrite: true,
              ease: "back.inOut",
            }),
          onLeave: (batch) =>
            gsap.set(batch, {
              opacity: 0, y: -100, overwrite: true 
            }),
          start: "top 90%",
        });
      }
    },
    { scope: ref, dependencies: [allParams] }
  );

  return <div ref={ref}>{children}</div>;
}

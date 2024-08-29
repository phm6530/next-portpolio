"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PageGsap({
  page,
  children,
}: {
  page: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const refs = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (ref.current) {
        const tests = ref.current.querySelectorAll(".box");
        gsap.defaults({ ease: "power3" });
        gsap.set(tests, { y: 100 });

        ScrollTrigger.batch(tests, {
          //interval: 0.1, // time window (in seconds) for batching to occur.
          //batchMax: 3,   // maximum batch size (targets)
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              overwrite: true,
            }),
          onLeave: (batch) =>
            gsap.set(batch, { opacity: 0, y: -100, overwrite: true }),
          onEnterBack: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              overwrite: true,
            }),
          onLeaveBack: (batch) =>
            gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
          // you can also define things like start, end, etc.
        });
      }
    },
    { scope: ref, dependencies: [page] }
  );

  return <div ref={ref}>{children}</div>;
}

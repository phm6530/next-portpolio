"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useEffect, useRef } from "react";

export default function PageGsap({
  page,
  children,
}: {
  page: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const refs = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    refs.current?.restart();
  }, [page, refs]);

  useGSAP(
    () => {
      if (ref.current) {
        gsap.set(".autoAlpha", { autoAlpha: 1 });

        const test = gsap.from(".tester", {
          y: 100,
          duration: 1,
          stagger: 0.07,
          opacity: 0,
          ease: "power3.out",
        });

        refs.current = test;
      }
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}

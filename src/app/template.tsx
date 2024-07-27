"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  // const ref = useRef<HTMLDivElement>(null);

  // const pathname = usePathname();
  // console.log(pathname);

  // useLayoutEffect(() => {
  //   gsap.fromTo(
  //     ref.current,
  //     { y: 50, opacity: 0 }, // 시작 상태
  //     { y: 0, opacity: 1, duration: 1, ease: "power1.inOut" } // 끝 상태
  //   );
  // }, []);

  return <div>{children}</div>;
}

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function AniNumbering({
  percent,
  maxCnt,
}: {
  percent: number;
  maxCnt: boolean;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        textRef.current,
        { innerHTML: 0 },
        {
          innerHTML: percent,
          duration: 3,
          snap: { innerHTML: 0.1 },
        }
      );
    },
    {
      scope: textRef,
      dependencies: [percent],
    }
  );

  return (
    <div
      className={cn(`text-sm absolute right-0`, maxCnt && "text-point")}
      style={{ left: "calc(100% + 10px)" }}
    >
      <span ref={textRef}>0</span>%
    </div>
  );
}

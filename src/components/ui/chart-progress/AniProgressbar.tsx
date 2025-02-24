import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import AniNumbering from "./AniNumbering";
import { cn } from "@/lib/utils";

export default function AniProgressbar({
  maxCnt,
  percent,
}: // trigger,
{
  maxCnt: boolean;
  percent: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      gsapRef.current = gsap.fromTo(
        ref.current,
        {
          width: 1,
        },

        {
          width: `${percent}%`,
          duration: 3,
          background: maxCnt ? "rgb(158 133 219)" : "rgb(219 215 255)",
        }
      );
    },
    {
      scope: ref,
      dependencies: [percent],
    }
  );

  return (
    <div className="relative h-6 rounded-full">
      <div
        ref={ref}
        key={percent}
        className={cn(
          `w-2 h-full left-0 rounded-full absolute bg-background `,
          maxCnt && "text-foreground"
        )}
      >
        <AniNumbering percent={percent} maxCnt={maxCnt} />
      </div>
    </div>
  );
}

"use client";
import { ERROR_CODE, MSG } from "@/codeMsg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MessageAlert({ code }: { code: ERROR_CODE }) {
  const ref = useRef<HTMLDivElement>(null);
  const msg = (code: keyof typeof MSG) => {
    return MSG[code] || "Error";
  };

  useGSAP(() => {
    if (ref.current) {
      // 좌우 흔들림 애니메이션
      gsap.fromTo(
        ref.current,
        { y: 13, autoAlpha: 1 },
        {
          y: 0,
          duration: 0.5,
          ease: "sine.out",
        }
      );
    }
  });

  return (
    <div className="animate-fadein">
      <Alert variant={"destructive"}>
        <TriangleAlert className="h-4 w-4 animate-bounce" />
        <AlertTitle>{code}</AlertTitle>
        <AlertDescription>{msg(ERROR_CODE[code])}</AlertDescription>
      </Alert>
    </div>
  );
}

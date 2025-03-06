"use client";
import { cn } from "@/lib/utils";

export default function Indicator({ step }: { step: number }) {
  const stepCnt = [...Array(3)];

  return (
    <div className="h-1 flex gap-1 max-w-[60px] mt-4">
      {stepCnt.map((_, idx) => {
        return (
          <span
            key={`indicator-${idx}`}
            className={cn(
              "flex-1 rounded-sm transition-all duration-500 ease-in-out bg-purple-200/50 ",
              idx + 1 <= step && "bg-purple-400"
            )}
          />
        );
      })}
    </div>
  );
}

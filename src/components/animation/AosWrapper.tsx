"use client";
import useAOS from "@/_hook/usAOS";
import { ReactNode } from "react";

export default function AosWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  useAOS({ preserveClass: true });
  return (
    <div
      className={`${className ? className : undefined} aos-hidden`}
    >
      {children}
    </div>
  );
}

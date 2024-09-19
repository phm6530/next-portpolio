"use client";

import { ReactNode } from "react";

export default function NotYet({ children }: { children: ReactNode }) {
  const onNotYetHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    alert("아직");
    return;
  };

  return (
    <div style={{ display: "inline-block" }} onClick={onNotYetHandler}>
      {children}
    </div>
  );
}

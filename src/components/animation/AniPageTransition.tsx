"use client";
import { ReactNode, useEffect, useState } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const [displayChdilren, setDisplayChildren] = useState(children);

  useEffect(() => {
    const test = setTimeout(() => {
      setDisplayChildren(children);
    }, 5000);

    return () => {
      clearTimeout(test);
    };
  }, [children]);

  return <>{displayChdilren}</>;
}

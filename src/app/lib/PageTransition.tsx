"use client";
import { ReactNode, useEffect, useState } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const [displayChdilren, setDisplayChildren] = useState(children);

  console.log(displayChdilren);

  useEffect(() => {
    console.log("전");

    const test = setTimeout(() => {
      console.log("변경");
      setDisplayChildren(children);
    }, 5000);

    return () => {
      clearTimeout(test);
    };
  }, [children]);

  return <>{displayChdilren}</>;
}

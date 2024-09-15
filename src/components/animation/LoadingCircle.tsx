import { useGSAP } from "@gsap/react";
import classes from "./loadingCircle.module.scss";
import { useRef } from "react";

export default function LoadingCircle() {
  const gsapRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      // console.log(gsapRef.current);
    },
    { scope: gsapRef, dependencies: [gsapRef] }
  );

  return (
    <div ref={gsapRef} className={classes.LoadingCircleWrap}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

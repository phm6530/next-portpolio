"use client";
import { useGSAP } from "@gsap/react";
import classes from "./LoadingStreming.module.scss";
import UiLoading from "../ui/loading/UiLoading";

export default function LoadingStreming(){
  useGSAP({});
  return (
    <div className={classes.loading}>
      <UiLoading/>
    </div>
  );
}
"use client";
import classes from "./LoadingStreming.module.scss";
import UiLoading from "../ui/loading/UiLoading";

export default function LoadingStreming() {
  return (
    <div className={classes.loading}>
      <UiLoading />
    </div>
  );
}

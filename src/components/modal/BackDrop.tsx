import { HTMLAttributes } from "react";
import classes from "./BackDrop.module.scss";

export default function BackDrop(props?: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={classes.backDropStyle}></div>;
}

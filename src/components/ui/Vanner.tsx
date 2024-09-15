import { ReactNode } from "react";
import classes from "./vanner.module.scss";

export default function Vanner({ children }: { children: ReactNode }) {
  return <div className={classes.vannerContainer}>{children}</div>;
}

import { ReactNode } from "react";
import classes from "./OptionContainer.module.scss";

export default function OptionContainer({ children }: { children: ReactNode }) {
  return <div className={classes.container}>{children}</div>;
}

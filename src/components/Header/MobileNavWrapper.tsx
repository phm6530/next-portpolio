import { ReactNode } from "react";
import classes from "./MobileNavWrapper.module.scss";

export default function MobileNavWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={classes.mobileWrapper}>{children}</div>;
}

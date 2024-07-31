import { ReactNode } from "react";
import classes from "./PageTitle.module.scss";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={classes.pageTitleText}>{children}</div>
    </>
  );
}

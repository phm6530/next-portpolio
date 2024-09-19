import { ReactNode } from "react";
import classes from "./RadioWrap.module.scss";

type Props = { children: ReactNode };

const RadioWrap: React.FC<Props> = ({ children }) => {
  return <div className={classes.RadioWrap}>{children}</div>;
};

export default RadioWrap;

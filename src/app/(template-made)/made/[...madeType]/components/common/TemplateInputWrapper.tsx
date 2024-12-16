import { ReactNode } from "react";
import classes from "./TemplateInputWrapper.module.scss";

export default function TemplateInputWrapper({ title, children } : {
  title? :string;
  children : ReactNode
}){
  return (
    <div className={classes.wrapper}>
      {title}
      {children}
    </div>
  );
}
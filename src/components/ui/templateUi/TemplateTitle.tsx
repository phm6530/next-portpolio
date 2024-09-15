import classes from "./TemplateTitle.module.scss";
export default function TemplateTitle({ children }: { children: string }) {
  return <div className={classes.templateTitle}>{children}</div>;
}

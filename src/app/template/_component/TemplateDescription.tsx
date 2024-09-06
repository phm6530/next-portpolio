import classes from "./TemplateDescription.module.scss";

export default function TemplateDescription({
  description,
}: {
  description: string;
}) {
  return <div className={classes.descriptionWrapper}>{description}</div>;
}

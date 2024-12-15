import classes from "./FormToolButton.module.scss";

export default function FormToolButton({
  clickEvent,
  Svg,
  children,
}: {
  clickEvent: () => any;
  Svg: React.ComponentType;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={clickEvent}
      className={classes.formToolbutton}
    >
      {/* svg Icon */}
      <Svg /> {children}
    </button>
  );
}

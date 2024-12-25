import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import classes from "./FormToolButton.module.scss";

export default function FormToolButton({
  clickEvent,
  Svg,
  children,
  className,
  ...rest
}: {
  clickEvent: () => any;
  Svg?: React.ComponentType;
  className?: string;
  children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={clickEvent}
      className={`${classes.formToolbutton} ${
        className ? className : undefined
      }`}
    >
      {/* svg Icon */}
      {Svg && <Svg />} {children}
    </button>
  );
}

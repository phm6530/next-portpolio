import { ButtonHTMLAttributes } from "react";
import classes from "./OptionButton.module.scss";

export default function OptionButton({
  Svg,
  alt,
  ...rest
}: {
  Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  alt: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...rest} className={classes.buttonWrapper}>
      <Svg>
        <desc>{alt}</desc>
      </Svg>
    </button>
  );
}

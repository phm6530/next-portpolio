import { ComponentType, SVGProps } from "react";
import classes from "./IconLabel.module.scss";
import { cn } from "@/lib/utils";

type IconLabelProps = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: string;
  className?: string;
};

const IconLabel: React.FC<IconLabelProps> = ({ Icon, children, className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className={classes.iconWrap}>
        <Icon />
      </div>
      {children}
    </div>
  );
};

export default IconLabel;

import { ComponentType, SVGProps } from "react";
import classes from "./IconLabel.module.scss";

type IconLabelProps = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: string;
};

const IconLabel: React.FC<IconLabelProps> = ({ Icon, children }) => {
  return (
    <div className={classes.wrap}>
      <div className={classes.iconWrap}>
        <Icon />
      </div>
      {children}
    </div>
  );
};

export default IconLabel;

import { ReactNode } from "react";
import classes from "./Grid.module.scss";

type Children<T> = { className?: string; children: T };

//가운데 Grid
const center: React.FC<Children<ReactNode>> = ({ className, children }) => {
  return (
    <div
      className={`${classes.GridCenter} ${className ? className : undefined}`}
    >
      {children}
    </div>
  );
};

const smallCenter: React.FC<Children<ReactNode>> = ({ children }) => {
  return <div className={classes.GridSmallCenter}>{children}</div>;
};

const extraSmall: React.FC<Children<ReactNode>> = ({ className, children }) => {
  return (
    <div
      className={`${classes.ExtraSmall} ${className ? className : undefined}`}
    >
      {children}
    </div>
  );
};

interface GridComponent extends React.FC<{ children: ReactNode }> {
  center: typeof center;
  smallCenter: typeof smallCenter;
  extraSmall: typeof extraSmall;
}

// Default
const Grid: GridComponent = ({ children }) => {
  return <>{children}</>;
};

// Grid.center에 center 함수 할당
Grid.center = center;
Grid.smallCenter = smallCenter;
Grid.extraSmall = extraSmall;

export default Grid;

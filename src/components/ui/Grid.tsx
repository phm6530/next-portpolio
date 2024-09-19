import { ReactNode } from "react";
import classes from "./Grid.module.scss";

//가운데 정렬
function center({ children }: { children: ReactNode }) {
  return <div className={classes.GridCenter}>{children}</div>;
}

function smallCenter({ children }: { children: ReactNode }) {
  return <div className={classes.GridSmallCenter}>{children}</div>;
}

function extraSmall({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`${classes.ExtraSmall} ${className ? className : undefined}`}
    >
      {children}
    </div>
  );
}

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
Grid.smallCenter = smallCenter;
Grid.center = center;
Grid.extraSmall = extraSmall;

export default Grid;

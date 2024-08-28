import { ReactNode } from "react";
import classes from "./Grid.module.scss";

//가운데 정렬
function center({ children }: { children: ReactNode }) {
  return <div className={classes.GridCenter}>{children}</div>;
}

interface GridComponent extends React.FC<{ children: ReactNode }> {
  center: typeof center;
}

// Default
const Grid: GridComponent = ({ children }) => {
  return <>{children}</>;
};

// Grid.center에 center 함수 할당
Grid.center = center;

export default Grid;

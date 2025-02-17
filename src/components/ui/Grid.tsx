import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Children<T> = { className?: string; children: T };

//가운데 Grid
const center: React.FC<Children<ReactNode>> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "max-w-[900px] items-center  mx-auto w-calc-grid",
        className
      )}
    >
      {children}
    </div>
  );
};

const smallCenter: React.FC<Children<ReactNode>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn("gird-default min-h-calc-screen  max-w-[700px]", className)}
    >
      {children}
    </div>
  );
};

const extraSmall: React.FC<Children<ReactNode>> = ({ className, children }) => {
  return (
    <div
      className={cn("gird-default min-h-calc-screen max-w-[400px]", className)}
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

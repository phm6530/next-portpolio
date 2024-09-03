import { ReactNode } from "react";
import classes from "./UserMarker.module.scss";
import AnonymousIcon from "/public/asset/icon/anonymous.svg";

//Master Icon
const Master = () => {
  return <div className={classes.masterIcon}>M</div>;
};
//anonymonus
const anonymonus = () => {
  return (
    <div className={classes.anonymousIcon}>
      <AnonymousIcon />
    </div>
  );
};

type UserMarkerProps = {
  Master: typeof Master;
  anonymonus: typeof anonymonus;
};

const UserMarker: React.FC<{ children: ReactNode }> & UserMarkerProps = ({
  children,
}) => {
  return <>{children}</>;
};

UserMarker.Master = Master;
UserMarker.anonymonus = anonymonus;

export default UserMarker;

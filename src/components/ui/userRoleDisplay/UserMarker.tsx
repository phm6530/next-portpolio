import { ReactNode } from "react";
import AnonymousIcon from "/public/asset/icon/anonymous.svg";
import { User } from "lucide-react";

const Master = () => {
  return (
    <div className="mr-1 text-[10px] w-4 h-4 flex justify-center rounded-sm items-center bg-purple-700 text-white">
      M
    </div>
  );
};
//anonymonus
const Member = () => {
  return (
    <div className="text-[10px] relative bg-slate-500 w-4 h-4 flex justify-center rounded-sm items-center">
      <AnonymousIcon />
    </div>
  );
};

const anonymonus = () => {
  return (
    <div className="text-[10px] relative border border-foreground/20 bg-slate-500/30 w-4 h-4 flex justify-center rounded-sm items-center">
      <User />
    </div>
  );
};

type UserMarkerProps = {
  Master: typeof Master;
  Member: typeof Member;
  anonymonus: typeof anonymonus;
};

const UserMarker: React.FC<{ children: ReactNode }> & UserMarkerProps = ({
  children,
}) => {
  return <>{children}</>;
};

UserMarker.Master = Master;
UserMarker.anonymonus = anonymonus;
UserMarker.Member = Member;

export default UserMarker;

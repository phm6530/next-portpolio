import UserMarker from "@/app/_components/ui/usericon/UserMarker";
import classes from "./UserRoleDisplay.module.scss";
import { user_role } from "@/types/user";

export default function UserRoleDisplay({
  user_nickname,
  user_role,
}: {
  user_nickname: string;
  user_role: user_role;
}) {
  return (
    <div className={classes.userDisplayContainer}>
      {user_role === "admin" && <UserMarker.Master />}
      {user_role === "anonymous" && <UserMarker.anonymonus />}
      {user_nickname === "anonymous" ? "익명" : user_nickname}
    </div>
  );
}

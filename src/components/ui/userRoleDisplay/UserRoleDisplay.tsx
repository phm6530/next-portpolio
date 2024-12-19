import UserMarker from "../usericon/UserMarker";
import classes from "./UserRoleDisplay.module.scss";
import { User, USER_ROLE } from "@/types/auth.type";

export default function UserRoleDisplay({
  role,
  nickname,
}: {
  role?: USER_ROLE;
  nickname: string | null;
}) {
  return (
    <div className={classes.userDisplayContainer}>
      {/* Icon 임의로 반영함 */}
      {role === USER_ROLE.user && <UserMarker.anonymonus />}
      {role === USER_ROLE.anonymous && <UserMarker.anonymonus />}
      {role === "admin" && <UserMarker.Master />}

      {/* 닉네임 */}
      <div className={classes.nickName}>{nickname}</div>
    </div>
  );
}

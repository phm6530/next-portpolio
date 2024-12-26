import UserMarker from "../usericon/UserMarker";
import classes from "./UserRoleDisplay.module.scss";
import { USER_ROLE } from "@/types/auth.type";

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
      {role === USER_ROLE.USER && <UserMarker.anonymonus />}
      {role === USER_ROLE.ANONYMOUS && <UserMarker.anonymonus />}
      {role === "admin" && <UserMarker.Master />}

      {/* 닉네임 */}
      <div className={classes.nickName}>{nickname}</div>
    </div>
  );
}

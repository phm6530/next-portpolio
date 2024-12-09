import UserMarker from "../usericon/UserMarker";
import classes from "./UserRoleDisplay.module.scss";
import { User, USER_ROLE } from "@/types/auth.type";

export default function UserRoleDisplay({
  user,
  anonymousNickName,
}: {
  user: User | null;
  anonymousNickName: string | null;
}) {

  //유저면 role반환 아니면 익명
  const role = user ? (user.role as Exclude<USER_ROLE, USER_ROLE.anonymous>) : USER_ROLE.anonymous;

  return (
    <div className={classes.userDisplayContainer}>

      {/* Icon 임의로 반영함 */}
      {role === USER_ROLE.user && <UserMarker.anonymonus />}
      {role === USER_ROLE.anonymous && <UserMarker.anonymonus />}
      {role === "admin" && <UserMarker.Master />}

      {/* 닉네임 */}
      <div className={classes.nickName}>
        {role === USER_ROLE.user && user?.nickname}
        {role === USER_ROLE.anonymous && anonymousNickName}
        {role === USER_ROLE.ADMIN && user?.nickname}
      </div>
 
    </div>
  );
}

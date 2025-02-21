import UserRoleDisplay from "@/components/layout/userRoleDisplay/UserRoleDisplay";
import { USER_ROLE } from "@/types/auth.type";
import classes from "./BoardCreatorUser.module.scss";

export default function BoardCreatorUser({
  role,
  nickname,
}: {
  role?: USER_ROLE;
  nickname: string | null;
}) {
  return (
    <div className={classes.CreatorWrapper}>
      <UserRoleDisplay role={role} nickname={nickname} />
    </div>
  );
}

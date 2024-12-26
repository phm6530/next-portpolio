import { USER_ROLE } from "@/types/auth.type";
import UserRoleDisplay from "../userRoleDisplay/UserRoleDisplay";
import classes from "./TemplateTitle.module.scss";
export default function TemplateTitle({
  role,
  nickname,
  children,
}: {
  role: USER_ROLE;
  nickname: string;
  children: string;
}) {
  return (
    <div className={classes.templateTitle}>
      <div className={classes.title}>{children}</div>

      <UserRoleDisplay role={role} nickname={nickname} />
    </div>
  );
}

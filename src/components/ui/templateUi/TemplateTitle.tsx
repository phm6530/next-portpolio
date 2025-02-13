import { USER_ROLE } from "@/types/auth.type";
import UserRoleDisplay from "../../layout/userRoleDisplay/UserRoleDisplay";
import classes from "./TemplateTitle.module.scss";
export default function TemplateTitle({
  allCnt,
  role,
  nickname,
  children,
}: {
  allCnt?: number;
  role: USER_ROLE;
  nickname: string;
  children: string;
}) {
  return (
    <div className={classes.templateTitle}>
      <div className={classes.title}>{children}</div>

      <UserRoleDisplay role={role} nickname={nickname} />
      {allCnt && (
        <div className={classes.resultSummry}>
          <div className={classes.respondentsCnt}>
            <span>참여자 </span>
            <span className={classes.userCnt}>{allCnt || 0}</span> 명
          </div>

          <div>해당</div>
        </div>
      )}
    </div>
  );
}

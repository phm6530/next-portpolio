import UserMarker from "../../ui/usericon/UserMarker";
import { USER_ROLE } from "@/types/auth.type";

export default function UserRoleDisplay({
  role,
  nickname,
}: {
  role?: USER_ROLE;
  nickname: string | null;
}) {
  return (
    <div className="flex gap-1 items-center text-sm mr-2">
      {/* Icon 임의로 반영함 */}
      {role === USER_ROLE.USER && <UserMarker.anonymonus />}
      {role === USER_ROLE.ANONYMOUS && <UserMarker.anonymonus />}
      {role === "admin" && <UserMarker.Master />}

      {/* 닉네임 */}
      <div className="max-w-[100px] mr-3 text-[13px] line-clamp-1 text-muted-foreground ">
        {nickname}
      </div>
    </div>
  );
}

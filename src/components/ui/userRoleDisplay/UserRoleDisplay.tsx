import UserMarker from "./UserMarker";
import { USER_ROLE } from "@/types/auth.type";

export default function UserRoleDisplay({
  role,
  nickname,
}: {
  role?: USER_ROLE;
  nickname: string | null;
}) {
  return (
    <div className="flex gap-1 items-center text-sm justify-center">
      {/* Icon 임의로 반영함 */}
      {role === USER_ROLE.USER && <UserMarker.Member />}
      {role === USER_ROLE.ANONYMOUS && <UserMarker.anonymonus />}
      {role === "admin" && <UserMarker.Master />}

      {/* 닉네임 */}
      <div className="max-w-[150px] text-[13px] line-clamp-1 text-foreground">
        {nickname}
      </div>
    </div>
  );
}

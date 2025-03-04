import { USER_ROLE } from "@/types/auth.type";
import { User2, UserCheck2 } from "lucide-react";
export default function UserRoleDisplay({
  role,
  nickname,
}: {
  role?: USER_ROLE;
  nickname: string | null;
}) {
  return (
    <div className="flex gap-3 items-center">
      {/* Icon 임의로 반영함 */}
      {role === USER_ROLE.USER && (
        <div className="role-icon [&>path]:fill-red-400">
          <UserCheck2 />
        </div>
      )}
      {role === USER_ROLE.ANONYMOUS && (
        <div className="role-icon [&>path]:fill-red-400">
          <User2 />
          {/* <span className=" absolute right-[-3px] text-[8px] bottom-[-3px] rounded-full text-white w-3 h-3 flex items-center justify-center bg-primary">
            <UserCheck/>
          </span> */}
        </div>
      )}
      {role === "admin" && (
        <div className="role-icon relative">
          <UserCheck2 />

          <span className=" absolute right-[-3px] text-[8px] bottom-[-3px] rounded-full text-white w-3 h-3 flex items-center justify-center bg-primary">
            M
          </span>
        </div>
      )}

      {/* 닉네임 */}
      <div className="max-w-[150px] text-[13px] line-clamp-1 text-foreground ">
        {nickname}
      </div>
    </div>
  );
}

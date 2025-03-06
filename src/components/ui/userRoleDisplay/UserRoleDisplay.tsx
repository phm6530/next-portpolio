import { cn } from "@/lib/utils";
import { USER_ROLE } from "@/types/auth.type";
import { User2, UserCheck2 } from "lucide-react";
export default function UserRoleDisplay({
  role,
  nickname,
  size = "md",
}: {
  role?: USER_ROLE;
  nickname: string | null;
  size?: "lg" | "md" | "sm";
}) {
  return (
    <div className="flex gap-3 items-center">
      {/* Icon 임의로 반영함 */}
      <div
        className={cn(
          `role-icon ${role !== "admin" ? "[&>path]:fill-red-400" : ""}`,
          (() => {
            if (size === "sm") {
              return "[&>svg]:w-4 [&>svg]:h-4";
            }
          })()
        )}
      >
        {role === USER_ROLE.ANONYMOUS ? <User2 /> : <UserCheck2 />}

        {role === "admin" && (
          <span className="absolute right-[-3px] text-[8px] bottom-[-3px] rounded-full text-white w-3 h-3 flex items-center justify-center bg-primary">
            M
          </span>
        )}
      </div>

      {/* 닉네임 */}
      <div
        className={cn(
          "max-w-[150px] text-[13px] line-clamp-1 text-foreground",
          (() => {
            if (size === "sm") {
              return "text-[11px] opacity-70";
            }
          })()
        )}
      >
        {nickname}
      </div>
    </div>
  );
}

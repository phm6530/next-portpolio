"use client";

import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import { User } from "@/types/auth.type";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { cn } from "@/lib/utils";

export default function HeaderNavProfile({ classes }: { classes?: string }) {
  const userData = queryClient.getQueryData([QUERY_KEY.USER_DATA]) as User;

  return (
    <>
      <div
        className={cn(
          "text-sm text-right items-center justify-end flex gap-8",
          classes && classes
        )}
      >
        <div className="">
          <UserRoleDisplay role={userData.role} nickname={userData?.nickname} />
        </div>
      </div>
    </>
  );
}

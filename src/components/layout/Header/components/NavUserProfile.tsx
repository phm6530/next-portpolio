"use client";

import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import classes from "./NavUserProfile.module.scss";
import { User } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import UserRoleDisplay from "@/components/layout/userRoleDisplay/UserRoleDisplay";
import { Tooltip } from "@/components/ui/tooltip";

export default function NavUserProfile() {
  const userData = queryClient.getQueryData([QUERY_KEY.USER_DATA]) as User;

  return (
    <>
      <div className={classes.Wrapper}>
        <div className={classes.nickName}>
          <UserRoleDisplay role={userData.role} nickname={userData?.nickname} />
        </div>
      </div>
    </>
  );
}

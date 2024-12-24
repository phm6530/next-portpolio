"use client";

import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import classes from "./NavUserProfile.module.scss";
import { User } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";

export default function NavUserProfile() {
  const userData = queryClient.getQueryData([QUERY_KEY.USER_DATA]) as User;
  const router = useRouter();

  return (
    <>
      <div className={classes.Wrapper}>
        <span
          className={classes.mypageNav}
          onClick={() => router.push("/mypage")}
        >
          마이페이지
        </span>
        <div className={classes.nickName}>
          <UserRoleDisplay role={userData.role} nickname={userData?.nickname} />
        </div>
      </div>
    </>
  );
}

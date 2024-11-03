"use client";

import { queryClient } from "@/config/queryClient";
import { QUERY_KEY } from "@/types/constans";
import classes from "./NavUserProfile.module.scss";
import { User } from "@/types/auth.type";

export default function NavUserProfile() {
  const userData = queryClient.getQueryData([QUERY_KEY.USER_DATA]) as User;
  return (
    <div className={classes.Wrapper}>
      <div className={classes.nickName}>{userData?.nickname}</div>
    </div>
  );
}

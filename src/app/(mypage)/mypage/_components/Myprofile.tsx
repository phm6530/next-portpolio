"use client";

import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { useQueryClient } from "@tanstack/react-query";
import classes from "./Myprofile.module.scss";

export default function Myprofile() {
  const queryclient = useQueryClient();
  const user = queryclient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  return (
    <div className={classes.container}>
      <div className={classes.myProfilePictrue}></div>
      <div>
        <div className={classes.wrap}>
          {user?.nickname} {user?.email}
        </div>
        <div>{user?.role}</div>
        <div>가입일 {user?.createAt}</div>
      </div>
    </div>
  );
}

"use client";

import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { useQueryClient } from "@tanstack/react-query";
import classes from "./Myprofile.module.scss";
import UserIcon from "/public/asset/icon/user.svg";
import UserMarker from "@/components/ui/usericon/UserMarker";
import AnonymousIcon from "/public/asset/icon/anonymous.svg";

export default function Myprofile() {
  const queryclient = useQueryClient();
  const user = queryclient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  return (
    <div className={classes.container}>
      <div className={classes.myProfilePictrue}>
        <AnonymousIcon />
      </div>
      <div className={classes.userInfo}>
        <div className={classes.wrap}>
          <span>{user?.nickname}</span>{" "}
          <span className={classes.email}>( {user?.email} )</span>
        </div>
        <div className={classes.roles}>{user?.role}</div>
        <div className={classes.createAt}> 가입일 {user?.createAt}</div>
      </div>
    </div>
  );
}

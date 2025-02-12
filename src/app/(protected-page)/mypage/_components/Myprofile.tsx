"use client";

import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { useQueryClient } from "@tanstack/react-query";
import AnonymousIcon from "/public/asset/icon/anonymous.svg";

export default function Myprofile() {
  const queryclient = useQueryClient();
  const user = queryclient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  return (
    <div className="flex gap-5 border-b pb-5">
      <div className="w-14 h-14 overflow-hidden rounded-full">
        <AnonymousIcon className="w-full h-full" />
      </div>
      <div className="text-md flex flex-col gap-[10px]">
        <div className="flex gap-[10px] items-center">
          <span>{user?.nickname}</span>
          <span className="opacity-50 text-sm">( {user?.email} )</span>
        </div>
        <div className="text-muted-foreground">{user?.role}</div>
        <div className="text-sm opacity-60"> 가입일 {user?.createAt}</div>
      </div>
    </div>
  );
}

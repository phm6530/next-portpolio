"use client";

import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { useQueryClient } from "@tanstack/react-query";

export default function Myprofile() {
  const queryclient = useQueryClient();
  const user = queryclient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  return (
    <>
      {user?.email} {user?.nickname} {user?.role} {user?.createAt}
    </>
  );
}

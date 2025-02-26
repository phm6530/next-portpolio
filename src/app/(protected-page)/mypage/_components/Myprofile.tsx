"use client";

import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { useQueryClient } from "@tanstack/react-query";
import AnonymousIcon from "/public/asset/icon/anonymous.svg";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function Myprofile() {
  const queryclient = useQueryClient();
  const user = queryclient.getQueryData<User>([QUERY_KEY.USER_DATA]);

  return (
    <>
      <Card>
        <CardContent className="pt-6 border-b mb-5">
          <div className="flex gap-5">
            <div className="w-14 h-14 overflow-hidden rounded-full">
              <AnonymousIcon className="w-full h-full" />
            </div>
            <div className="text-md flex flex-col gap-[10px]">
              <div className="flex gap-[10px] items-center">
                <span>{user?.nickname}</span>
                <span className="opacity-50 text-sm">( {user?.email} )</span>
              </div>
              <div className="text-muted-foreground">{user?.role}</div>
              <div className="text-sm opacity-60">
                {" "}
                가입일 {user?.createdAt}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

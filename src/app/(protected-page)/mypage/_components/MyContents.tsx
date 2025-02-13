"use client";
import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import classes from "./MyContents.module.scss";
import {
  RespondentsAndMaxGroup,
  RespondentsData,
  TemplateItemMetadata,
} from "@/types/template.type";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import withAuthFetch from "@/utils/withAuthFetch";
import MyContentsItem from "./MyContentsItem";
import { useState } from "react";
import LoadingStreming from "@/components/loading/LoadingStreming";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CircleSlash, SquarePlus } from "lucide-react";
import LoadingSpinnerWrapper from "@/components/loading/LoadingSpinnerWrapper";
import useAOS from "@/_hook/usAOS";

type MyContentsListData = TemplateItemMetadata<RespondentsData>;

export default function MyContents() {
  const queryClient = useQueryClient();
  const userdata = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const [filter, setFilter] = useState<"new" | "users">("new");

  useAOS();

  // get List..
  const { data, isLoading } = useQuery<MyContentsListData[]>({
    queryKey: [QUERY_KEY.MY_CONTENTS],
    queryFn: async () => {
      const url = `user/me/contents`;
      const options: RequestInit = {
        credentials: "include",
      };
      return await withAuthFetch(url, options);
    },
    enabled: !!userdata,
    staleTime: 10000,
    select: (data: MyContentsListData[]) => {
      switch (filter) {
        case "new":
          return data; //정렬 nest에서 DESC로 보내는 중

        case "users":
          return data.sort(
            (a, b) => a.respondents.selectUserCnt - b.respondents.selectUserCnt
          );

        default:
          throw new Error("Invalid filter value");
      }
    },
  });

  return (
    <div>
      {/* <h3>내가 만든 템플릿</h3> */}

      <div className="py-5 flex items-center gap-2 justify-between">
        <div className="flex gap-2">
          <div
            className={`border py-2.5 px-4 text-sm rounded-full cursor-pointer ${
              filter === "new" ? "border-zinc-500" : undefined
            }`}
            onClick={() => setFilter("new")}
          >
            최신 순
          </div>
          <div
            className={`border py-2.5 px-4 text-sm rounded-full cursor-pointer ${
              filter === "users" ? "border-zinc-500" : undefined
            }`}
            onClick={() => setFilter("users")}
          >
            참여자 순
          </div>
        </div>
        <Button size={"xl"} asChild variant={"outline"}>
          <Link href={"/made"}>
            <SquarePlus />
            템플릿 만들기
          </Link>
        </Button>
      </div>

      {/* <h2>생성한 템플릿</h2> */}

      <LoadingSpinnerWrapper loading={isLoading}>
        <div className="grid flex-col gap-10">
          {data && data.length > 0 ? (
            data?.map((item) => {
              return (
                <MyContentsItem key={`${item.id}-${item.title}`} item={item} />
              );
            })
          ) : (
            <Card className="h-[200px] flex flex-col items-center justify-center">
              <CardContent className="text-center pt-6">
                <div className="flex gap-3 items-center">
                  <CircleSlash />
                  <span>생성하신 템플릿이 없습니다</span>
                </div>
              </CardContent>{" "}
              <Button size={"xl"} asChild className="shadow-lg ">
                <Link href={"/made"}>템플릿 만들기</Link>
              </Button>
            </Card>
          )}
        </div>
      </LoadingSpinnerWrapper>
    </div>
  );
}

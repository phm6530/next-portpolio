"use client";
import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import classes from "./MyContents.module.scss";
import {
  RespondentsAndMaxGroup,
  TemplateItemMetadata,
} from "@/types/template.type";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import withAuthFetch from "@/utils/withAuthFetch";
import Button from "@/components/ui/button/Button";
import MyContentsItem from "./MyContentsItem";
import { useState } from "react";
import { never } from "zod";
import LoadingStreming from "@/components/loading/LoadingStreming";

type returnData = {
  data: TemplateItemMetadata<RespondentsAndMaxGroup>[];
  nextPage: null | number;
};

export default function MyContents() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userdata = queryClient.getQueryData<User>([
    QUERY_KEY.USER_DATA,
  ]);
  const [filter, setFilter] = useState<"new" | "users">("new");

  // get List..
  const { data, isLoading } = useQuery<returnData>({
    queryKey: [QUERY_KEY.MY_CONTENTS],
    queryFn: async () => {
      const url = `user/me/contents`;
      const options: RequestInit = {
        credentials: "include",
      };
      return await withAuthFetch(url, options);
    },
    enabled: !!userdata,
    staleTime: Infinity,
    select: (data: returnData) => {
      if (!data) {
        return {
          data: [],
          nextPage: null,
        };
      }

      switch (filter) {
        case "new":
          return data;

        case "users":
          return {
            ...data,
            data: [...data.data].sort(
              (a, b) =>
                (b.respondents.allCnt || 0) -
                (a.respondents.allCnt || 0)
            ),
          };

        default:
          throw new Error("Invalid filter value");
      }
    },
  });

  return (
    <div>
      {/* <h3>내가 만든 템플릿</h3> */}

      <div className={classes.categoriesWrapper}>
        <div className={classes.buttonWrapper}>
          <div
            className={`${
              filter === "new" ? classes.active : undefined
            }`}
            onClick={() => setFilter("new")}
          >
            최신 순
          </div>
          <div
            className={`${
              filter === "users" ? classes.active : undefined
            }`}
            onClick={() => setFilter("users")}
          >
            참여자 순
          </div>
        </div>
        <Button.submit onClick={() => router.push("/made")}>
          템플릿 만들기
        </Button.submit>
      </div>

      {/* <h2>생성한 템플릿</h2> */}

      {isLoading ? (
        <>
          <LoadingStreming />
        </>
      ) : (
        <div className={classes.container}>
          {data && data.data.length > 0 ? (
            data?.data.map((item) => {
              return <MyContentsItem key={item.id} item={item} />;
            })
          ) : (
            <div className={classes.madeNotTemolate}>
              생성하신 템플릿이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

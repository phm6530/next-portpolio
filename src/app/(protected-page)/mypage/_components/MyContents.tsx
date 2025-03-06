"use client";
import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { RespondentsData, TemplateItemMetadata } from "@/types/template.type";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import withAuthFetch from "@/utils/withAuthFetch";
import MyContentsItem from "./MyContentsItem";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SquarePlus } from "lucide-react";
import useAOS from "@/_hook/usAOS";
import TabRounded from "@/components/ui/tab-rounded";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import SearchBarWrapper from "@/components/ui/SearchBar/searchbar-wrapper";
import { useSearchParams } from "next/navigation";
import NotFoundContents from "@/components/ui/error/notfound-contents";

type MyContentsListData = TemplateItemMetadata<RespondentsData>;

export default function MyContents() {
  const queryClient = useQueryClient();
  const userdata = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const [filter, setFilter] = useState<"new" | "users">("new");

  const qs = useSearchParams();
  const keyword = qs.get("search");

  useAOS();

  // get List..
  const { data, isLoading } = useQuery<MyContentsListData[]>({
    queryKey: [QUERY_KEY.MY_CONTENTS, filter],
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
      let temp = data;

      if (keyword?.trim()) {
        const searchLower = keyword.toLowerCase();
        temp = temp.filter((e) => {
          const titleLower = e.title.toLowerCase();
          return titleLower.includes(searchLower);
        });
      }

      switch (filter) {
        case "new":
          return temp; //정렬 nest에서 DESC로 보내는 중
        case "users":
          return temp.sort(
            (a, b) => b.respondents.selectUserCnt - a.respondents.selectUserCnt
          );

        default:
          throw new Error("error 날리없음 이거");
      }
    },
  });

  if (isLoading) {
    return <LoadingWrapper />;
  }

  return (
    <div>
      {/* <h3>내가 만든 템플릿</h3> */}

      <div className="py-5 flex items-center gap-2 justify-between">
        <div className="flex gap-2">
          <TabRounded
            active={"new" === filter}
            onClick={() => setFilter("new")}
          >
            최신 순
          </TabRounded>
          <TabRounded
            active={"users" === filter}
            onClick={() => setFilter("users")}
          >
            참여자 순
          </TabRounded>
        </div>
        <Button size={"lg"} asChild>
          <Link href={"/made"}>
            <SquarePlus />
            템플릿 만들기
          </Link>
        </Button>
      </div>
      <div className="mb-5">
        <SearchBarWrapper />
      </div>

      {/* <h2>생성한 템플릿</h2> */}

      <div className="flex flex-col gap-4">
        {data && data.length > 0 ? (
          data?.map((item) => {
            return (
              <MyContentsItem key={`${item.id}-${item.title}`} item={item} />
            );
          })
        ) : (
          <NotFoundContents className="border rounded-lg">
            생성한 템플릿이 없습니다
          </NotFoundContents>
        )}
      </div>
    </div>
  );
}

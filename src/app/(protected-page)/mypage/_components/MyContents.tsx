"use client";
import { User } from "@/types/auth.type";
import { QUERY_KEY } from "@/types/constans";
import { RespondentsData, TemplateItemMetadata } from "@/types/template.type";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyContentsItem from "./MyContentsItem";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ban, SquarePlus } from "lucide-react";

import TabRounded from "@/components/ui/tab-rounded";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import SearchBarWrapper from "@/components/ui/SearchBar/searchbar-wrapper";
import { useSearchParams } from "next/navigation";
import NotFoundContents from "@/components/ui/error/notfound-contents";
import withActionAtClient from "@/utils/with-action-at-client";
import { withFetchRevaildationAction } from "@/utils/with-fetch-revaildation";
import useAOS from "@/_hook/usAOS";

type MyContentsListData = TemplateItemMetadata<RespondentsData>;

export default function MyContents() {
  const queryClient = useQueryClient();
  const userdata = queryClient.getQueryData<User>([QUERY_KEY.USER_DATA]);
  const [filter, setFilter] = useState<"new" | "users">("new");
  const qs = useSearchParams();
  const keyword = qs.get("search");

  useAOS();

  // get List..
  const {
    data: contentsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY.MY_CONTENTS],
    queryFn: async () => {
      return await withActionAtClient(async () =>
        withFetchRevaildationAction<MyContentsListData[]>({
          endPoint: "user/me/contents",
          requireAuth: true,
          options: {
            cache: "no-store",
          },
        })
      );
    },
    enabled: !!userdata,
    staleTime: 10000,
  });

  if (isLoading) {
    return <LoadingWrapper />;
  }

  if (isError) {
    return (
      <NotFoundContents>
        <Ban />
        데이터를 가져오는데 실패하였습니다..
      </NotFoundContents>
    );
  }

  // contentsList가 undefined일 경우 빈 배열 사용
  const safeContentsList = contentsList || [];

  const filterlist = (data: MyContentsListData[]) => {
    let temp = [...data];

    if (keyword?.trim()) {
      const searchLower = keyword.toLowerCase();
      temp = temp.filter((e) => {
        const titleLower = e.title.toLowerCase();
        return titleLower.includes(searchLower);
      });
    }

    switch (filter) {
      case "new":
        return temp;
      case "users":
        return temp.sort(
          (a, b) => b.respondents.selectUserCnt - a.respondents.selectUserCnt
        );
      default:
        throw new Error("알 수 없는 필터 타입입니다");
    }
  };

  //필터링
  /**
   * @description
   * 초기엔 그냥 메모리에서 하고 나중에 인피니티로 반영 하던
   */
  const filteredList = filterlist(safeContentsList);

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
        {filteredList.length > 0 ? (
          filteredList.map((item) => {
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

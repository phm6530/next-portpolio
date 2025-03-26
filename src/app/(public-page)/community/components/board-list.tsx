"use client";

import { withFetch } from "@/util/clientUtil";
import { BASE_NEST_URL } from "@/config/base";
import BoardListItem from "./board-list-item";
import { USER_ROLE } from "@/types/auth.type";
import { CategoriesKey } from "@/types/board";
import Paging from "@/components/ui/Paging";
import { useQuery } from "@tanstack/react-query";
import LoadingWrapper from "@/components/shared/loading/loading-wrapper";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type ExcludeUser = Exclude<USER_ROLE, USER_ROLE.ANONYMOUS>;

export type ListItemType = {
  id: number;
  updateAt: string;
  createdAt: string;
  title: string;
  category: CategoriesKey;
  view: number;
  commentCnt: number;
  creator:
    | { role: USER_ROLE.ANONYMOUS; nickname: string }
    | { role: ExcludeUser; nickname: string; email: string };
};

export default function BoardList({
  category,
  keyword,
}: {
  category: CategoriesKey;
  keyword?: string;
}) {
  // 조회수 때문에 Client로 변경
  const searchParam = keyword ? `${encodeURIComponent(keyword)}` : "";

  const qs = useSearchParams();
  const curPage = qs.get("page");

  console.log(searchParam);
  // http://localhost:3000/community?search=%E3%85%87%E3%85%87%E3%85%87%E3%85%87
  // number는 All Cnt
  const { data, isLoading } = useQuery<[ListItemType[], number]>({
    queryKey: ["board", curPage, searchParam, category],
    queryFn: async () => {
      return await withFetch(async () => {
        return fetch(
          `${BASE_NEST_URL}/board/${category}?search=${searchParam}&page=${curPage}`
        );
      });
    },
    staleTime: 10000,
  });

  if (isLoading) {
    return <LoadingWrapper />;
  }

  return (
    <section className={cn(`animate-fadein`)} key={`${category}-${curPage}}`}>
      <div className="border-b pb-3 border-muted-foreground/40">
        <h3>최신 순 </h3>
      </div>
      <div>
        {data && data[0]?.length > 0 ? (
          <>
            {data[0].map((item, idx) => {
              return (
                <BoardListItem
                  itemData={item}
                  key={`board-${item.id}-${idx}`}
                />
              );
            })}
          </>
        ) : (
          <div className="text-center p-6">작성된 게시물이 없습니다.</div>
        )}
      </div>

      {/* 페이징 */}
      <Paging cnt={(data && data[1]) ?? 1} />
    </section>
  );
}

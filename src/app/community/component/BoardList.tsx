import { withFetch } from "@/util/clientUtil";
import classes from "./BoardList.module.scss";
import { BASE_NEST_URL } from "@/config/base";
import BoardListItem from "@/app/community/component/boardListItem";
import { USER_ROLE } from "@/types/auth.type";
import { CategoriesKey } from "@/types/board";
import Paging from "@/components/ui/Paging";
import AosWrapper from "@/components/animation/AosWrapper";

export type ExcludeUser = Exclude<USER_ROLE, USER_ROLE.ANONYMOUS>;

export type ListItemType = {
  id: number;
  updateAt: string;
  createAt: string;
  title: string;
  category: CategoriesKey;
  view: number;
  commentCnt: number;
  creator:
    | { role: USER_ROLE.ANONYMOUS; nickname: string }
    | { role: ExcludeUser; nickname: string; email: string };
};

export default async function BoardList({
  boardCategory,
  keyword,
  curPage,
}: {
  boardCategory: CategoriesKey;
  keyword?: string;
  curPage: number;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // number는 All Cnt
  const data = await withFetch<[ListItemType[], number]>(async () => {
    const searchParam = keyword
      ? `${encodeURIComponent(keyword)}`
      : "";
    const url = `${BASE_NEST_URL}/board/${boardCategory}?search=${searchParam}&page=${curPage}`;

    return await fetch(url, {
      cache: "force-cache",
      next: { tags: ["boardList"] },
    });
  });

  return (
    <>
      {/* <h3>자유게시판</h3> */}
      <section className={classes.container}>
        <div className={classes.listHeader}>
          <h3>최신 순 </h3>
          {/* <div className={classes.pageNum}>
            page {curPage} <span>/ 2</span>
          </div> */}
        </div>
        <AosWrapper>
          {data[0].length > 0 ? (
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
            <div className={classes.emptyState}>
              작성된 게시물이 없습니다.
            </div>
          )}
        </AosWrapper>

        {/* 페이징 */}
        <Paging cnt={data[1]} />
      </section>
    </>
  );
}

import { withFetch } from "@/util/clientUtil";
import classes from "./BoardList.module.scss";
import { BASE_NEST_URL } from "@/config/base";
import BoardListItem from "@/app/community/component/boardListItem";
import { USER_ROLE } from "@/types/auth.type";
import { CategoriesKey } from "@/types/board";

export type ExcludeUser = Exclude<USER_ROLE, USER_ROLE.ANONYMOUS>;

export type ListItemType = {
  id: number;
  updateAt: string;
  createAt: string;
  title: string;
  category: CategoriesKey;
  creator:
    | { role: USER_ROLE.ANONYMOUS; nickname: string }
    | { role: ExcludeUser; nickname: string; email: string };
};

export default async function BoardList({
  boardCategory,
}: {
  boardCategory: CategoriesKey;
}) {
  const data = await withFetch<ListItemType[]>(async () => {
    return await fetch(`${BASE_NEST_URL}/board/${boardCategory}`, {
      cache: "no-store",
    });
  });

  //   console.log(data);

  return (
    <>
      {/* <h3>자유게시판</h3> */}
      <section className={classes.container}>
        <div className={classes.listHeader}>
          <h3>최신 순</h3>
        </div>
        <div>
          {data.length > 0 ? (
            <>
              {data.map((item, idx) => {
                return (
                  <BoardListItem
                    itemData={item}
                    key={`board-${item.id}-${idx}`}
                  />
                );
              })}
            </>
          ) : (
            <>작성된 게시물이 없습니다.</>
          )}
        </div>
      </section>
    </>
  );
}

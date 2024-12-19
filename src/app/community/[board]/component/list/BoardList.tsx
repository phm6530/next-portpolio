import { withFetch } from "@/util/clientUtil";
import classes from "./BoardList.module.scss";
import { BASE_NEST_URL } from "@/config/base";
import { BoardKeys } from "../../page";
import BoardListItem from "@/app/community/component/boardListItem";
import { USER_ROLE } from "@/types/auth.type";
import Button from "@/components/ui/button/Button";

export type ListItemType = {
  id: number;
  updateAt: number;
  createAt: number;
  title: string;
  category: BoardKeys;
  creator: { role: USER_ROLE; nickname: string };
};

export default async function BoardList({
  boardCategory,
}: {
  boardCategory: BoardKeys;
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

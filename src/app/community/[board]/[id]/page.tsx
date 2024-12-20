import { withFetch } from "@/util/clientUtil";
import { ListItemType } from "../../component/BoardList";
import { BASE_NEST_URL } from "@/config/base";
import classes from "./page.module.scss";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import DateCompareToday from "@/util/DateCompareToday";
import { boardCateogries, CategoriesKey } from "@/types/board";

type DetailBoardItemType = {
  contents: string;
} & ListItemType;

export default async function Page({
  params,
}: {
  params: { board: CategoriesKey; id: string };
}) {
  const data = await withFetch<DetailBoardItemType>(async () => {
    return await fetch(`${BASE_NEST_URL}/board/${params.board}/${params.id}`, {
      cache: "no-store",
    });
  });
  const dayCompare = DateCompareToday();

  const boardName = boardCateogries[params.board];

  return (
    <>
      <div className={classes.postHeader}>
        <div className={classes.boardCategory}>{boardName}</div>
        <div className={classes.postTitle}>{data.title}</div>
        <div className={classes.postInfo}>
          <UserRoleDisplay
            role={data.creator.role}
            nickname={data.creator.nickname}
          />
          <span>{dayCompare.fromNow(data.createAt)}</span>
        </div>
      </div>

      <div className={classes.postContents}>
        <div className={classes.contents}>{data.contents}</div>
        {data.updateAt !== data.createAt && (
          <div className={classes.lastUpdate}>
            수정 최종일자 {dayCompare.fromNow(data.updateAt)}
          </div>
        )}

        {/* <BoardCreatorUser
          role={data.creator.role}
          nickname={data.creator.nickname}
        /> */}
      </div>

      <CommentEditor templateId={params.id} templateType={params.board} />
      {/* <ResultCommentSection id={params.id} type={"test"} /> */}
    </>
  );
}

import { withFetch } from "@/util/clientUtil";
import { ListItemType } from "../component/list/BoardList";
import { BASE_NEST_URL } from "@/config/base";
import { boardCateogries, CategoriesKey } from "../page";
import classes from "./page.module.scss";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import DateCompareToday from "@/util/DateCompareToday";

type DetailBoardItemType = {
  contents: string;
} & ListItemType;

export default async function Page({
  params,
}: {
  params: { board: CategoriesKey; id: string };
}) {
  console.log(boardCateogries);
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
        <div className={classes.lastUpdate}>
          수정 최종일자 {dayCompare.fromNow(data.updateAt)}
        </div>
      </div>

      <CommentEditor templateId={params.id} templateType={params.board} />
      {/* <ResultCommentSection id={params.id} type={"test"} /> */}
    </>
  );
}

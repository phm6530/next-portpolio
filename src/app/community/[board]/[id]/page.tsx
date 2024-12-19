import { withFetch } from "@/util/clientUtil";
import { ListItemType } from "../component/list/BoardList";
import { BASE_NEST_URL } from "@/config/base";
import { BoardKeys, boards } from "../page";
import classes from "./page.module.scss";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";

type DetailBoardItemType = {
  contents: string;
} & ListItemType;

export default async function Page({
  params,
}: {
  params: { board: BoardKeys; id: string };
}) {
  const data = await withFetch<DetailBoardItemType>(async () => {
    return await fetch(`${BASE_NEST_URL}/board/${params.board}/${params.id}`, {
      cache: "no-store",
    });
  });

  console.log(data);

  const boardName = boards[params.board];

  return (
    <>
      <div className={classes.postHeader}>
        <div>{boardName}게시판</div>
      </div>

      <div className={classes.postContents}>{data.contents}</div>

      <CommentEditor templateId={params.id} templateType={params.board} />
    </>
  );
}

import DateCompareToday from "@/util/DateCompareToday";
import classes from "./PostContents.module.scss";
import { boardCateogries, CategoriesKey } from "@/types/board";
import PostController from "./PostController";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import { USER_ROLE } from "@/types/auth.type";
import { DetailBoardItemType } from "../page";
import ResultCommentSection from "@/app/(template-result)/components/ResultCommentSection";

import QuillViewer from "@/components/Editor/QuillViewer";
import {
  COMMENT_EDITOR_TYPE,
  COMMENT_NEED_PATH,
} from "@/types/comment.type";
import { fetcbBoardItem } from "@/api/board.api";

export default async function PostContents({
  category,
  postId,
}: {
  category: CategoriesKey;
  postId: string;
}) {
  const dayCompare = DateCompareToday();
  const boardName = boardCateogries[category];

  const data: DetailBoardItemType = await fetcbBoardItem({
    board: category,
    id: postId,
  });

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

      <div className={classes.contentsWrapper}>
        <div className={classes.postContents}>
          <QuillViewer contents={data.contents} />

          {data.updateAt !== data.createAt && (
            <div className={classes.lastUpdate}>
              조회수 {data.view}
            </div>
          )}
        </div>
      </div>

      {/* Controller */}
      <PostController
        id={postId}
        category={category}
        creatorRole={data.creator.role}
        creatorEmail={
          data.creator.role !== USER_ROLE.ANONYMOUS
            ? data.creator.email
            : null
        }
      />

      {/* 댓글 에디터*/}
      <CommentEditor
        editorType={COMMENT_EDITOR_TYPE.COMMENT}
        parentsType={COMMENT_NEED_PATH.BOARD}
        parentsId={postId}
      />

      {/* 댓글 리스트 */}
      <ResultCommentSection
        id={+postId}
        type={COMMENT_NEED_PATH.BOARD}
      />
    </>
  );
}

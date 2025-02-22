import classes from "./ResultCommentSection.module.scss";
import { fetchComments } from "@/app/(public-page)/(template-result)/result/survey/[id]/components/test";
import NotFoundComponent from "@/components/NotFoundComponent";
import { COMMENT_NEED_PATH, CommentReponse } from "@/types/comment.type";

import AosWrapper from "@/components/animation/AosWrapper";
import MessageContainer from "@/components/comment/message-container";

//tempalte ID
export default async function ResultCommentSection({
  type,
  id,
}: {
  type: COMMENT_NEED_PATH;
  id: number;
}) {
  const data = await fetchComments<CommentReponse[]>(id, type);

  return (
    <AosWrapper className={classes.commentSection}>
      <div className={classes.commentCount}>
        댓글 <span>{data?.length}</span> 개
      </div>

      {/* 댓글 리스트 */}
      <div className={classes.commentsWrapper}>
        {data && data.length > 0 ? (
          <MessageContainer listData={data} />
        ) : (
          //댓글 없음ㅇㅇㅇ
          <NotFoundComponent.reply />
        )}
      </div>
    </AosWrapper>
  );
}

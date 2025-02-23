import classes from "./ResultCommentSection.module.scss";
import { fetchComments } from "@/app/(public-page)/(template-result)/result/survey/[id]/components/test";
import NotFoundContents from "@/components/ui/error/notfound-contents";
import { MSG_PARAM_PATH, CommentReponse } from "@/types/comment.type";

import AosWrapper from "@/components/animation/AosWrapper";
import MessageContainer from "@/components/comment/message-container";

//tempalte ID
export default async function ResultCommentSection({
  type,
  id,
}: {
  type: MSG_PARAM_PATH;
  id: number;
}) {
  const data = await fetchComments<CommentReponse[]>(id, type);

  return (
    <div className="my-10">
      <div className="text-lg border-b pb-2 mb-6">
        댓글 <span className="text-indigo-400s">{data?.length}</span> 개
      </div>

      <AosWrapper>
        {/* 댓글 리스트 */}
        <div className={classes.commentsWrapper}>
          {data && data.length > 0 ? (
            <MessageContainer listData={data} />
          ) : (
            //댓글 없음ㅇㅇㅇ
            <NotFoundContents>아직 등록된 댓글이 없습니다.</NotFoundContents>
          )}
        </div>
      </AosWrapper>
    </div>
  );
}

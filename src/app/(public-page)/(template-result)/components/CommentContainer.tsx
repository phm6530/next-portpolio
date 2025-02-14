import Comment from "@/app/(public-page)/(template-result)/components/Comment";
import classes from "./CommentContainer.module.scss";
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/ui/button/Button";
import CommentEditor from "@/app/(public-page)/(template-result)/components/CommentEditor";
// import ReplyIcon from "/public/asset/icon/reply.svg";
import {
  COMMENT_EDITOR_TYPE,
  COMMENT_NEED_PATH,
  CommentReponse,
} from "@/types/comment.type";
import { useParams } from "next/navigation";

export default function CommentContainer({
  touchIdx,
  setTouch,
  ...props
}: {
  touchIdx: number | null;
  parentId: number;
  setTouch: Dispatch<SetStateAction<number | null>>;
} & CommentReponse) {
  const { id: commentId, replies, creator } = props;
  const params: { id: string } = useParams();

  const formViewHandler = () => {
    setTouch((prev) => {
      if (prev === commentId) {
        return null;
      } else {
        return commentId;
      }
    });
  };

  return (
    <div className={classes.containerWrapper}>
      {/* Comment */}
      <Comment
        contentType="comment"
        {...props}
        onClickEvent={formViewHandler}
        boardId={params.id}
      />
      <div className={classes.commentBtnWrap}>
        <Button.noneStyleButton onClick={formViewHandler}>
          <span>답글쓰기</span>
        </Button.noneStyleButton>
      </div>

      {/* 대댓글 */}
      <div
        className={`${classes.repliesContainer} ${
          replies.length > 0 ? classes.leftMargin : undefined
        }`}
      >
        {replies.map((reply, idx) => {
          const { content, ...rest } = reply;
          return (
            <div
              className={classes.replyWrapper}
              key={`reply-${commentId}-${idx}`}
            >
              <Comment
                contentType="reply"
                content={content}
                onClickEvent={formViewHandler}
                {...rest}
                boardId={params.id}
              />
            </div>
          );
        })}
        {touchIdx === commentId && (
          <div className={classes.replyFormContainer}>
            <CommentEditor
              editorType={COMMENT_EDITOR_TYPE.REPLY}
              commentId={commentId}
              parentsId={params.id}
              setTouch={setTouch}
            />
          </div>
        )}
      </div>
    </div>
  );
}

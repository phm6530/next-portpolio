import Comment from "@/app/(template-result)/components/Comment";
import classes from "./CommentContainer.module.scss";
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/ui/button/Button";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
// import ReplyIcon from "/public/asset/icon/reply.svg";
import { CommentReponse } from "@/types/comment.type";
import { COMMENT_EDITOR_TYPE } from "../result/survey/[id]/page";

export default function CommentContainer({
  touchIdx,
  parentId,
  setTouch,
  ...props
}: {
  touchIdx: number | null;
  parentId: number;
  setTouch: Dispatch<SetStateAction<number | null>>;
} & CommentReponse) {
  const { id: commentId, replies, creator } = props;

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
    <div>
      {/* Comment */}
      <Comment
        contentType="comment"
        parentId={parentId}
        {...props}
        onClickEvent={formViewHandler}
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
                parentId={parentId}
                content={content}
                onClickEvent={formViewHandler}
                {...rest}
              />
            </div>
          );
        })}
        {touchIdx === commentId && (
          <div className={classes.replyFormContainer}>
            <CommentEditor
              editorType={COMMENT_EDITOR_TYPE.REPLY}
              commentId={commentId}
              parentsId={parentId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

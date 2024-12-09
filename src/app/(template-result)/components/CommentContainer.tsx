import Comment from "@/app/(template-result)/components/Comment";
import classes from "./CommentContainer.module.scss";
import { Dispatch, SetStateAction } from "react";
import Button from "@/components/ui/button/Button";
import CommentEditor from "@/app/(template-result)/components/CommentEditor";
// import ReplyIcon from "/public/asset/icon/reply.svg";
import { CommentReponse } from "@/types/comment.type";

export default function CommentContainer({
  touchIdx,
  templateId,
  setTouch,
  ...props
}: {
  touchIdx: number | null;
  templateId: string;
  setTouch: Dispatch<SetStateAction<number | null>>;
} & CommentReponse) {
  const { id: commentId, replies } = props;

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
        templateId={templateId}
        {...props}
        onClickEvent={formViewHandler}
      />
      <div className={classes.commentBtnWrap}>
        <Button.noneStyleButton onClick={formViewHandler}>
          답글쓰기
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
              //   onClick={formViewHandler}
            >
              {/* <ReplyIcon className={classes.replyIcon} /> */}
              <Comment
                contentType="reply"
                templateId={templateId}
                content={content}
                onClickEvent={formViewHandler}
                {...rest}
              />
            </div>
          );
        })}
        {touchIdx === commentId && (
          <div className={classes.replyFormContainer}>
            <CommentEditor templateId={templateId} commentId={commentId + ""} />
          </div>
        )}
      </div>
    </div>
  );
}

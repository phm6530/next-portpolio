import MsgItem from "@/app/_components/Comment/MsgItem";
import classes from "./Reply.module.scss";
import { SetStateAction, useState } from "react";
import { MessageProps } from "@/app/_components/Comment/CommentSection";
import ReplyContainer from "@/app/_components/Comment/ReplyContainer";

export default function CommentContainer({
  commentId,
  comment,
  commentIdx,
  replyIdx,
  setReplyIdx,
}: {
  commentId: number;
  comment: MessageProps;
  commentIdx: number;
  replyIdx: null | number;
  setReplyIdx: React.Dispatch<SetStateAction<number | null>>;
}) {
  const [viewReply, setViewReply] = useState(true);

  const formHandler = () => {
    setReplyIdx((prev) => {
      return prev === commentIdx ? null : commentIdx;
    });
  };

  return (
    <div className={classes.commentWrapper}>
      <MsgItem
        id={comment.id}
        userId={comment.user.userId}
        username={comment.user.username}
        create_at={comment.create_at}
        msg={comment.msg}
        role={comment.user.role}
      />
      <div className={classes.commentBtnWrap}>
        {comment.reply && comment.reply.length > 0 && (
          <>
            <button onClick={() => setViewReply((prev) => !prev)}>
              {viewReply
                ? "댓글 숨기기"
                : `댓글보기 (${comment.reply?.length})`}
            </button>
          </>
        )}
        <button onClick={formHandler}>답글쓰기</button>
      </div>
      {viewReply && (
        <ReplyContainer
          commentId={commentId}
          commentIdx={commentIdx}
          replys={comment.reply}
          replyIdx={replyIdx}
          formHandler={formHandler}
        />
      )}
    </div>
  );
}

import MsgItem from "@/app/_components/Comment/MsgItem";
import classes from "./Reply.module.scss";
import { useState } from "react";
import { MessageProps } from "@/app/_components/Comment/CommentSection";
import ReplyContainer from "@/app/_components/Comment/ReplyContainer";

export default function CommentContainer({
  comment,
}: {
  comment: MessageProps;
}) {
  const [viewReply, setViewReply] = useState(true);

  return (
    <div className={classes.commentWrapper}>
      <MsgItem
        idx={comment.idx}
        userId={comment.user.userId}
        username={comment.user.username}
        create_at={comment.create_at}
        msg={comment.msg}
        rule={comment.user.rule}
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
        <button>답글 달기</button>
      </div>

      {comment.reply && comment.reply?.length > 0 && viewReply && (
        <ReplyContainer replys={comment.reply} />
      )}
    </div>
  );
}

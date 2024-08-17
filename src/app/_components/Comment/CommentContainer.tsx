import MsgItem from "@/app/_components/Comment/MsgItem";
import classes from "./Msg.module.scss";
import { SetStateAction, useState } from "react";
import { MessageProps } from "@/app/_components/Comment/CommentSection";
import ReplyContainer from "@/app/_components/Comment/ReplyContainer";

export default function CommentContainer({
  comment_id,
  comment,
  commentIdx,
  replyIdx,
  setReplyIdx,
}: {
  comment_id?: number;
  comment: MessageProps;
  commentIdx: number;
  replyIdx: null | number;
  setReplyIdx: React.Dispatch<SetStateAction<number | null>>;
}) {
  const [viewReply, setViewReply] = useState(true);

  const formHandler = () => {
    setViewReply(true); // 글쓰기 누르면 댓글 List 펼치기
    setReplyIdx((prev) => {
      return !viewReply ? commentIdx : prev === commentIdx ? null : commentIdx;
    });
  };

  return (
    <div className={classes.commentWrapper}>
      <MsgItem
        //commentId만 전달.
        comment_id={comment_id}
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
          comment_id={comment_id}
          commentIdx={commentIdx}
          replys={comment.reply}
          replyIdx={replyIdx}
          formHandler={formHandler}
        />
      )}
    </div>
  );
}

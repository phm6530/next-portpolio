import MsgItem from "@/components/Comment/MsgItem";
import classes from "./Msg.module.scss";
import { SetStateAction, useState } from "react";
import { MessageProps } from "@/components/Comment/CommentSection";
import ReplyContainer from "@/components/Comment/ReplyContainer";
import Button from "@/components/ui/button/Button";

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
    <>
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
              <Button.noneStyleButton
                onClick={() => setViewReply((prev) => !prev)}
              >
                <span style={{ color: "rgb(0, 133, 255)", fontSize: "12px" }}>
                  {viewReply
                    ? "댓글 숨기기"
                    : `댓글보기 (${comment.reply?.length})`}
                </span>
              </Button.noneStyleButton>
            </>
          )}
          <Button.noneStyleButton
            fontSize={12}
            color={replyIdx === commentIdx ? "red" : undefined}
            onClick={formHandler}
          >
            {replyIdx === commentIdx ? "댓글창 닫기" : "답글쓰기"}
          </Button.noneStyleButton>
        </div>
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
    </>
  );
}

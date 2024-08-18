import MsgItem from "@/app/_components/Comment/MsgItem";
import classes from "./Msg.module.scss";
import MsgForm from "@/app/_components/Comment/MsgForm";
import { MessageProps } from "@/app/_components/Comment/CommentSection";

export default function ReplyContainer({
  comment_id,
  commentIdx,
  replys,
  replyIdx,
  formHandler,
}: {
  comment_id?: number;
  commentIdx: number;
  replys: MessageProps["reply"];
  replyIdx: null | number;
  formHandler: () => void;
}) {
  if (!replys) {
    return null; // replys가 없는 경우, 빈 상태를 명확히 처리
  }

  return (
    <>
      <div
        className={
          replys!.length === 0 ? classes.replyNone : classes.replyActive
        }
      >
        {replys &&
          replys.map((e, idx) => {
            return (
              <MsgItem
                key={`reply-${idx}`}
                reply_id={e.reply_id}
                userId={e.user.userId}
                username={e.user.username}
                create_at={e.create_at}
                msg={e.msg}
                role={e.user.role}
              />
            );
          })}
        {replys!.length === 0 ? null : (
          <button onClick={formHandler}>답글 쓰기 </button>
        )}
        {commentIdx === replyIdx && <MsgForm comment_id={comment_id} />}
      </div>
    </>
  );
}

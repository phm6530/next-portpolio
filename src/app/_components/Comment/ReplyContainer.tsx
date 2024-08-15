import MsgItem from "@/app/_components/Comment/MsgItem";
import classes from "./Reply.module.scss";
import MsgForm from "@/app/_components/Comment/MsgForm";
import { MessageProps } from "@/app/_components/Comment/CommentSection";

export default function ReplyContainer({
  CommentIdx,
  replys,
  replyIdx,
  formHandler,
}: {
  CommentIdx: number;
  replys: MessageProps["reply"];
  replyIdx: null | number;
  formHandler: () => void;
}) {
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
                id={e.id}
                userId={e.user.userId}
                username={e.user.username}
                create_at={e.create_at}
                msg={e.msg}
                rule={e.user.rule}
              />
            );
          })}
        {replys!.length === 0 ? null : (
          <button onClick={formHandler}>답글 쓰기 </button>
        )}
        {CommentIdx === replyIdx && <MsgForm />}
      </div>
    </>
  );
}

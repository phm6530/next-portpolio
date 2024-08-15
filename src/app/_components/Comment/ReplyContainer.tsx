import MsgItem from "@/app/_components/Comment/MsgItem";
import classes from "./Reply.module.scss";
import MsgForm from "@/app/_components/Comment/MsgForm";
import { MessageProps } from "@/app/_components/Comment/CommentSection";
import { useState } from "react";

export default function ReplyContainer({
  replys,
}: {
  replys: NonNullable<MessageProps["reply"]>;
}) {
  const [viewForm, setViewForm] = useState(false);

  return (
    <>
      <div className={classes.replyWrapper}>
        {replys.map((e, idx) => {
          return (
            <MsgItem
              key={`reply-${idx}`}
              idx={e.idx}
              userId={e.user.userId}
              username={e.user.username}
              create_at={e.create_at}
              msg={e.msg}
              rule={e.user.rule}
            />
          );
        })}
        <button onClick={() => setViewForm((prev) => !prev)}>답글 달기</button>
      </div>
      {viewForm && <MsgForm />}
    </>
  );
}

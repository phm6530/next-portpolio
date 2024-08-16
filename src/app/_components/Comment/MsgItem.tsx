import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classes from "./Reply.module.scss";
import "dayjs/locale/ko";
import { userProps } from "@/types/user";
import { MessageProps } from "@/app/_components/Comment/CommentSection";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function MsgItem({
  id,
  userId,
  username,
  create_at,
  msg,
  role,
}: Omit<MessageProps, "user" | "reply"> & userProps) {
  return (
    <div className={classes.MsgWrap}>
      <div>
        {username} {role === "admin" ? "M" : null}
        <span>{dayjs(create_at).fromNow()}</span>
        <button type="button">삭제</button>
      </div>
      <div className={classes.msgContents}>{msg}</div>
    </div>
  );
}

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classes from "./Reply.module.scss";

import { userProps } from "@/types/user";
import { MessageProps } from "@/app/_components/Comment/CommentSection";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/app/lib/helperClient";

import "dayjs/locale/ko";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function MsgItem({
  comment_id,
  reply_id,
  userId,
  username,
  create_at,
  msg,
  role,
}: Omit<MessageProps, "user" | "reply"> & userProps) {
  const { mutate, data } = useMutation<
    unknown,
    Error,
    Pick<MessageProps, "comment_id" | "reply_id">
  >({
    mutationFn: (data) =>
      withFetch(async () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment`;
        return fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }),
  });

  const deleteMessage = () => {
    if (confirm("삭제하시겠습니까?")) {
      if (comment_id || reply_id) {
        mutate({ comment_id, reply_id });
      }
    }
  };

  return (
    <div className={classes.MsgWrap}>
      <div>
        {username} {role === "admin" ? "M" : null}
        <span>{dayjs(create_at).fromNow()}</span>
        <button type="button" onClick={deleteMessage}>
          삭제
        </button>
      </div>
      <div className={classes.msgContents}>{msg}</div>
    </div>
  );
}

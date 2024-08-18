import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classes from "./Msg.module.scss";

import { userProps } from "@/types/user";
import { MessageProps } from "@/app/_components/Comment/CommentSection";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/app/lib/helperClient";

import "dayjs/locale/ko";
import { queryClient } from "@/app/config/queryClient";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession(); // 세션

  const { mutate } = useMutation<
    unknown,
    Error,
    Pick<MessageProps, "comment_id" | "reply_id"> & {
      msgPassword?: string;
      msgRole: userProps["role"];
    }
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
    onSuccess: () => {
      alert("삭제되었습니다.");

      queryClient.invalidateQueries({
        queryKey: ["comment"],
      });
    },
  });

  const deleteMessage = () => {
    if (session && userId === session?.user.user_id) {
      confirm("삭제하시겠습니까?") &&
        mutate({ comment_id, reply_id, msgRole: role });
      return;
    }

    const msgPassword = prompt("비밀번호를 입력해주세요");
    if (msgPassword) {
      if (comment_id || reply_id) {
        mutate({ comment_id, reply_id, msgPassword, msgRole: role });
      }
    }
  };

  return (
    <div className={classes.MsgWrap}>
      <div>
        {username}
        {role === "admin" ? <span className="admin_icon">M</span> : null}
        <span>{dayjs(create_at).fromNow()}</span>
        {(role === "visitor" || userId === session?.user.user_id) && (
          <button type="button" onClick={deleteMessage}>
            삭제
          </button>
        )}
      </div>
      <div className={classes.msgContents}>{msg}</div>
    </div>
  );
}

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classes from "./Msg.module.scss";

import { userProps } from "@/types/user";
import { MessageProps } from "@/components/Comment/CommentSection";
import { useMutation } from "@tanstack/react-query";
import { withFetch } from "@/util/clientUtil";

import "dayjs/locale/ko";
import { queryClient } from "@/config/queryClient";
import { useSession } from "next-auth/react";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import Button from "@/components/ui/button/Button";
import { BASE_URL } from "@/config/base";
import { USER_ROLE } from "@/types/auth.type";

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
        const url = `${BASE_URL}/api/comment`;

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
    //
    if (session) {
      if (session.user.role === "user" && userId === session?.user.user_id) {
        confirm("삭제하시겠습니까?") &&
          mutate({ comment_id, reply_id, msgRole: role });
        return;
      } else if (session.user.role === "admin") {
        confirm("삭제하시겠습니까?") &&
          mutate({ comment_id, reply_id, msgRole: role });
        return;
      }
    }

    //익명
    const msgPassword = prompt("비밀번호를 입력해주세요!");
    if (msgPassword) {
      if (comment_id || reply_id) {
        mutate({ comment_id, reply_id, msgPassword, msgRole: role });
      }
    }
  };

  return (
    <div className={classes.MsgWrap}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <UserRoleDisplay nickname={username} role={role as USER_ROLE} />
        <span style={{ marginRight: "20px" }}>
          {dayjs(create_at).fromNow()}
        </span>
        {(role === "anonymous" || userId === session?.user.user_id) && (
          <Button.closeBtn onClick={deleteMessage} />
        )}
      </div>
      {/* <DeleteSvg className={classes.deleteIcon} /> */}
      <div className={classes.msgContents}>{msg}</div>
    </div>
  );
}

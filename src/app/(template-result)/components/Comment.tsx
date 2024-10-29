"use client";
import UserRoleDisplay from "@/components/ui/userRoleDisplay/UserRoleDisplay";
import classes from "./Comment.module.scss";
import Button from "@/components/ui/button/Button";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import relativeTime from "dayjs/plugin/relativeTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestHandler from "@/utils/withFetch";
import { BASE_NEST_URL } from "@/config/base";
import { QUERY_KEY } from "@/types/constans";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Comment({
  contentType,
  templateId,
  id,
  createAt,
  comment,
  user,
  anonymous,
  onClickEvent,
}: {
  contentType: "reply" | "comment";
  templateId: string;
  onClickEvent?: () => void;
} & Omit<CommentReponse, "replies">) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: string) =>
      await requestHandler(async () => {
        const url = `${BASE_NEST_URL}/${contentType}/${id}`;
        return await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data }),
        });
      }),
    onError: (error) => {
      alert(error.message);
    },

    onSuccess: (data) => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENTS, templateId],
      });
    },
  });

  const deleteMessage = () => {
    const msgPassword = prompt("비밀번호를 입력해주세요");
    if (msgPassword) {
      mutate(msgPassword);
    }
  };

  return (
    <div className={classes.commentContainer}>
      <div className={classes.commentSurmmry}>
        {/* 익명일때 */}
        {anonymous && !user && (
          <UserRoleDisplay user_nickname={anonymous} user_role={"anonymous"} />
        )}

        <span style={{ marginRight: "20px" }}>{dayjs(createAt).fromNow()}</span>
        <Button.closeBtn onClick={deleteMessage} />
      </div>
      <div className={classes.comment} onClick={onClickEvent}>
        {comment}
      </div>
    </div>
  );
}

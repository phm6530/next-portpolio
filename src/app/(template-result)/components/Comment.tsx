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
import { CommentReponse } from "@/types/comment.type";
import { User } from "@/types/auth.type";
import { SessionStorage } from "@/utils/sessionStorage-token";
import withAuthFetch from "@/utils/withAuthFetch";

//import
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Comment({
  contentType,
  templateId,
  id,
  createAt,
  content,
  user,
  anonymous,
  onClickEvent,
}: {
  contentType: "reply" | "comment";
  templateId: string;
  onClickEvent?: () => void;
} & Omit<CommentReponse, "replies">) {
  const queryClient = useQueryClient();
  const userData: User | null =
    queryClient.getQueryData([QUERY_KEY.USER_DATA]) ?? null;

  const { mutate } = useMutation({
    mutationFn: async (data?: string) => {
      //userData가 있으면 로그인상태
      const url = `${contentType}/${id}`;

      let options: RequestInit = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        ...(!!userData
          ? { credentials: "include" }
          : {
              body: JSON.stringify({ password: data }),
            }),
      };

      await withAuthFetch(url, options);
    },
    onError: (error) => {
      alert(error.message);
    },

    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.COMMENTS, templateId],
      });
    },
  });

  const deleteMessage = () => {
    if (userData) {
      //권한있을경우 권한만 체크하기위해서 password 제외
      if (confirm("삭제하시겠습니까?")) {
        mutate(undefined);
      } else {
        return null;
      }
    } else {
      const msgPassword = prompt("비밀번호를 입력해주세요");
      if (msgPassword) {
        mutate(msgPassword);
      }
    }
  };

  const isUserCommentAuthor = user?.email === userData?.email; // 현재 사용자가 댓글 작성자인지 확인

  return (
    <div className={classes.commentContainer}>
      <div className={classes.commentSurmmry}>
        {/* 유저 or 익명 */}
        <UserRoleDisplay
          role={user?.role}
          nickname={user?.nickname || anonymous}
        />

        <span style={{ marginRight: "20px" }}>{dayjs(createAt).fromNow()}</span>

        {/* 내 댓글일 경우만 삭제버튼 노출 */}
        {isUserCommentAuthor && (
          <>
            {isUserCommentAuthor && <span>내 댓글</span>}
            <Button.closeBtn onClick={deleteMessage} />
          </>
        )}
      </div>
      <div className={classes.comment} onClick={onClickEvent}>
        {content}
      </div>
    </div>
  );
}
